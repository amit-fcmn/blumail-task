import { createHash } from 'crypto';

/**
 * Normalizes feedback text for deduplication hashing.
 * @param content - Raw feedback content
 * @returns Normalized string (trim, collapse whitespace, lowercase)
 */
export const normalizeContent = (content: string): string => {
  const trimmed = content.trim();
  const collapsed = trimmed.replace(/\s+/g, ' ');
  return collapsed.toLowerCase();
};

/**
 * Computes SHA-256 hash of normalized feedback content.
 * @param content - Raw feedback content
 * @returns Hex-encoded SHA-256 digest
 */
export const hashContent = (content: string): string => {
  const normalized = normalizeContent(content);
  return createHash('sha256').update(normalized).digest('hex');
};
