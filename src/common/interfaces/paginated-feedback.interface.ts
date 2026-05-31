import { FeedbackResponse } from './feedback-response.interface';

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
}

export interface PaginatedFeedbackResponse {
  data: FeedbackResponse[];
  meta: PaginationMeta;
}
