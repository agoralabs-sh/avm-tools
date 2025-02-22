import { encode as encodeHex } from '@stablelib/hex';

/**
 * Encodes the UUID into the human-readable format with the hyphen replaced.
 * @param {Uint8Array} value - The UUID in bytes.
 * @returns {string} The UUID with the hyphens added.
 */
export default function encode(value: Uint8Array): string {
  const hexString = encodeHex(value);

  return `${hexString.slice(0, 8)}-${hexString.slice(
    8,
    12
  )}-${hexString.slice(12, 16)}-${hexString.slice(16, 20)}-${hexString.slice(20, 32)}`;
}
