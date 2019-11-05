import { PositionType } from './position';

export interface PlayerType extends PositionType {
  id: string;
  isMoving: boolean;
  isMirrored: boolean;
}
