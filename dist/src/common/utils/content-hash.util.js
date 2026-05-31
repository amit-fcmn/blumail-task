"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashContent = exports.normalizeContent = void 0;
const crypto_1 = require("crypto");
const normalizeContent = (content) => {
    const trimmed = content.trim();
    const collapsed = trimmed.replace(/\s+/g, ' ');
    return collapsed.toLowerCase();
};
exports.normalizeContent = normalizeContent;
const hashContent = (content) => {
    const normalized = (0, exports.normalizeContent)(content);
    return (0, crypto_1.createHash)('sha256').update(normalized).digest('hex');
};
exports.hashContent = hashContent;
//# sourceMappingURL=content-hash.util.js.map