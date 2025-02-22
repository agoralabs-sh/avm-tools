import { describe, expect, test } from 'vitest';

// utilities
import generate from './generate';

describe('generate', () => {
  test('should generate a uuid in lowercase', () => {
    const result = generate();

    expect(/[a-z]/.test(result)).toBe(true);
  });

  test('should generate a uuid in uppercase', () => {
    const result = generate({ uppercase: true });

    expect(/[a-z]/.test(result)).toBe(false);
  });
});
