import { PlayerType } from '../models/player-type';
import { PositionType } from '../models/position-type';

export enum PlayerActionTypes {
  MOVE_PLAYER = 'MOVE_PLAYER',
  STOP_PLAYER = 'STOP_PLAYER',
  SET_PLAYER_SIZE = 'SET_PLAYER_SIZE',
}

export interface MovePlayerActionType {
  type: PlayerActionTypes.MOVE_PLAYER;
  payload: {
    id: PlayerType['id'];
    dt: PositionType;
    isMirrored: boolean;
  };
}

export function movePlayer(
  id: PlayerType['id'],
  dt: PositionType,
  isMirrored: boolean,
): MovePlayerActionType {
  return {
    type: PlayerActionTypes.MOVE_PLAYER,
    payload: {
      id,
      dt,
      isMirrored,
    },
  };
}

export interface StopPlayerActionType {
  type: PlayerActionTypes.STOP_PLAYER;
  payload: {
    id: PlayerType['id'];
  };
}

export function stopPlayer(id: PlayerType['id']): StopPlayerActionType {
  return {
    type: PlayerActionTypes.STOP_PLAYER,
    payload: {
      id,
    },
  };
}
