import { concat as concatBytes } from '@agoralabs-sh/bytes';
import { decode as decodeUUID, generate as generateUUID } from '@agoralabs-sh/uuid';
import { ed25519 } from '@noble/curves/ed25519';
import { secp256k1 } from '@noble/curves/secp256k1';
import { sha256 } from '@noble/hashes/sha2';
import { decode as decodeBase64, encode as encodeBase64 } from '@stablelib/base64';

// constants
import { ALGORITHM_BYTE_LENGTH, ID_BYTE_LENGTH } from '@/constants';

// enums
import { VIP030026AlgorithmIDEnum } from '@/enums';

// errors
import { VIP030026InvalidCredentialLengthError, VIP030026UnsupportedAlgorithmIDError } from '@/errors';

// models
import VIP030026BaseCredential from './VIP030026BaseCredential';

// types
import type { IVIP030026PrivateKeyCredential, IVIP030026PrivateKeyCredentialGenerateOptions } from '@/types';

/**
 * The private key credential adheres to the VIP-03-0026 standard that allows  providers to create a credential that
 * can be used to sign client message response and ensure the integrity of the message result.
 *
 * **NOTE:** A VIP-03-0026 private key credential should be exclusively used by the provider and should not be exposed
 * to the client.
 */
export default class VIP030026PrivateKeyCredential extends VIP030026BaseCredential<IVIP030026PrivateKeyCredential> {
  /**
   * public static methods
   */

  /**
   * Creates a credential from raw bytes.
   * @param {Uint8Array} credential - A VIP-03-0026 credential as raw bytes.
   * @returns {VIP030026PublicKeyCredential} An initialized VIP030026PublicKeyCredential.
   * @throws {VIP030026InvalidCredentialLengthError} If the credential length is invalid.
   * @static
   * @public
   */
  public static fromBytes(credential: Uint8Array): VIP030026PrivateKeyCredential {
    if (credential.byteLength < ID_BYTE_LENGTH + ALGORITHM_BYTE_LENGTH) {
      throw new VIP030026InvalidCredentialLengthError({
        length: credential.byteLength,
      });
    }

    return new VIP030026PrivateKeyCredential(credential);
  }

  /**
   * Creates a credential from a JSON.
   * @param {IVIP030026PrivateKeyCredential} credential - A JSON containing the values of a credential.
   * @returns {VIP030026PrivateKeyCredential} An initialized VIP030026PrivateKeyCredential.
   * @throws {VIP030026UnsupportedAlgorithmIDError} If the algorithm is unsupported.
   * @throws {VIP030026InvalidCredentialLengthError} If the credential length is invalid.
   * @static
   * @public
   */
  public static fromJSON(credential: IVIP030026PrivateKeyCredential): VIP030026PrivateKeyCredential {
    let _credential: Uint8Array;

    if (!Object.values(VIP030026AlgorithmIDEnum).some((value) => value === credential.algorithm)) {
      throw new VIP030026UnsupportedAlgorithmIDError({
        algorithm: credential.algorithm,
      });
    }

    _credential = concatBytes(
      decodeUUID(credential.id.toLowerCase()),
      sha256(credential.algorithm).slice(0, ALGORITHM_BYTE_LENGTH), // get the first 4 bytes of the hash
      decodeBase64(credential.privateKey)
    );

    if (_credential.byteLength < ID_BYTE_LENGTH + ALGORITHM_BYTE_LENGTH) {
      throw new VIP030026InvalidCredentialLengthError({
        length: _credential.byteLength,
      });
    }

    return new VIP030026PrivateKeyCredential(_credential);
  }

  /**
   * Generates a new VIP-03-0026 compliant private key credential. If no algorithm or ID are defined, Ed25519 is used to
   * create the private key and a random unique UUID is used.
   * @param {IVIP030026PrivateKeyCredentialGenerateOptions} options - [optional] The algorithm and a UUID identifier.
   * @returns {VIP030026PrivateKeyCredential} An initialized VIP030026PrivateKeyCredential.
   * @throws {VIP030026UnsupportedAlgorithmIDError} If the supplied algorithm is unsupported.
   * @throws {VIP030026InvalidCredentialLengthError} If the supplied cause the credential length to be invalid.
   * @static
   * @public
   */
  public static generate(options?: IVIP030026PrivateKeyCredentialGenerateOptions): VIP030026PrivateKeyCredential {
    const algorithm = options?.algorithm ?? VIP030026AlgorithmIDEnum.Ed25519;
    const id = options?.id ?? generateUUID();
    let credential: Uint8Array;
    let privateKeyBytes: Uint8Array;

    switch (algorithm) {
      case VIP030026AlgorithmIDEnum.Ed25519:
        privateKeyBytes = ed25519.utils.randomPrivateKey();
        break;
      case VIP030026AlgorithmIDEnum.ES256K:
        privateKeyBytes = secp256k1.utils.randomPrivateKey();
        break;
      default:
        throw new VIP030026UnsupportedAlgorithmIDError({
          algorithm,
        });
    }

    credential = concatBytes(
      decodeUUID(id.toLowerCase()),
      sha256(algorithm).slice(0, ALGORITHM_BYTE_LENGTH), // get the first 4 bytes of the hash
      privateKeyBytes
    );

    if (credential.byteLength < ID_BYTE_LENGTH + ALGORITHM_BYTE_LENGTH) {
      throw new VIP030026InvalidCredentialLengthError({
        length: credential.byteLength,
      });
    }

    return new VIP030026PrivateKeyCredential(credential);
  }

  /**
   * protected methods
   */

  /**
   * Gets the raw public key bytes from the credential.
   * @returns {Uint8Array} The raw public key bytes.
   * @protected
   */
  protected _publicKeyBytes(): Uint8Array {
    const algorithm = this.algorithm();
    const privateKeyBytes = this._privateKeyBytes();

    switch (algorithm) {
      case VIP030026AlgorithmIDEnum.Ed25519:
        return ed25519.getPublicKey(privateKeyBytes);
      case VIP030026AlgorithmIDEnum.ES256K:
        return secp256k1.getPublicKey(privateKeyBytes);
      default:
        throw new VIP030026UnsupportedAlgorithmIDError({
          algorithm,
        });
    }
  }

  /**
   * Gets the raw private key bytes from the credential.
   * @returns {Uint8Array} The raw private key bytes.
   * @protected
   */
  protected _privateKeyBytes(): Uint8Array {
    return this._credential.slice(ID_BYTE_LENGTH + ALGORITHM_BYTE_LENGTH);
  }

  /**
   * public methods
   */

  /**
   * Gets the base64 encoded private key of the credential.
   * @returns {string} The private key as a base64 encoded string.
   * @public
   */
  public privateKey(): string {
    return encodeBase64(this._privateKeyBytes());
  }

  /**
   * Signs a hash of the supplied bytes using the provided credentials.
   * @param {Uint8Array} bytes - The bytes to be signed.
   * @returns {Uint8Array} The signature of the .
   */
  public sign(bytes: Uint8Array): Uint8Array {
    const algorithm = this.algorithm();
    const privateKeyBytes = this._privateKeyBytes();

    switch (algorithm) {
      case VIP030026AlgorithmIDEnum.Ed25519:
        return ed25519.sign(bytes, privateKeyBytes);
      case VIP030026AlgorithmIDEnum.ES256K:
        return secp256k1.sign(bytes, privateKeyBytes, { prehash: true }).toCompactRawBytes();
      default:
        throw new VIP030026UnsupportedAlgorithmIDError({
          algorithm,
        });
    }
  }

  /**
   * Gets the credential as a JSON.
   * @returns {IVIP030026PrivateKeyCredential} The credential formatted as a JSON.
   * @throws {VIP030026UnsupportedAlgorithmIDError} If the algorithm is unsupported.
   * @public
   */
  public toJSON(): IVIP030026PrivateKeyCredential {
    return {
      algorithm: this.algorithm(),
      id: this.id(),
      privateKey: this.privateKey(),
      publicKey: this.publicKey(),
    };
  }
}
