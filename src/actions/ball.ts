import { PlayerType } from '../models/player';
import { PositionType } from '../models/position';

export enum BallActionTypes {
  INIT_BALL = 'INIT_BALL',
  SET_BALL_SIZE = 'SET_BALL_SIZE',
  KICK = 'KICK',
  CHANGE_OWNER = 'CHANGE_OWNER',
  MOVE_BALL_BY_PLAYER = 'MOVE_BALL',
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
  type: BallActionTypes.MOVE_BALL_BY_PLAYER;
  payload: {
    newPosition: PositionType;
    isMirrored: boolean;
  };
}

export function moveBallByPlayer(
  newPosition: PositionType,
  isMirrored: boolean,
): MoveBallActionType {
  return {
    type: BallActionTypes.MOVE_BALL_BY_PLAYER,
    payload: {
      newPosition,
      isMirrored,
    },
  };
}

export interface InitBallActionType {
  type: BallActionTypes.INIT_BALL;
  payload: {
    position: PositionType;
  };
}

export function initBall(position: PositionType): InitBallActionType {
  return {
    type: BallActionTypes.INIT_BALL,
    payload: {
      position,
    },
  };
}
