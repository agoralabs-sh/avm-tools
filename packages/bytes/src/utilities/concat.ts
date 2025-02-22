import { concat } from '@stablelib/bytes';

/**
 * Convenience function that concatenates a number of Uint8Arrays.
 * @param {...Uint8Array[]} arrays - A list of arrays to concatenate.
 * @returns {Uint8Array} The arrays concatenated.
 */
export default function isEqual(...arrays: Uint8Array[]): Uint8Array {
  return concat(...arrays);
}
