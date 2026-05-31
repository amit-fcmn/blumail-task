import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../config/app-config.interface';
export declare class OpenRouterTransientError extends Error {
    constructor(message: string);
}
export declare class OpenRouterClientError extends Error {
    constructor(message: string);
}
export declare class OpenRouterService {
    private readonly logger;
    private readonly apiKey;
    private readonly model;
    private readonly appTitle;
    private readonly appUrl;
    constructor(configService: ConfigService<AppConfig, true>);
    analyzeFeedback(feedbackContent: string): Promise<string>;
    private buildRequestBody;
    private handleErrorResponse;
}
