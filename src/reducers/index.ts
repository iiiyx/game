import { combineReducers } from 'redux';
import { playersReducer } from './players';
import { ballReducer } from './ball';

export const rootReducer = combineReducers({
  players: playersReducer,
  ball: ballReducer,
});
