"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AnalysisWorkerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisWorkerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_1 = require("../generated/prisma/client");
const analysis_constants_1 = require("../common/constants/analysis.constants");
const prisma_service_1 = require("../prisma/prisma.service");
const analysis_queue_service_1 = require("./analysis-queue.service");
const insight_schema_1 = require("./insight-schema");
const openrouter_service_1 = require("./openrouter.service");
let AnalysisWorkerService = AnalysisWorkerService_1 = class AnalysisWorkerService {
    prisma;
    openRouterService;
    analysisQueueService;
    configService;
    logger = new common_1.Logger(AnalysisWorkerService_1.name);
    constructor(prisma, openRouterService, analysisQueueService, configService) {
        this.prisma = prisma;
        this.openRouterService = openRouterService;
        this.analysisQueueService = analysisQueueService;
        this.configService = configService;
    }
    onModuleInit() {
        this.analysisQueueService.registerProcessor((job) => this.processJob(job));
    }
    async processJob(job) {
        const feedback = await this.prisma.feedback.findUnique({
            where: { id: job.feedbackId },
        });
        if (feedback === null)
            return;
        if (feedback.status === client_1.FeedbackStatus.DONE)
            return;
        const isAnalyzing = feedback.status === client_1.FeedbackStatus.ANALYZING;
        if (isAnalyzing && !job.isManualRetry)
            return;
        const isManualOnWrongStatus = job.isManualRetry && feedback.status !== client_1.FeedbackStatus.FAILED;
        if (isManualOnWrongStatus)
            return;
        const nextAttemptNumber = feedback.attemptCount + 1;
        if (nextAttemptNumber > analysis_constants_1.MAX_TOTAL_ATTEMPTS) {
            await this.markFailed(feedback.id, null, 'Maximum attempt limit reached');
            return;
        }
        await this.prisma.feedback.update({
            where: { id: feedback.id },
            data: {
                status: client_1.FeedbackStatus.ANALYZING,
                attemptCount: nextAttemptNumber,
            },
        });
        const modelUsed = this.configService.get('openrouterModel', {
            infer: true,
        });
        const analysis = await this.prisma.analysis.create({
            data: {
                feedbackId: feedback.id,
                attemptNumber: nextAttemptNumber,
                modelUsed,
            },
        });
        try {
            const rawContent = await this.openRouterService.analyzeFeedback(feedback.content);
            const structured = this.parseAndValidate(rawContent);
            if (!structured.success) {
                await this.completeFailure(feedback.id, analysis.id, rawContent, structured.errorMessage, false, nextAttemptNumber);
                return;
            }
            await this.completeSuccess(feedback.id, analysis.id, rawContent, structured.data);
        }
        catch (error) {
            const isTransient = error instanceof openrouter_service_1.OpenRouterTransientError;
            const errorMessage = error instanceof Error ? error.message : 'Analysis failed';
            if (error instanceof openrouter_service_1.OpenRouterClientError) {
                await this.completeFailure(feedback.id, analysis.id, null, errorMessage, false, nextAttemptNumber);
                return;
            }
            const shouldAutoRetry = isTransient === true && nextAttemptNumber < analysis_constants_1.MAX_AUTO_ATTEMPTS;
            await this.completeFailure(feedback.id, analysis.id, null, errorMessage, shouldAutoRetry, nextAttemptNumber);
        }
    }
    parseAndValidate(rawContent) {
        try {
            const parsed = JSON.parse(rawContent);
            const validated = insight_schema_1.insightSchema.safeParse(parsed);
            if (!validated.success) {
                const issues = validated.error.issues
                    .map((issue) => issue.message)
                    .join('; ');
                return {
                    success: false,
                    errorMessage: `Schema validation failed: ${issues}`,
                };
            }
            return { success: true, data: validated.data };
        }
        catch {
            return { success: false, errorMessage: 'Response is not valid JSON' };
        }
    }
    async completeSuccess(feedbackId, analysisId, rawContent, structuredResult) {
        await this.prisma.$transaction([
            this.prisma.analysis.update({
                where: { id: analysisId },
                data: {
                    rawAiResponse: rawContent,
                    structuredResult,
                    errorMessage: null,
                },
            }),
            this.prisma.feedback.update({
                where: { id: feedbackId },
                data: {
                    status: client_1.FeedbackStatus.DONE,
                    latestAnalysisId: analysisId,
                },
            }),
        ]);
        this.logger.log(`Analysis succeeded for feedback ${feedbackId}`);
    }
    async completeFailure(feedbackId, analysisId, rawContent, errorMessage, shouldAutoRetry, attemptNumber) {
        await this.prisma.$transaction([
            this.prisma.analysis.update({
                where: { id: analysisId },
                data: {
                    rawAiResponse: rawContent,
                    errorMessage,
                },
            }),
            this.prisma.feedback.update({
                where: { id: feedbackId },
                data: {
                    status: client_1.FeedbackStatus.FAILED,
                    latestAnalysisId: analysisId,
                },
            }),
        ]);
        if (!shouldAutoRetry) {
            this.logger.warn(`Analysis failed for feedback ${feedbackId}: ${errorMessage}`);
            return;
        }
        const delayMs = this.computeRetryDelay(attemptNumber);
        this.logger.warn(`Scheduling auto-retry for feedback ${feedbackId} in ${delayMs}ms`);
        this.analysisQueueService.enqueue(feedbackId, false, delayMs);
    }
    async markFailed(feedbackId, rawContent, errorMessage) {
        await this.prisma.feedback.update({
            where: { id: feedbackId },
            data: { status: client_1.FeedbackStatus.FAILED },
        });
        this.logger.warn(`Feedback ${feedbackId} marked FAILED: ${errorMessage}`);
    }
    computeRetryDelay(attemptNumber) {
        const delayIndex = Math.min(attemptNumber - 1, analysis_constants_1.AUTO_RETRY_DELAYS_MS.length - 1);
        const baseDelay = analysis_constants_1.AUTO_RETRY_DELAYS_MS[delayIndex] ?? analysis_constants_1.AUTO_RETRY_DELAYS_MS[0];
        const jitter = Math.floor(Math.random() * analysis_constants_1.JITTER_MS);
        return baseDelay + jitter;
    }
};
exports.AnalysisWorkerService = AnalysisWorkerService;
exports.AnalysisWorkerService = AnalysisWorkerService = AnalysisWorkerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        openrouter_service_1.OpenRouterService,
        analysis_queue_service_1.AnalysisQueueService,
        config_1.ConfigService])
], AnalysisWorkerService);
//# sourceMappingURL=analysis-worker.service.js.map