import { PlayerType } from './player-type';
import { BallType } from './ball-type';

export interface StateType {
  players: {
    [id: string]: PlayerType;
  };
  ball: BallType;
}
