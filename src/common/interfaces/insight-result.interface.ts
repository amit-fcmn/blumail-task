export interface FeatureRequestInsight {
  title: string;
  confidence: number;
}

export interface InsightResult {
  sentiment: string;
  feature_requests: FeatureRequestInsight[];
  actionable_insight: string;
}
