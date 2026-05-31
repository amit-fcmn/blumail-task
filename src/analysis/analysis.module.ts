import { Module } from '@nestjs/common';
import { AnalysisQueueService } from './analysis-queue.service';
import { AnalysisWorkerService } from './analysis-worker.service';
import { OpenRouterService } from './openrouter.service';

@Module({
  providers: [OpenRouterService, AnalysisQueueService, AnalysisWorkerService],
  exports: [AnalysisQueueService],
})
export class AnalysisModule {}
