import { Analysis, Feedback, Prisma } from '../../generated/prisma/client';
import { AnalysisSummary, FeedbackResponse } from '../interfaces/feedback-response.interface';
type FeedbackWithLatest = Feedback & {
    latestAnalysis: Analysis | null;
};
export declare const mapAnalysisSummary: (analysis: Analysis | null) => AnalysisSummary | null;
export declare const mapFeedbackResponse: (feedback: FeedbackWithLatest) => FeedbackResponse;
export declare const feedbackWithLatestInclude: () => Prisma.FeedbackInclude;
export {};
