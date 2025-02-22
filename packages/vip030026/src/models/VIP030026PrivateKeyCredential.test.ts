import { randomBytes } from '@stablelib/random';
import { describe, expect, test } from 'vitest';

// enums
import { VIP030026AlgorithmIDEnum } from '@/enums';

// models
import VIP030026PrivateKeyCredential from './VIP030026PrivateKeyCredential';

describe(VIP030026PrivateKeyCredential.name, () => {
  const challenge = randomBytes(32);

  describe('sign()', () => {
    test('it should sign using a ecdsa algorithm with a secp256k1 curve', () => {
      const credential = VIP030026PrivateKeyCredential.generate({
        algorithm: VIP030026AlgorithmIDEnum.ES256K,
      });
      const signature = credential.sign(challenge);

      expect(signature.byteLength).toBe(64);
    });

    test('it should sign using a ed25519 algorithm', () => {
      const credential = VIP030026PrivateKeyCredential.generate({
        algorithm: VIP030026AlgorithmIDEnum.Ed25519,
      });
      const signature = credential.sign(challenge);

      expect(signature.byteLength).toBe(64);
    });
  });
});
