export { actions as userActions } from './slice';
export { default as userReducer } from './slice';
import { combineEpics } from 'redux-observable';
import { userAsyncEpic } from './epics';

export const userEpics = combineEpics(userAsyncEpic);
