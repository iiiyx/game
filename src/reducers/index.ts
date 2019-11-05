import { combineReducers } from 'redux';
import { playersReducer } from './players-reducers';
import { ballReducer } from './ball-reducers';

export const rootReducer = combineReducers({
  players: playersReducer,
  ball: ballReducer,
});
