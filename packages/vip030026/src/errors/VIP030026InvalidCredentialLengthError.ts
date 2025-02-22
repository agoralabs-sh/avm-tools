// constants
import { ID_BYTE_LENGTH } from '@/constants';

// enums
import { VIP030026ErrorTypeEnum } from '@/enums';

// errors
import BaseVIP030026Error from './BaseVIP030026Error';

// types
import type { IVIP030026InvalidCredentialLengthErrorOptions } from '@/types';

export default class VIP030026InvalidCredentialLengthError extends BaseVIP030026Error {
  public readonly type: VIP030026ErrorTypeEnum = VIP030026ErrorTypeEnum.InvalidCredentialLengthError;
  public readonly length: number | undefined;

  public constructor(options?: IVIP030026InvalidCredentialLengthErrorOptions) {
    super({
      message:
        options?.message ||
        `invalid byte length for credentials: expected ${ID_BYTE_LENGTH} bytes${options?.length ? `, actual ${options.length} bytes` : ''}`,
    });

    this.length = options?.length;
  }
}
