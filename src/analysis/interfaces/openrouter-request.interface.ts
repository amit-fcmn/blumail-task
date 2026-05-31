import { OpenRouterMessage } from '../../common/interfaces/openrouter-chat.interface';

export interface OpenRouterRequestBody {
  model: string;
  messages: OpenRouterMessage[];
  response_format: OpenRouterResponseFormat;
}

export interface OpenRouterResponseFormat {
  type: string;
  json_schema?: OpenRouterJsonSchema;
}

export interface OpenRouterJsonSchema {
  name: string;
  strict: boolean;
  schema: Record<string, unknown>;
}
