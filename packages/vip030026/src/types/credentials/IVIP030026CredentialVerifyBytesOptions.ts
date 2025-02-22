/**
 * @property {Uint8Array} bytes - The bytes that were used to sign.
 * @property {Uint8Array} signature - The signature as a result of the signing.
 */
interface IVIP030026CredentialVerifyBytesOptions {
  bytes: Uint8Array;
  signature: Uint8Array;
}

export default IVIP030026CredentialVerifyBytesOptions;
