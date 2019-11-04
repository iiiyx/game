import { PlayerType } from '../types/player';
import { PositionType } from '../types/position';

export enum BallActionTypes {
  KICK = 'KICK',
  CHANGE_OWNER = 'CHANGE_OWNER',
  MOVE_BALL = 'MOVE_BALL',
}

export interface KickActionType {
  type: BallActionTypes.KICK;
}

export function kick(): KickActionType {
  return {
    type: BallActionTypes.KICK,
  };
}

export interface ChangeOwnerActionType {
  type: BallActionTypes.CHANGE_OWNER;
  payload: {
    id: PlayerType['id'];
  };
}

export function changeOwner(id: PlayerType['id']): ChangeOwnerActionType {
  return {
    type: BallActionTypes.CHANGE_OWNER,
    payload: {
      id,
    },
  };
}

export interface MoveBallActionType {
  type: BallActionTypes.MOVE_BALL;
  payload: {
    id: PlayerType['id'];
    dt: PositionType;
    isMirrored: boolean;
  };
}

export function moveBall(
  id: PlayerType['id'],
  dt: PositionType,
  isMirrored: boolean,
): MoveBallActionType {
  return {
    type: BallActionTypes.MOVE_BALL,
    payload: {
      id,
      dt,
      isMirrored,
    },
  };
}
