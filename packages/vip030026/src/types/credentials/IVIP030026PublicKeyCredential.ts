// enums
import { VIP030026AlgorithmIDEnum } from '@/enums';

/**
 * @property {VIP030026AlgorithmIDEnum} algorithm - The algorithm ID. The supported algorithms are part of the
 * VIP-03-0026 specification.
 * @property {string} id - A UUID v4 unique identifier for the provider.
 * @property {string} publicKey - A base64 encoded public key from the provider that is used in the signing.
 */
interface IVIP030026PublicKeyCredential {
  readonly algorithm: VIP030026AlgorithmIDEnum;
  readonly id: string;
  readonly publicKey: string;
}

export default IVIP030026PublicKeyCredential;
