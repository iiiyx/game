import { PlayerType } from './player';
import { PositionType } from './position';

export interface BallType extends PositionType {
  isKicked: boolean;
  isMirrored: boolean;
  owner?: PlayerType['id'];
}
