import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FeedbackStatus } from '../generated/prisma/client';
import { AnalysisQueueService } from '../analysis/analysis-queue.service';
import { MAX_TOTAL_ATTEMPTS } from '../common/constants/analysis.constants';
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
} from '../common/constants/feedback.constants';
import { FeedbackResponse } from '../common/interfaces/feedback-response.interface';
import { PaginatedFeedbackResponse } from '../common/interfaces/paginated-feedback.interface';
import {
  feedbackWithLatestInclude,
  mapFeedbackResponse,
} from '../common/utils/feedback-mapper.util';
import { hashContent } from '../common/utils/content-hash.util';
import { PrismaService } from '../prisma/prisma.service';
import { ListFeedbackQueryDto } from './dto/list-feedback-query.dto';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly analysisQueueService: AnalysisQueueService,
  ) {}

  /**
   * Submits feedback or returns existing record when content hash matches.
   * @param content - Raw feedback text
   * @returns Feedback response and whether the row was newly created
   */
  async submitFeedback(
    content: string,
  ): Promise<{ feedback: FeedbackResponse; isNew: boolean }> {
    const contentHash = hashContent(content);
    const existing = await this.prisma.feedback.findUnique({
      where: { contentHash },
      include: feedbackWithLatestInclude(),
    });

    if (existing !== null) {
      const feedback = mapFeedbackResponse(existing);
      return { feedback, isNew: false };
    }

    const created = await this.prisma.feedback.create({
      data: {
        content,
        contentHash,
        status: FeedbackStatus.RECEIVED,
      },
      include: feedbackWithLatestInclude(),
    });

    this.analysisQueueService.enqueue(created.id);

    const feedback = mapFeedbackResponse(created);
    return { feedback, isNew: true };
  }

  /**
   * Lists feedback with offset pagination and optional status filter.
   * @param query - Pagination and filter parameters
   * @returns Paginated feedback list
   */
  async listFeedback(
    query: ListFeedbackQueryDto,
  ): Promise<PaginatedFeedbackResponse> {
    const page = query.page ?? DEFAULT_PAGE;
    const limit = query.limit ?? DEFAULT_LIMIT;
    const skip = (page - 1) * limit;
    const statusFilter = query.status;
    const where = statusFilter === undefined ? {} : { status: statusFilter };

    const [rows, total] = await Promise.all([
      this.prisma.feedback.findMany({
        where,
        include: feedbackWithLatestInclude(),
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.feedback.count({ where }),
    ]);

    const data = rows.map((row) => mapFeedbackResponse(row));

    return {
      data,
      meta: { page, limit, total },
    };
  }

  /**
   * Fetches a single feedback item by id.
   * @param id - Feedback primary key
   * @returns Feedback with latest analysis
   * @throws NotFoundException when feedback does not exist
   */
  async getFeedbackById(id: string): Promise<FeedbackResponse> {
    const feedback = await this.prisma.feedback.findUnique({
      where: { id },
      include: feedbackWithLatestInclude(),
    });

    if (feedback === null) throw new NotFoundException('Feedback not found');

    return mapFeedbackResponse(feedback);
  }

  /**
   * Manually retries analysis for failed feedback.
   * @param id - Feedback primary key
   * @returns Updated feedback response
   * @throws NotFoundException when feedback does not exist
   * @throws BadRequestException when retry is not allowed
   */
  async retryFeedback(id: string): Promise<FeedbackResponse> {
    const feedback = await this.prisma.feedback.findUnique({
      where: { id },
      include: feedbackWithLatestInclude(),
    });

    if (feedback === null) throw new NotFoundException('Feedback not found');

    const isFailed = feedback.status === FeedbackStatus.FAILED;

    if (!isFailed)
      throw new BadRequestException(
        'Retry is only allowed when status is FAILED',
      );

    const hasAttemptsRemaining = feedback.attemptCount < MAX_TOTAL_ATTEMPTS;

    if (!hasAttemptsRemaining)
      throw new BadRequestException('Maximum retry attempts reached');

    this.analysisQueueService.enqueue(id, true);

    const updated = await this.prisma.feedback.findUnique({
      where: { id },
      include: feedbackWithLatestInclude(),
    });

    if (updated === null) throw new NotFoundException('Feedback not found');

    return mapFeedbackResponse(updated);
  }
}
