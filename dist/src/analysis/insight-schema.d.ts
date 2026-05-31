import { z } from 'zod';
export declare const INSIGHT_JSON_SCHEMA: {
    readonly type: "object";
    readonly additionalProperties: false;
    readonly required: readonly ["sentiment", "feature_requests", "actionable_insight"];
    readonly properties: {
        readonly sentiment: {
            readonly type: "string";
            readonly enum: readonly ["positive", "neutral", "negative"];
        };
        readonly feature_requests: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly additionalProperties: false;
                readonly required: readonly ["title", "confidence"];
                readonly properties: {
                    readonly title: {
                        readonly type: "string";
                    };
                    readonly confidence: {
                        readonly type: "number";
                        readonly minimum: 0;
                        readonly maximum: 1;
                    };
                };
            };
        };
        readonly actionable_insight: {
            readonly type: "string";
        };
    };
};
export declare const insightSchema: z.ZodObject<{
    sentiment: z.ZodEnum<{
        positive: "positive";
        neutral: "neutral";
        negative: "negative";
    }>;
    feature_requests: z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        confidence: z.ZodNumber;
    }, z.core.$strip>>;
    actionable_insight: z.ZodString;
}, z.core.$strip>;
export type InsightSchemaOutput = z.infer<typeof insightSchema>;
