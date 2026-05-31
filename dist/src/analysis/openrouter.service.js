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
var OpenRouterService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenRouterService = exports.OpenRouterClientError = exports.OpenRouterTransientError = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const analysis_constants_1 = require("../common/constants/analysis.constants");
const insight_schema_1 = require("./insight-schema");
class OpenRouterTransientError extends Error {
    constructor(message) {
        super(message);
        this.name = 'OpenRouterTransientError';
    }
}
exports.OpenRouterTransientError = OpenRouterTransientError;
class OpenRouterClientError extends Error {
    constructor(message) {
        super(message);
        this.name = 'OpenRouterClientError';
    }
}
exports.OpenRouterClientError = OpenRouterClientError;
let OpenRouterService = OpenRouterService_1 = class OpenRouterService {
    logger = new common_1.Logger(OpenRouterService_1.name);
    apiKey;
    model;
    appTitle;
    appUrl;
    constructor(configService) {
        this.apiKey = configService.get('openrouterApiKey', { infer: true });
        this.model = configService.get('openrouterModel', { infer: true });
        this.appTitle = configService.get('openrouterAppTitle', { infer: true });
        this.appUrl = configService.get('openrouterAppUrl', { infer: true });
    }
    async analyzeFeedback(feedbackContent) {
        const requestBody = this.buildRequestBody(feedbackContent);
        const controller = new AbortController();
        const timeout = setTimeout(() => {
            controller.abort();
        }, analysis_constants_1.OPENROUTER_REQUEST_TIMEOUT_MS);
        try {
            const response = await fetch(analysis_constants_1.OPENROUTER_CHAT_URL, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': this.appUrl,
                    'X-OpenRouter-Title': this.appTitle,
                },
                body: JSON.stringify(requestBody),
                signal: controller.signal,
            });
            const responseText = await response.text();
            const parsed = JSON.parse(responseText);
            if (!response.ok) {
                this.handleErrorResponse(response.status, parsed.error);
            }
            const [firstChoice] = parsed.choices ?? [];
            const messageContent = firstChoice?.message?.content;
            if (typeof messageContent !== 'string' || messageContent.length === 0)
                throw new OpenRouterClientError('OpenRouter returned empty content');
            return messageContent;
        }
        catch (error) {
            if (error instanceof OpenRouterTransientError)
                throw error;
            if (error instanceof OpenRouterClientError)
                throw error;
            const isAbort = error instanceof Error && error.name === 'AbortError';
            if (isAbort)
                throw new OpenRouterTransientError('OpenRouter request timed out');
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`OpenRouter request failed: ${errorMessage}`);
            throw new OpenRouterTransientError(errorMessage);
        }
        finally {
            clearTimeout(timeout);
        }
    }
    buildRequestBody(feedbackContent) {
        return {
            model: this.model,
            messages: [
                {
                    role: 'system',
                    content: 'Extract structured insights from user feedback. Respond only with JSON matching the required schema.',
                },
                { role: 'user', content: feedbackContent },
            ],
            response_format: {
                type: 'json_schema',
                json_schema: {
                    name: 'feedback_insight',
                    strict: true,
                    schema: insight_schema_1.INSIGHT_JSON_SCHEMA,
                },
            },
        };
    }
    handleErrorResponse(status, errorBody) {
        const message = errorBody?.message ?? `OpenRouter HTTP ${status}`;
        const isRateLimited = status === common_1.HttpStatus.TOO_MANY_REQUESTS;
        const isServerError = status >= common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const isTransient = isRateLimited || isServerError;
        if (isTransient)
            throw new OpenRouterTransientError(message);
        throw new OpenRouterClientError(message);
    }
};
exports.OpenRouterService = OpenRouterService;
exports.OpenRouterService = OpenRouterService = OpenRouterService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], OpenRouterService);
//# sourceMappingURL=openrouter.service.js.map