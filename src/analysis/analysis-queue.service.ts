import { Injectable, Logger } from '@nestjs/common';
import { AnalysisJob } from './interfaces/analysis-job.interface';

@Injectable()
export class AnalysisQueueService {
  private readonly logger = new Logger(AnalysisQueueService.name);
  private readonly pendingJobs: AnalysisJob[] = [];
  private readonly queuedIds = new Set<string>();
  private isProcessing = false;
  private processHandler: ((job: AnalysisJob) => Promise<void>) | null = null;

  /**
   * Registers the worker callback invoked for each dequeued job.
   * @param handler - Async function that processes one analysis job
   */
  registerProcessor(handler: (job: AnalysisJob) => Promise<void>): void {
    this.processHandler = handler;
  }

  /**
   * Enqueues feedback for analysis after optional delay.
   * @param feedbackId - Feedback primary key
   * @param isManualRetry - Whether this job was triggered by manual retry
   * @param delayMs - Delay before processing starts
   */
  enqueue(feedbackId: string, isManualRetry = false, delayMs = 0): void {
    const isAlreadyQueued = this.queuedIds.has(feedbackId);

    if (isAlreadyQueued) return;

    const job: AnalysisJob = { feedbackId, isManualRetry, delayMs };
    this.pendingJobs.push(job);
    this.queuedIds.add(feedbackId);
    this.logger.debug(`Enqueued analysis for feedback ${feedbackId}`);
    void this.drainQueue();
  }

  private async drainQueue(): Promise<void> {
    const isBusy = this.isProcessing === true;

    if (isBusy) return;

    const handler = this.processHandler;

    if (handler === null) return;

    this.isProcessing = true;

    try {
      while (this.pendingJobs.length > 0) {
        const [nextJob] = this.pendingJobs;
        this.pendingJobs.shift();

        if (nextJob === undefined) continue;

        const delayMs = nextJob.delayMs;

        if (delayMs > 0) await this.sleep(delayMs);

        try {
          await handler(nextJob);
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Unknown error';
          this.logger.error(
            `Analysis job failed for ${nextJob.feedbackId}: ${message}`,
          );
        } finally {
          this.queuedIds.delete(nextJob.feedbackId);
        }
      }
    } finally {
      this.isProcessing = false;

      const hasMore = this.pendingJobs.length > 0;

      if (hasMore) void this.drainQueue();
    }
  }

  private sleep(delayMs: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, delayMs);
    });
  }
}
