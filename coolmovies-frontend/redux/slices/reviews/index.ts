export { actions as reviewsActions } from './slice';
export { default as reviewsReducer } from './slice';
import { combineEpics } from 'redux-observable';
import { reviewsAsyncEpic, movieAsyncEpic, createReviewAsyncEpic } from './epics';

export const reviewsEpics = combineEpics(reviewsAsyncEpic, movieAsyncEpic, createReviewAsyncEpic);
