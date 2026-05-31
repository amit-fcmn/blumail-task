import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../config/app-config.interface';
import { PrismaService } from '../prisma/prisma.service';
import { AnalysisQueueService } from './analysis-queue.service';
import { AnalysisJob } from './interfaces/analysis-job.interface';
import { OpenRouterService } from './openrouter.service';
export declare class AnalysisWorkerService implements OnModuleInit {
    private readonly prisma;
    private readonly openRouterService;
    private readonly analysisQueueService;
    private readonly configService;
    private readonly logger;
    constructor(prisma: PrismaService, openRouterService: OpenRouterService, analysisQueueService: AnalysisQueueService, configService: ConfigService<AppConfig, true>);
    onModuleInit(): void;
    processJob(job: AnalysisJob): Promise<void>;
    private parseAndValidate;
    private completeSuccess;
    private completeFailure;
    private markFailed;
    private computeRetryDelay;
}
