import { describe, expect, test } from 'vitest';

// utilities
import { decode } from '@/decode';
import { generate } from '@/generate';
import encode from './encode';

describe('decode', () => {
  test('should encode a uuid', () => {
    const uuid = generate();
    const decodedUUID = decode(uuid);
    const result = encode(decodedUUID);

    expect(result).toBe(uuid);
  });

  test('should encode a uuid in lowercase', () => {
    const uuid = generate();
    const decodedUUID = decode(uuid);
    const result = encode(decodedUUID);

    expect(/[a-z]/.test(result)).toBe(true);
  });

  test('should encode a uuid in uppercase', () => {
    const uuid = generate();
    const decodedUUID = decode(uuid);
    const result = encode(decodedUUID, { uppercase: true });

    expect(/[a-z]/.test(result)).toBe(false);
  });
});
