import { uuid } from '@stablelib/uuid';

/**
 * Generates a random UUID v4 string.
 * @returns {string} A random UUID v4 string.
 */
export default function generate(): string {
  return uuid();
}
