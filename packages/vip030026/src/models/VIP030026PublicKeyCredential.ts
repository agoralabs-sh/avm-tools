import { concat as concatBytes, isEqual as isBytesEqual } from '@agoralabs-sh/bytes';
import { decode as decodeUUID, encode as encodeUUID } from '@agoralabs-sh/uuid';
import { sha256 } from '@noble/hashes/sha2';
import { decode as decodeBase64, encode as encodeBase64 } from '@stablelib/base64';

// constants
import { ALGORITHM_BYTE_LENGTH, ID_BYTE_LENGTH } from '@/constants';

// enums
import { VIP030026AlgorithmIDEnum } from '@/enums';

// errors
import { VIP030026InvalidCredentialLengthError, VIP030026UnsupportedAlgorithmIDError } from '@/errors';

// types
import type { IVIP030026PublicKeyCredential } from '@/types';

export default class VIP030026PublicKeyCredential {
  // private variables
  private readonly _credential: Uint8Array;

  private constructor(credential: Uint8Array) {
    this._credential = credential;
  }

  /**
   * private methods
   */

  /**
   * Gets the raw algorithm, this will be the first 4 bytes of the VIP-03-0026 algorithm ID hashed using SHA-256.
   * @returns {Uint8Array} The first 4 bytes of the VIP-03-0026 algorithm ID hashed using SHA-256.
   * @
   */
  public _algorithmHashBytes(): Uint8Array {
    return this._credential.slice(ID_BYTE_LENGTH, ID_BYTE_LENGTH + ALGORITHM_BYTE_LENGTH);
  }

  /**
   * Gets the ID as bytes.
   * @returns {Uint8Array} The ID as bytes.
   * @private
   */
  public _idBytes(): Uint8Array {
    return this._credential.slice(0, ID_BYTE_LENGTH - 1);
  }

  public _publicKeyBytes(): Uint8Array {
    return this._credential.slice(ID_BYTE_LENGTH + ALGORITHM_BYTE_LENGTH);
  }

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
  public static fromBytes(credential: Uint8Array): VIP030026PublicKeyCredential {
    if (credential.byteLength < ID_BYTE_LENGTH + ALGORITHM_BYTE_LENGTH) {
      throw new VIP030026InvalidCredentialLengthError({
        length: credential.byteLength,
      });
    }

    return new VIP030026PublicKeyCredential(credential);
  }

  /**
   * Creates a credential from a JSON.
   * @param {IVIP030026PublicKeyCredential} credential - A JSON containing the values of a credential.
   * @returns {VIP030026PublicKeyCredential} An initialized VIP030026PublicKeyCredential.
   * @throws {VIP030026UnsupportedAlgorithmIDError} If the algorithm is unsupported.
   * @throws {VIP030026InvalidCredentialLengthError} If the credential length is invalid.
   * @static
   * @public
   */
  public static fromJSON(credential: IVIP030026PublicKeyCredential): VIP030026PublicKeyCredential {
    let _credential: Uint8Array;

    if (!Object.values(VIP030026AlgorithmIDEnum).some((value) => value === credential.algorithm)) {
      throw new VIP030026UnsupportedAlgorithmIDError({
        algorithm: credential.algorithm,
      });
    }

    _credential = concatBytes(
      decodeUUID(credential.id),
      sha256(credential.algorithm).slice(0, ALGORITHM_BYTE_LENGTH), // get the first 4 bytes of the hash
      decodeBase64(credential.publicKey)
    );

    if (_credential.byteLength < ID_BYTE_LENGTH + ALGORITHM_BYTE_LENGTH) {
      throw new VIP030026InvalidCredentialLengthError({
        length: _credential.byteLength,
      });
    }

    return new VIP030026PublicKeyCredential(_credential);
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

    if (isBytesEqual(_algorithm, sha256(VIP030026AlgorithmIDEnum.ES256K))) {
      return VIP030026AlgorithmIDEnum.ES256K;
    }

    if (isBytesEqual(_algorithm, sha256(VIP030026AlgorithmIDEnum.Ed25519))) {
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
   * Gets the credential as a JSON.
   * @returns {IVIP030026PublicKeyCredential} The credential formatted as a JSON.
   * @throws {VIP030026UnsupportedAlgorithmIDError} If the algorithm is unsupported.
   * @public
   */
  public toJSON(): IVIP030026PublicKeyCredential {
    return {
      algorithm: this.algorithm(),
      id: this.id(),
      publicKey: this.publicKey(),
    };
  }

  /**
   * Gets the credential as a base64 encoded string.
   * @returns {string} The credential as a base64 encoded string.
   * @public
   */
  public toString(): string {
    return encodeBase64(this._credential);
  }
}
