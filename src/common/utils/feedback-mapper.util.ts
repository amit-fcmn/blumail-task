import { Analysis, Feedback, Prisma } from '../../generated/prisma/client';
import {
  AnalysisSummary,
  FeedbackResponse,
} from '../interfaces/feedback-response.interface';
import { InsightResult } from '../interfaces/insight-result.interface';

type FeedbackWithLatest = Feedback & { latestAnalysis: Analysis | null };

/**
 * Maps a Prisma analysis row to an API summary.
 * @param analysis - Analysis entity or null
 * @returns Analysis summary for API responses
 */
export const mapAnalysisSummary = (
  analysis: Analysis | null,
): AnalysisSummary | null => {
  if (analysis === null) return null;

  const structuredResult = analysis.structuredResult as InsightResult | null;

  return {
    id: analysis.id,
    attemptNumber: analysis.attemptNumber,
    rawAiResponse: analysis.rawAiResponse,
    structuredResult,
    errorMessage: analysis.errorMessage,
    modelUsed: analysis.modelUsed,
    createdAt: analysis.createdAt,
  };
};

/**
 * Maps a feedback entity with optional latest analysis to API shape.
 * @param feedback - Feedback with latestAnalysis included
 * @returns Feedback response DTO
 */
export const mapFeedbackResponse = (
  feedback: FeedbackWithLatest,
): FeedbackResponse => {
  const latestAnalysis = mapAnalysisSummary(feedback.latestAnalysis);

  return {
    id: feedback.id,
    content: feedback.content,
    status: feedback.status,
    attemptCount: feedback.attemptCount,
    createdAt: feedback.createdAt,
    updatedAt: feedback.updatedAt,
    latestAnalysis,
  };
};

/**
 * Builds Prisma include for feedback queries with latest analysis.
 * @returns Prisma include object
 */
export const feedbackWithLatestInclude = (): Prisma.FeedbackInclude => ({
  latestAnalysis: true,
});
