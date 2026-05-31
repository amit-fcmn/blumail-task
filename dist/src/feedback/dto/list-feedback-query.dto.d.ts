import { FeedbackStatus } from '../../generated/prisma/client';
export declare class ListFeedbackQueryDto {
    page?: number;
    limit?: number;
    status?: FeedbackStatus;
}
