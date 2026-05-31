import type { Response } from 'express';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { ListFeedbackQueryDto } from './dto/list-feedback-query.dto';
import { FeedbackService } from './feedback.service';
export declare class FeedbackController {
    private readonly feedbackService;
    constructor(feedbackService: FeedbackService);
    create(body: CreateFeedbackDto, response: Response): Promise<import("../common/interfaces/feedback-response.interface").FeedbackResponse>;
    list(query: ListFeedbackQueryDto): Promise<import("../common/interfaces/paginated-feedback.interface").PaginatedFeedbackResponse>;
    getById(id: string): Promise<import("../common/interfaces/feedback-response.interface").FeedbackResponse>;
    retry(id: string): Promise<import("../common/interfaces/feedback-response.interface").FeedbackResponse>;
}
