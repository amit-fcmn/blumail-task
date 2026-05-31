import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  OPENROUTER_CHAT_URL,
  OPENROUTER_REQUEST_TIMEOUT_MS,
} from '../common/constants/analysis.constants';
import {
  OpenRouterChatResponse,
  OpenRouterErrorBody,
} from '../common/interfaces/openrouter-chat.interface';
import { AppConfig } from '../config/app-config.interface';
import { INSIGHT_JSON_SCHEMA } from './insight-schema';
import { OpenRouterRequestBody } from './interfaces/openrouter-request.interface';

export class OpenRouterTransientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OpenRouterTransientError';
  }
}

export class OpenRouterClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OpenRouterClientError';
  }
}

@Injectable()
export class OpenRouterService {
  private readonly logger = new Logger(OpenRouterService.name);
  private readonly apiKey: string;
  private readonly model: string;
  private readonly appTitle: string;
  private readonly appUrl: string;

  constructor(configService: ConfigService<AppConfig, true>) {
    this.apiKey = configService.get('openrouterApiKey', { infer: true });
    this.model = configService.get('openrouterModel', { infer: true });
    this.appTitle = configService.get('openrouterAppTitle', { infer: true });
    this.appUrl = configService.get('openrouterAppUrl', { infer: true });
  }

  /**
   * Calls OpenRouter chat completions with structured JSON output.
   * @param feedbackContent - User feedback text to analyze
   * @returns Raw assistant message content string
   * @throws OpenRouterTransientError for retryable failures
   * @throws OpenRouterClientError for non-retryable API errors
   */
  async analyzeFeedback(feedbackContent: string): Promise<string> {
    const requestBody = this.buildRequestBody(feedbackContent);
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, OPENROUTER_REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(OPENROUTER_CHAT_URL, {
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
      const parsed = JSON.parse(responseText) as OpenRouterChatResponse;

      if (!response.ok) {
        this.handleErrorResponse(response.status, parsed.error);
      }

      const [firstChoice] = parsed.choices ?? [];
      const messageContent = firstChoice?.message?.content;

      if (typeof messageContent !== 'string' || messageContent.length === 0)
        throw new OpenRouterClientError('OpenRouter returned empty content');

      return messageContent;
    } catch (error) {
      if (error instanceof OpenRouterTransientError) throw error;

      if (error instanceof OpenRouterClientError) throw error;

      const isAbort = error instanceof Error && error.name === 'AbortError';

      if (isAbort)
        throw new OpenRouterTransientError('OpenRouter request timed out');

      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`OpenRouter request failed: ${errorMessage}`);
      throw new OpenRouterTransientError(errorMessage);
    } finally {
      clearTimeout(timeout);
    }
  }

  private buildRequestBody(feedbackContent: string): OpenRouterRequestBody {
    return {
      model: this.model,
      messages: [
        {
          role: 'system',
          content:
            'Extract structured insights from user feedback. Respond only with JSON matching the required schema.',
        },
        { role: 'user', content: feedbackContent },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'feedback_insight',
          strict: true,
          schema: INSIGHT_JSON_SCHEMA as unknown as Record<string, unknown>,
        },
      },
    };
  }

  private handleErrorResponse(
    status: HttpStatus,
    errorBody: OpenRouterErrorBody | undefined,
  ): void {
    const message = errorBody?.message ?? `OpenRouter HTTP ${status}`;
    const isRateLimited = status === HttpStatus.TOO_MANY_REQUESTS;
    const isServerError = status >= HttpStatus.INTERNAL_SERVER_ERROR;
    const isTransient = isRateLimited || isServerError;

    if (isTransient) throw new OpenRouterTransientError(message);

    throw new OpenRouterClientError(message);
  }
}
