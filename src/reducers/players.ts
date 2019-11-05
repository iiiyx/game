import {
  MovePlayerActionType,
  PlayerActionTypes,
  StopPlayerActionType,
} from '../actions/players';
import { StateType } from '../models/state';

const initialState = {
  kunio: {
    id: 'kunio',
    left: 0,
    top: 0,
    isMoving: false,
    isMirrored: false,
  },
};

function movePlayer(
  state: StateType['players'],
  action: MovePlayerActionType,
): StateType['players'] {
  const player = state[action.payload.id];
  if (!player) {
    return state;
  }

  const left = player.left + action.payload.dt.left;
  const top = player.top + action.payload.dt.top;

  return {
    ...state,
    [action.payload.id]: {
      ...player,
      left,
      top,
      isMirrored: action.payload.isMirrored,
      isMoving: true,
    },
  };
}

function stopPlayer(
  state: StateType['players'],
  action: StopPlayerActionType,
): StateType['players'] {
  const player = state[action.payload.id];
  if (!player) {
    return state;
  }

  return {
    ...state,
    [action.payload.id]: {
      ...player,
      isMoving: false,
    },
  };
}

export function playersReducer(
  state: StateType['players'] = initialState,
  action: MovePlayerActionType | StopPlayerActionType,
): StateType['players'] {
  switch (action.type) {
    case PlayerActionTypes.STOP_PLAYER:
      return stopPlayer(state, action);

    case PlayerActionTypes.MOVE_PLAYER:
      return movePlayer(state, action);

    default:
      return state;
  }
}
