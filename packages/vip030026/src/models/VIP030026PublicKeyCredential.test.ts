import { randomBytes } from '@stablelib/random';
import { describe, expect, test } from 'vitest';

// enums
import { VIP030026AlgorithmIDEnum } from '@/enums';

// models
import VIP030026PrivateKeyCredential from './VIP030026PrivateKeyCredential';
import VIP030026PublicKeyCredential from './VIP030026PublicKeyCredential';

interface ITestParams {
  credential: VIP030026PrivateKeyCredential;
  description: string;
}

describe(VIP030026PublicKeyCredential.name, () => {
  const bytesToSign = randomBytes(32);

  describe('verify()', () => {
    test.each<ITestParams>([
      {
        credential: VIP030026PrivateKeyCredential.generate({
          algorithm: VIP030026AlgorithmIDEnum.ES256K,
        }),
        description: 'ecdsa algorithm with a secp256k1 curve',
      },
      {
        credential: VIP030026PrivateKeyCredential.generate({
          algorithm: VIP030026AlgorithmIDEnum.Ed25519,
        }),
        description: 'ed25519 algorithm',
      },
    ])('should fail to verify a $description if the bytes to sign are different', ({ credential }) => {
      const { privateKey: _, ...publicKeyCredential } = credential.toJSON();
      const _credential = VIP030026PublicKeyCredential.fromJSON(publicKeyCredential);
      const signature = credential.sign(bytesToSign);
      const result = _credential.verify({
        bytes: randomBytes(32), // different bytes
        signature,
      });

      expect(result).toBe(false);
    });

    test.each<ITestParams>([
      {
        credential: VIP030026PrivateKeyCredential.generate({
          algorithm: VIP030026AlgorithmIDEnum.ES256K,
        }),
        description: 'ecdsa algorithm with a secp256k1 curve',
      },
      {
        credential: VIP030026PrivateKeyCredential.generate({
          algorithm: VIP030026AlgorithmIDEnum.Ed25519,
        }),
        description: 'ed25519 algorithm',
      },
    ])('should fail to verify a $description if the signature is different', ({ credential }) => {
      const { privateKey: _, ...publicKeyCredential } = credential.toJSON();
      const _credential = VIP030026PublicKeyCredential.fromJSON(publicKeyCredential);
      const signature = credential.sign(randomBytes(32)); // sign using different bytes
      const result = _credential.verify({
        bytes: bytesToSign,
        signature,
      });

      expect(result).toBe(false);
    });

    test.each<ITestParams>([
      {
        credential: VIP030026PrivateKeyCredential.generate({
          algorithm: VIP030026AlgorithmIDEnum.ES256K,
        }),
        description: 'ecdsa algorithm with a secp256k1 curve',
      },
      {
        credential: VIP030026PrivateKeyCredential.generate({
          algorithm: VIP030026AlgorithmIDEnum.Ed25519,
        }),
        description: 'ed25519 algorithm',
      },
    ])('should successfully verify a $description', ({ credential }) => {
      const { privateKey: _, ...publicKeyCredential } = credential.toJSON();
      const _credential = VIP030026PublicKeyCredential.fromJSON(publicKeyCredential);
      const signature = credential.sign(bytesToSign);
      const result = _credential.verify({
        bytes: bytesToSign,
        signature,
      });

      expect(result).toBe(true);
    });
  });
});
