import { z } from 'zod';

export const INSIGHT_JSON_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['sentiment', 'feature_requests', 'actionable_insight'],
  properties: {
    sentiment: {
      type: 'string',
      enum: ['positive', 'neutral', 'negative'],
    },
    feature_requests: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['title', 'confidence'],
        properties: {
          title: { type: 'string' },
          confidence: { type: 'number', minimum: 0, maximum: 1 },
        },
      },
    },
    actionable_insight: { type: 'string' },
  },
} as const;

export const insightSchema = z.object({
  sentiment: z.enum(['positive', 'neutral', 'negative']),
  feature_requests: z.array(
    z.object({
      title: z.string().min(1),
      confidence: z.number().min(0).max(1),
    }),
  ),
  actionable_insight: z.string().min(1),
});

export type InsightSchemaOutput = z.infer<typeof insightSchema>;
