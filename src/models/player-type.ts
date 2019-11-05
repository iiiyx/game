import { PositionType } from './position-type';

export interface PlayerType extends PositionType {
  id: string;
  isMoving: boolean;
  isMirrored: boolean;
}
