// enums
import { VIP030026ErrorTypeEnum } from '@/enums';

// errors
import BaseVIP030026Error from './BaseVIP030026Error';

// types
import type { IVIP030026UnsupportedAlgorithmIDErrorOptions } from '@/types';

export default class VIP030026UnsupportedAlgorithmIDError extends BaseVIP030026Error {
  public readonly type: VIP030026ErrorTypeEnum = VIP030026ErrorTypeEnum.UnsupportedAlgorithmIDError;
  public readonly algorithm: string | undefined;

  public constructor(options?: IVIP030026UnsupportedAlgorithmIDErrorOptions) {
    super({
      message: options?.message || `unsupported algorithm${options?.algorithm ? ` "${options.algorithm}"` : ''}`,
    });

    this.algorithm = options?.algorithm;
  }
}
