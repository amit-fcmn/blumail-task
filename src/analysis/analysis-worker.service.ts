import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FeedbackStatus, Prisma } from '../generated/prisma/client';
import {
  AUTO_RETRY_DELAYS_MS,
  JITTER_MS,
  MAX_AUTO_ATTEMPTS,
  MAX_TOTAL_ATTEMPTS,
} from '../common/constants/analysis.constants';
import { AppConfig } from '../config/app-config.interface';
import { PrismaService } from '../prisma/prisma.service';
import { AnalysisQueueService } from './analysis-queue.service';
import { AnalysisJob } from './interfaces/analysis-job.interface';
import { insightSchema } from './insight-schema';
import {
  OpenRouterClientError,
  OpenRouterService,
  OpenRouterTransientError,
} from './openrouter.service';

@Injectable()
export class AnalysisWorkerService implements OnModuleInit {
  private readonly logger = new Logger(AnalysisWorkerService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly openRouterService: OpenRouterService,
    private readonly analysisQueueService: AnalysisQueueService,
    private readonly configService: ConfigService<AppConfig, true>,
  ) {}

  /**
   * Registers this worker with the in-process analysis queue.
   */
  onModuleInit(): void {
    this.analysisQueueService.registerProcessor((job) => this.processJob(job));
  }

  /**
   * Processes a single analysis job for feedback.
   * @param job - Queue job with feedback id and retry metadata
   */
  async processJob(job: AnalysisJob): Promise<void> {
    const feedback = await this.prisma.feedback.findUnique({
      where: { id: job.feedbackId },
    });

    if (feedback === null) return;

    if (feedback.status === FeedbackStatus.DONE) return;

    const isAnalyzing = feedback.status === FeedbackStatus.ANALYZING;

    if (isAnalyzing && !job.isManualRetry) return;

    const isManualOnWrongStatus =
      job.isManualRetry && feedback.status !== FeedbackStatus.FAILED;

    if (isManualOnWrongStatus) return;

    const nextAttemptNumber = feedback.attemptCount + 1;

    if (nextAttemptNumber > MAX_TOTAL_ATTEMPTS) {
      await this.markFailed(feedback.id, null, 'Maximum attempt limit reached');
      return;
    }

    await this.prisma.feedback.update({
      where: { id: feedback.id },
      data: {
        status: FeedbackStatus.ANALYZING,
        attemptCount: nextAttemptNumber,
      },
    });

    const modelUsed = this.configService.get('openrouterModel', {
      infer: true,
    });

    const analysis = await this.prisma.analysis.create({
      data: {
        feedbackId: feedback.id,
        attemptNumber: nextAttemptNumber,
        modelUsed,
      },
    });

    try {
      const rawContent = await this.openRouterService.analyzeFeedback(
        feedback.content,
      );
      const structured = this.parseAndValidate(rawContent);

      if (!structured.success) {
        await this.completeFailure(
          feedback.id,
          analysis.id,
          rawContent,
          structured.errorMessage,
          false,
          nextAttemptNumber,
        );
        return;
      }

      await this.completeSuccess(
        feedback.id,
        analysis.id,
        rawContent,
        structured.data,
      );
    } catch (error) {
      const isTransient = error instanceof OpenRouterTransientError;
      const errorMessage =
        error instanceof Error ? error.message : 'Analysis failed';

      if (error instanceof OpenRouterClientError) {
        await this.completeFailure(
          feedback.id,
          analysis.id,
          null,
          errorMessage,
          false,
          nextAttemptNumber,
        );
        return;
      }

      const shouldAutoRetry =
        isTransient === true && nextAttemptNumber < MAX_AUTO_ATTEMPTS;

      await this.completeFailure(
        feedback.id,
        analysis.id,
        null,
        errorMessage,
        shouldAutoRetry,
        nextAttemptNumber,
      );
    }
  }

  private parseAndValidate(
    rawContent: string,
  ):
    | { success: true; data: Prisma.InputJsonValue }
    | { success: false; errorMessage: string } {
    try {
      const parsed: unknown = JSON.parse(rawContent);
      const validated = insightSchema.safeParse(parsed);

      if (!validated.success) {
        const issues = validated.error.issues
          .map((issue) => issue.message)
          .join('; ');
        return {
          success: false,
          errorMessage: `Schema validation failed: ${issues}`,
        };
      }

      return { success: true, data: validated.data as Prisma.InputJsonValue };
    } catch {
      return { success: false, errorMessage: 'Response is not valid JSON' };
    }
  }

  private async completeSuccess(
    feedbackId: string,
    analysisId: string,
    rawContent: string,
    structuredResult: Prisma.InputJsonValue,
  ): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.analysis.update({
        where: { id: analysisId },
        data: {
          rawAiResponse: rawContent,
          structuredResult,
          errorMessage: null,
        },
      }),
      this.prisma.feedback.update({
        where: { id: feedbackId },
        data: {
          status: FeedbackStatus.DONE,
          latestAnalysisId: analysisId,
        },
      }),
    ]);

    this.logger.log(`Analysis succeeded for feedback ${feedbackId}`);
  }

  private async completeFailure(
    feedbackId: string,
    analysisId: string,
    rawContent: string | null,
    errorMessage: string,
    shouldAutoRetry: boolean,
    attemptNumber: number,
  ): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.analysis.update({
        where: { id: analysisId },
        data: {
          rawAiResponse: rawContent,
          errorMessage,
        },
      }),
      this.prisma.feedback.update({
        where: { id: feedbackId },
        data: {
          status: FeedbackStatus.FAILED,
          latestAnalysisId: analysisId,
        },
      }),
    ]);

    if (!shouldAutoRetry) {
      this.logger.warn(
        `Analysis failed for feedback ${feedbackId}: ${errorMessage}`,
      );
      return;
    }

    const delayMs = this.computeRetryDelay(attemptNumber);
    this.logger.warn(
      `Scheduling auto-retry for feedback ${feedbackId} in ${delayMs}ms`,
    );
    this.analysisQueueService.enqueue(feedbackId, false, delayMs);
  }

  private async markFailed(
    feedbackId: string,
    rawContent: string | null,
    errorMessage: string,
  ): Promise<void> {
    await this.prisma.feedback.update({
      where: { id: feedbackId },
      data: { status: FeedbackStatus.FAILED },
    });

    this.logger.warn(`Feedback ${feedbackId} marked FAILED: ${errorMessage}`);
  }

  private computeRetryDelay(attemptNumber: number): number {
    const delayIndex = Math.min(
      attemptNumber - 1,
      AUTO_RETRY_DELAYS_MS.length - 1,
    );
    const baseDelay =
      AUTO_RETRY_DELAYS_MS[delayIndex] ?? AUTO_RETRY_DELAYS_MS[0];
    const jitter = Math.floor(Math.random() * JITTER_MS);
    return baseDelay + jitter;
  }
}
