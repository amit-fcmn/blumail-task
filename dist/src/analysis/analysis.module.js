"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisModule = void 0;
const common_1 = require("@nestjs/common");
const analysis_queue_service_1 = require("./analysis-queue.service");
const analysis_worker_service_1 = require("./analysis-worker.service");
const openrouter_service_1 = require("./openrouter.service");
let AnalysisModule = class AnalysisModule {
};
exports.AnalysisModule = AnalysisModule;
exports.AnalysisModule = AnalysisModule = __decorate([
    (0, common_1.Module)({
        providers: [openrouter_service_1.OpenRouterService, analysis_queue_service_1.AnalysisQueueService, analysis_worker_service_1.AnalysisWorkerService],
        exports: [analysis_queue_service_1.AnalysisQueueService],
    })
], AnalysisModule);
//# sourceMappingURL=analysis.module.js.map