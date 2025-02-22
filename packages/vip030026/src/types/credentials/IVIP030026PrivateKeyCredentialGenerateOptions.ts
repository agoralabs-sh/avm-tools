// enums
import type { VIP030026AlgorithmIDEnum } from '@/enums';

/**
 * @property {VIP030026AlgorithmIDEnum} algorithm - [optional] A valid VIP-03-0026 algorithm identifier.
 * @property {string} id - [optional] A UUID v4 unique identifier for the credential.
 */
interface IVIP030026PrivateKeyCredentialGenerateOptions {
  algorithm?: VIP030026AlgorithmIDEnum;
  id?: string;
}

export default IVIP030026PrivateKeyCredentialGenerateOptions;
