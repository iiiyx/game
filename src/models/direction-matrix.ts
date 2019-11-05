import { KeyCodesEnum } from './key-codes-enum';

export interface DirectionMatrixType {
  [KeyCodesEnum.ARROW_UP]: boolean;
  [KeyCodesEnum.ARROW_DOWN]: boolean;
  [KeyCodesEnum.ARROW_LEFT]: boolean;
  [KeyCodesEnum.ARROW_RIGHT]: boolean;
}
