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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../generated/prisma/client");
const analysis_queue_service_1 = require("../analysis/analysis-queue.service");
const analysis_constants_1 = require("../common/constants/analysis.constants");
const feedback_constants_1 = require("../common/constants/feedback.constants");
const feedback_mapper_util_1 = require("../common/utils/feedback-mapper.util");
const content_hash_util_1 = require("../common/utils/content-hash.util");
const prisma_service_1 = require("../prisma/prisma.service");
let FeedbackService = class FeedbackService {
    prisma;
    analysisQueueService;
    constructor(prisma, analysisQueueService) {
        this.prisma = prisma;
        this.analysisQueueService = analysisQueueService;
    }
    async submitFeedback(content) {
        const contentHash = (0, content_hash_util_1.hashContent)(content);
        const existing = await this.prisma.feedback.findUnique({
            where: { contentHash },
            include: (0, feedback_mapper_util_1.feedbackWithLatestInclude)(),
        });
        if (existing !== null) {
            const feedback = (0, feedback_mapper_util_1.mapFeedbackResponse)(existing);
            return { feedback, isNew: false };
        }
        const created = await this.prisma.feedback.create({
            data: {
                content,
                contentHash,
                status: client_1.FeedbackStatus.RECEIVED,
            },
            include: (0, feedback_mapper_util_1.feedbackWithLatestInclude)(),
        });
        this.analysisQueueService.enqueue(created.id);
        const feedback = (0, feedback_mapper_util_1.mapFeedbackResponse)(created);
        return { feedback, isNew: true };
    }
    async listFeedback(query) {
        const page = query.page ?? feedback_constants_1.DEFAULT_PAGE;
        const limit = query.limit ?? feedback_constants_1.DEFAULT_LIMIT;
        const skip = (page - 1) * limit;
        const statusFilter = query.status;
        const where = statusFilter === undefined ? {} : { status: statusFilter };
        const [rows, total] = await Promise.all([
            this.prisma.feedback.findMany({
                where,
                include: (0, feedback_mapper_util_1.feedbackWithLatestInclude)(),
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.feedback.count({ where }),
        ]);
        const data = rows.map((row) => (0, feedback_mapper_util_1.mapFeedbackResponse)(row));
        return {
            data,
            meta: { page, limit, total },
        };
    }
    async getFeedbackById(id) {
        const feedback = await this.prisma.feedback.findUnique({
            where: { id },
            include: (0, feedback_mapper_util_1.feedbackWithLatestInclude)(),
        });
        if (feedback === null)
            throw new common_1.NotFoundException('Feedback not found');
        return (0, feedback_mapper_util_1.mapFeedbackResponse)(feedback);
    }
    async retryFeedback(id) {
        const feedback = await this.prisma.feedback.findUnique({
            where: { id },
            include: (0, feedback_mapper_util_1.feedbackWithLatestInclude)(),
        });
        if (feedback === null)
            throw new common_1.NotFoundException('Feedback not found');
        const isFailed = feedback.status === client_1.FeedbackStatus.FAILED;
        if (!isFailed)
            throw new common_1.BadRequestException('Retry is only allowed when status is FAILED');
        const hasAttemptsRemaining = feedback.attemptCount < analysis_constants_1.MAX_TOTAL_ATTEMPTS;
        if (!hasAttemptsRemaining)
            throw new common_1.BadRequestException('Maximum retry attempts reached');
        this.analysisQueueService.enqueue(id, true);
        const updated = await this.prisma.feedback.findUnique({
            where: { id },
            include: (0, feedback_mapper_util_1.feedbackWithLatestInclude)(),
        });
        if (updated === null)
            throw new common_1.NotFoundException('Feedback not found');
        return (0, feedback_mapper_util_1.mapFeedbackResponse)(updated);
    }
};
exports.FeedbackService = FeedbackService;
exports.FeedbackService = FeedbackService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        analysis_queue_service_1.AnalysisQueueService])
], FeedbackService);
//# sourceMappingURL=feedback.service.js.map