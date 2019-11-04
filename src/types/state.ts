import { PlayerType } from './player';
import { BallType } from './ball';

export interface StateType {
  players: {
    [id: string]: PlayerType;
  };
  ball: BallType;
}
