import { AnalysisQueueService } from '../analysis/analysis-queue.service';
import { FeedbackResponse } from '../common/interfaces/feedback-response.interface';
import { PaginatedFeedbackResponse } from '../common/interfaces/paginated-feedback.interface';
import { PrismaService } from '../prisma/prisma.service';
import { ListFeedbackQueryDto } from './dto/list-feedback-query.dto';
export declare class FeedbackService {
    private readonly prisma;
    private readonly analysisQueueService;
    constructor(prisma: PrismaService, analysisQueueService: AnalysisQueueService);
    submitFeedback(content: string): Promise<{
        feedback: FeedbackResponse;
        isNew: boolean;
    }>;
    listFeedback(query: ListFeedbackQueryDto): Promise<PaginatedFeedbackResponse>;
    getFeedbackById(id: string): Promise<FeedbackResponse>;
    retryFeedback(id: string): Promise<FeedbackResponse>;
}
