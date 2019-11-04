import { PositionType } from './position';
import { PlayerType } from './player';

export interface BallType extends PositionType {
  isKicked: boolean;
  isMirrored: boolean;
  owner?: PlayerType['id'];
}
