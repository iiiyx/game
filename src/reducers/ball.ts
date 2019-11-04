import { BallActionTypes } from '../actions';
import { StateType } from '../types/state';
import {
  ChangeOwnerActionType,
  KickActionType,
  MoveBallActionType,
} from '../actions/ball';

const initialState = {
  left: 0,
  top: 0,
  isKicked: false,
  isMirrored: false,
  owner: undefined,
};

export function ballReducer(
  state: StateType['ball'] = initialState,
  action: KickActionType | ChangeOwnerActionType | MoveBallActionType,
): StateType['ball'] {
  switch (action.type) {
    case BallActionTypes.KICK:
      return {
        ...state,
        isKicked: true,
      };

    case BallActionTypes.MOVE_BALL:
      return {
        ...state,
      };

    case BallActionTypes.CHANGE_OWNER:
      return {
        ...state,
        owner: action.payload.id,
      };

    default:
      return state;
  }
}
