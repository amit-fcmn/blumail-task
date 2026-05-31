"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackWithLatestInclude = exports.mapFeedbackResponse = exports.mapAnalysisSummary = void 0;
const mapAnalysisSummary = (analysis) => {
    if (analysis === null)
        return null;
    const structuredResult = analysis.structuredResult;
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
exports.mapAnalysisSummary = mapAnalysisSummary;
const mapFeedbackResponse = (feedback) => {
    const latestAnalysis = (0, exports.mapAnalysisSummary)(feedback.latestAnalysis);
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
exports.mapFeedbackResponse = mapFeedbackResponse;
const feedbackWithLatestInclude = () => ({
    latestAnalysis: true,
});
exports.feedbackWithLatestInclude = feedbackWithLatestInclude;
//# sourceMappingURL=feedback-mapper.util.js.map