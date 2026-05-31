"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insightSchema = exports.INSIGHT_JSON_SCHEMA = void 0;
const zod_1 = require("zod");
exports.INSIGHT_JSON_SCHEMA = {
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
};
exports.insightSchema = zod_1.z.object({
    sentiment: zod_1.z.enum(['positive', 'neutral', 'negative']),
    feature_requests: zod_1.z.array(zod_1.z.object({
        title: zod_1.z.string().min(1),
        confidence: zod_1.z.number().min(0).max(1),
    })),
    actionable_insight: zod_1.z.string().min(1),
});
//# sourceMappingURL=insight-schema.js.map