// types
import type IVIP030026PublicKeyCredential from './IVIP030026PublicKeyCredential';

/**
 * @property {string} privateKey - A base64 encoded private key that is used in signing.
 */
interface IVIP030026PrivateKeyCredential extends IVIP030026PublicKeyCredential {
  readonly privateKey: string;
}

export default IVIP030026PrivateKeyCredential;
