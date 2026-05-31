export interface OpenRouterMessage {
    role: string;
    content: string;
}
export interface OpenRouterChoice {
    message: OpenRouterMessage;
    finish_reason: string | null;
}
export interface OpenRouterChatResponse {
    choices: OpenRouterChoice[];
    error?: OpenRouterErrorBody;
}
export interface OpenRouterErrorBody {
    message: string;
    code?: number;
}
