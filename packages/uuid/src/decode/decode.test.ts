import { describe, expect, test } from 'vitest';

// utilities
import { generate } from '@/generate';
import decode from './decode';

describe('decode', () => {
  test('should decode a uuid', () => {
    const uuid = generate();
    const result = decode(uuid);

    expect(result.byteLength).toBe(16);
  });
});
