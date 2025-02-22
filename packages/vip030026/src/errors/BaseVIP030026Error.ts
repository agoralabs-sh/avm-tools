// enums
import { VIP030026ErrorTypeEnum } from '@/enums';

// types
import type { IBaseVIP030026ErrorOptions } from '@/types';

export default abstract class BaseVIP030026Error {
  public readonly type: VIP030026ErrorTypeEnum;
  public readonly isVIP030026Error: boolean = true;
  public message: string;

  public constructor({ message }: IBaseVIP030026ErrorOptions) {
    this.message = message.toLowerCase();
  }
}
