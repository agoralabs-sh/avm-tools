import { uuid } from '@stablelib/uuid';

// types
import type { IExtraOptions } from '@/types';

/**
 * Generates a random UUID v4 string.
 * @param {IExtraOptions} options - [optional] Whether the UUID is returned in uppercase of lower case.
 * @returns {string} A random UUID v4 string.
 */
export default function generate({ uppercase }: IExtraOptions = { uppercase: false }): string {
  const _uuid = uuid();

  if (uppercase) {
    return _uuid.toUpperCase();
  }

  return _uuid.toLowerCase();
}
