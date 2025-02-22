import { encode as encodeHex } from '@stablelib/hex';

// types
import type { IExtraOptions } from '@/types';

/**
 * Encodes the UUID into the human-readable format with hyphens added.
 * @param {Uint8Array} value - The UUID in bytes.
 * @param {IExtraOptions} options - [optional] Whether the UUID is returned in uppercase of lower case.
 * @returns {string} The UUID with the hyphens added.
 */
export default function encode(value: Uint8Array, { uppercase }: IExtraOptions = { uppercase: false }): string {
  const hexString = encodeHex(value, !uppercase);

  return `${hexString.slice(0, 8)}-${hexString.slice(
    8,
    12
  )}-${hexString.slice(12, 16)}-${hexString.slice(16, 20)}-${hexString.slice(20, 32)}`;
}
