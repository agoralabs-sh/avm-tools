import { concat as concatBytes } from '@agoralabs-sh/bytes';
import { decode as decodeUUID } from '@agoralabs-sh/uuid';
import { sha256 } from '@noble/hashes/sha2';
import { decode as decodeBase64 } from '@stablelib/base64';

// constants
import { ALGORITHM_BYTE_LENGTH, ID_BYTE_LENGTH } from '@/constants';

// enums
import { VIP030026AlgorithmIDEnum } from '@/enums';

// errors
import { VIP030026InvalidCredentialLengthError, VIP030026UnsupportedAlgorithmIDError } from '@/errors';

// models
import VIP030026BaseCredential from './VIP030026BaseCredential';

// types
import type { IVIP030026PublicKeyCredential } from '@/types';

/**
 * The public key credential adheres to the VIP-03-0026 standard that allows clients infer a credential and use it to
 * verify the integrity of a provider response.
 */
export default class VIP030026PublicKeyCredential extends VIP030026BaseCredential<IVIP030026PublicKeyCredential> {
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
      decodeUUID(credential.id.toLowerCase()),
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
   * protected methods
   */

  /**
   * Gets the raw public key bytes from the credential.
   * @returns {Uint8Array} The raw public key bytes.
   * @protected
   */
  protected _publicKeyBytes(): Uint8Array {
    return this._credential.slice(ID_BYTE_LENGTH + ALGORITHM_BYTE_LENGTH);
  }

  /**
   * public methods
   */

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
}
