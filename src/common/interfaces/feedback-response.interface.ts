import { InsightResult } from './insight-result.interface';

export interface AnalysisSummary {
  id: string;
  attemptNumber: number;
  rawAiResponse: string | null;
  structuredResult: InsightResult | null;
  errorMessage: string | null;
  modelUsed: string;
  createdAt: Date;
}

export interface FeedbackResponse {
  id: string;
  content: string;
  status: string;
  attemptCount: number;
  createdAt: Date;
  updatedAt: Date;
  latestAnalysis: AnalysisSummary | null;
}
