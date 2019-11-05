import { StateType } from '../models/state';
import {
  BallActionTypes,
  ChangeOwnerActionType,
  InitBallActionType,
  KickActionType,
  MoveBallActionType,
} from '../actions/ball';

const initialState = {
  left: 0,
  top: 0,
  isKicked: false,
  isMirrored: false,
  isMoving: false,
  owner: undefined,
};

function moveBallByPlayer(
  state: StateType['ball'],
  action: MoveBallActionType,
): StateType['ball'] {
  return {
    ...state,
    ...action.payload.newPosition,
    isMirrored: action.payload.isMirrored,
  };
}

export function ballReducer(
  state: StateType['ball'] = initialState,
  action:
    | KickActionType
    | ChangeOwnerActionType
    | MoveBallActionType
    | InitBallActionType,
): StateType['ball'] {
  switch (action.type) {
    case BallActionTypes.KICK:
      return {
        ...state,
        isKicked: true,
        owner: undefined,
      };

    case BallActionTypes.MOVE_BALL_BY_PLAYER:
      return moveBallByPlayer(state, action);

    case BallActionTypes.CHANGE_OWNER:
      return {
        ...state,
        owner: action.payload.id,
        isKicked: false,
        isMirrored: false,
      };

    case BallActionTypes.INIT_BALL:
      return {
        ...state,
        ...action.payload.position,
      };

    default:
      return state;
  }
}
