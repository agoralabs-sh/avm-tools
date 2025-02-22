import { decode as decodeHex } from '@stablelib/hex';

/**
 * Decodes the UUID into a byte array.
 * @param {string} value - The UUID with or without hyphens.
 * @returns {Uint8Array} The UUID as bytes.
 */
export default function decode(value: string): Uint8Array {
  return decodeHex(value.replace(/-/g, ''));
}
