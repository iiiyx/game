import { PlayerType } from './player-type';
import { PositionType } from './position-type';

export interface BallType extends PositionType {
  isKicked: boolean;
  isMirrored: boolean;
  owner?: PlayerType['id'];
}
