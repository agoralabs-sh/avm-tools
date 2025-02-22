import { randomBytes } from 'node:crypto';
import { describe, expect, test } from 'vitest';

// utils
import isEqual from './isEqual';

describe('isEqual', () => {
  test('should return false if the arrays are not equal length', () => {
    const arr1 = new Uint8Array(10);
    const arr2 = new Uint8Array(arr1.length * 2);

    expect(isEqual(arr1, arr2)).toBe(false);
  });

  test('should return false if the arrays are the same length but not equal', () => {
    const size = 10;
    const arr1 = randomBytes(size);
    const arr2 = randomBytes(size);

    expect(isEqual(arr1, arr2)).toBe(false);
  });

  test('should return true for the same array', () => {
    const arr = randomBytes(10);

    expect(isEqual(arr, arr)).toBe(true);
  });

  test('should return true for empty arrays', () => {
    expect(isEqual(new Uint8Array(), new Uint8Array())).toBe(true);
  });
});
