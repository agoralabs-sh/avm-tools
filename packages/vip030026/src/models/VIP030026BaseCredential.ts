import { isEqual as isBytesEqual } from '@agoralabs-sh/bytes';
import { encode as encodeUUID } from '@agoralabs-sh/uuid';
import { ed25519 } from '@noble/curves/ed25519';
import { secp256k1 } from '@noble/curves/secp256k1';
import { sha256 } from '@noble/hashes/sha2';
import { encode as encodeBase64 } from '@stablelib/base64';

// constants
import { ALGORITHM_BYTE_LENGTH, ID_BYTE_LENGTH } from '@/constants';

// enums
import { VIP030026AlgorithmIDEnum } from '@/enums';

// errors
import { VIP030026UnsupportedAlgorithmIDError } from '@/errors';

// types
import { IVIP030026CredentialVerifyBytesOptions } from '@/types';

export default abstract class VIP030026BaseCredential<Type> {
  // private variables
  protected readonly _credential: Uint8Array;

  protected constructor(credential: Uint8Array) {
    this._credential = credential;
  }

  /**
   * protected abstract methods
   */

  protected abstract _publicKeyBytes(): Uint8Array;

  /**
   * public abstract methods
   */

  public abstract toJSON(): Type;

  /**
   * protected methods
   */

  /**
   * Gets the raw algorithm, this will be the first 4 bytes of the VIP-03-0026 algorithm ID hashed using SHA-256.
   * @returns {Uint8Array} The first 4 bytes of the VIP-03-0026 algorithm ID hashed using SHA-256.
   * @protected
   */
  protected _algorithmHashBytes(): Uint8Array {
    return this._credential.slice(ID_BYTE_LENGTH, ID_BYTE_LENGTH + ALGORITHM_BYTE_LENGTH);
  }

  /**
   * Gets the ID as bytes.
   * @returns {Uint8Array} The ID as bytes.
   * @protected
   */
  protected _idBytes(): Uint8Array {
    return this._credential.slice(0, ID_BYTE_LENGTH);
  }

  /**
   * public methods
   */

  /**
   * Gets the VIP-03-0026 algorithm ID.
   * @returns {VIP030026AlgorithmIDEnum} The VIP-03-0026 algorithm ID for the credential.
   * @throws {VIP030026UnsupportedAlgorithmIDError} If the algorithm is unsupported.
   */
  public algorithm(): VIP030026AlgorithmIDEnum {
    const _algorithm = this._algorithmHashBytes();

    if (isBytesEqual(_algorithm, sha256(VIP030026AlgorithmIDEnum.ES256K).slice(0, ALGORITHM_BYTE_LENGTH))) {
      return VIP030026AlgorithmIDEnum.ES256K;
    }

    if (isBytesEqual(_algorithm, sha256(VIP030026AlgorithmIDEnum.Ed25519).slice(0, ALGORITHM_BYTE_LENGTH))) {
      return VIP030026AlgorithmIDEnum.Ed25519;
    }

    throw new VIP030026UnsupportedAlgorithmIDError();
  }

  /**
   * Gets the ID of the credential.
   * @returns {string} The UUID v4 ID of the credential.
   * @public
   */
  public id(): string {
    return encodeUUID(this._idBytes());
  }

  /**
   * Gets the base64 encoded public key of the credential.
   * @returns {string} The public key as a base64 encoded string.
   * @public
   */
  public publicKey(): string {
    return encodeBase64(this._publicKeyBytes());
  }

  /**
   * Gets the credential as raw bytes.
   * @returns {Uint8Array} The credential as bytes.
   * @public
   */
  public toBytes(): Uint8Array {
    return this._credential;
  }

  /**
   * Gets the credential as a base64 encoded string.
   * @returns {string} The credential as a base64 encoded string.
   * @public
   */
  public toString(): string {
    return encodeBase64(this._credential);
  }

  /**
   * Verifies the supplied bytes' hash against the credentials and signature.
   * @param {IVIP030026CredentialVerifyBytesOptions} options - The bytes used to sign and the signature.
   * @returns {boolean} True if the signature can be verified, false otherwise.
   * @throws {VIP030026UnsupportedAlgorithmIDError} If the algorithm is unsupported.
   * @public
   */
  public verify({ bytes, signature }: IVIP030026CredentialVerifyBytesOptions): boolean {
    const algorithm = this.algorithm();
    const publicKeyBytes = this._publicKeyBytes();

    switch (algorithm) {
      case VIP030026AlgorithmIDEnum.Ed25519:
        return ed25519.verify(signature, bytes, publicKeyBytes);
      case VIP030026AlgorithmIDEnum.ES256K:
        return secp256k1.verify(signature, bytes, publicKeyBytes, { prehash: true });
      default:
        throw new VIP030026UnsupportedAlgorithmIDError({
          algorithm,
        });
    }
  }
}
