"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AnalysisQueueService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisQueueService = void 0;
const common_1 = require("@nestjs/common");
let AnalysisQueueService = AnalysisQueueService_1 = class AnalysisQueueService {
    logger = new common_1.Logger(AnalysisQueueService_1.name);
    pendingJobs = [];
    queuedIds = new Set();
    isProcessing = false;
    processHandler = null;
    registerProcessor(handler) {
        this.processHandler = handler;
    }
    enqueue(feedbackId, isManualRetry = false, delayMs = 0) {
        const isAlreadyQueued = this.queuedIds.has(feedbackId);
        if (isAlreadyQueued)
            return;
        const job = { feedbackId, isManualRetry, delayMs };
        this.pendingJobs.push(job);
        this.queuedIds.add(feedbackId);
        this.logger.debug(`Enqueued analysis for feedback ${feedbackId}`);
        void this.drainQueue();
    }
    async drainQueue() {
        const isBusy = this.isProcessing === true;
        if (isBusy)
            return;
        const handler = this.processHandler;
        if (handler === null)
            return;
        this.isProcessing = true;
        try {
            while (this.pendingJobs.length > 0) {
                const [nextJob] = this.pendingJobs;
                this.pendingJobs.shift();
                if (nextJob === undefined)
                    continue;
                const delayMs = nextJob.delayMs;
                if (delayMs > 0)
                    await this.sleep(delayMs);
                try {
                    await handler(nextJob);
                }
                catch (error) {
                    const message = error instanceof Error ? error.message : 'Unknown error';
                    this.logger.error(`Analysis job failed for ${nextJob.feedbackId}: ${message}`);
                }
                finally {
                    this.queuedIds.delete(nextJob.feedbackId);
                }
            }
        }
        finally {
            this.isProcessing = false;
            const hasMore = this.pendingJobs.length > 0;
            if (hasMore)
                void this.drainQueue();
        }
    }
    sleep(delayMs) {
        return new Promise((resolve) => {
            setTimeout(resolve, delayMs);
        });
    }
};
exports.AnalysisQueueService = AnalysisQueueService;
exports.AnalysisQueueService = AnalysisQueueService = AnalysisQueueService_1 = __decorate([
    (0, common_1.Injectable)()
], AnalysisQueueService);
//# sourceMappingURL=analysis-queue.service.js.map