import { AnalysisJob } from './interfaces/analysis-job.interface';
export declare class AnalysisQueueService {
    private readonly logger;
    private readonly pendingJobs;
    private readonly queuedIds;
    private isProcessing;
    private processHandler;
    registerProcessor(handler: (job: AnalysisJob) => Promise<void>): void;
    enqueue(feedbackId: string, isManualRetry?: boolean, delayMs?: number): void;
    private drainQueue;
    private sleep;
}
