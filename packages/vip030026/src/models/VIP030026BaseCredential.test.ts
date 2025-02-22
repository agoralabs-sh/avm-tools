import { generate as generateUUID } from '@agoralabs-sh/uuid';
import { describe, expect, test } from 'vitest';

// enums
import { VIP030026AlgorithmIDEnum } from '@/enums';

// models
import VIP030026PrivateKeyCredential from './VIP030026PrivateKeyCredential';

describe('VIP030026BaseCredential', () => {
  describe('algorithm()', () => {
    test('it should return a ecdsa algorithm with a secp256k1 curve', () => {
      const algorithm = VIP030026AlgorithmIDEnum.ES256K;
      const credential = VIP030026PrivateKeyCredential.generate({
        algorithm,
      });

      expect(credential.algorithm()).toBe(algorithm);
    });

    test('it should return a ed25519 algorithm', () => {
      const algorithm = VIP030026AlgorithmIDEnum.Ed25519;
      const credential = VIP030026PrivateKeyCredential.generate({
        algorithm,
      });

      expect(credential.algorithm()).toBe(algorithm);
    });
  });

  describe('id()', () => {
    test('it should return the specified id', () => {
      const id = generateUUID();
      const credential = VIP030026PrivateKeyCredential.generate({
        id,
      });

      expect(credential.id()).toBe(id);
    });
  });
});
