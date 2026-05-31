"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnv = void 0;
const openrouter_models_enum_1 = require("../common/enums/openrouter-models.enum");
const DEFAULT_PORT = 3000;
const DEFAULT_APP_TITLE = 'feedback-insights';
const DEFAULT_APP_URL = 'http://localhost:3000';
const validateEnv = (config) => {
    const databaseUrl = config.DATABASE_URL;
    const openrouterApiKey = config.OPENROUTER_API_KEY;
    const openrouterModel = config.OPENROUTER_MODEL ?? 'GEMINI_3_5_FLASH';
    const portValue = config.PORT ?? String(DEFAULT_PORT);
    const port = Number(portValue);
    const modelKey = openrouterModel;
    const modelSlug = openrouter_models_enum_1.OPENROUTER_MODELS[modelKey];
    if (typeof databaseUrl !== 'string' || !databaseUrl.length)
        throw new Error('DATABASE_URL is required');
    if (typeof openrouterApiKey !== 'string' || !openrouterApiKey.length)
        throw new Error('OPENROUTER_API_KEY is required');
    if (Number.isNaN(port) || port <= 0)
        throw new Error('PORT must be a positive number');
    if (modelSlug === undefined)
        throw new Error(`OPENROUTER_MODEL must be one of: ${Object.keys(openrouter_models_enum_1.OPENROUTER_MODELS).join(', ')}`);
    const openrouterAppTitle = typeof config.OPENROUTER_APP_TITLE === 'string'
        ? config.OPENROUTER_APP_TITLE
        : DEFAULT_APP_TITLE;
    const openrouterAppUrl = typeof config.OPENROUTER_APP_URL === 'string'
        ? config.OPENROUTER_APP_URL
        : DEFAULT_APP_URL;
    return {
        port,
        databaseUrl,
        openrouterApiKey,
        openrouterModel: modelSlug,
        openrouterAppTitle,
        openrouterAppUrl,
    };
};
exports.validateEnv = validateEnv;
//# sourceMappingURL=env.validation.js.map