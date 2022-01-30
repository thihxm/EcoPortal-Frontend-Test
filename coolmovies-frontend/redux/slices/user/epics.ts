import { gql } from '@apollo/client';
import { Epic, StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { RootState } from '../../store';
import { EpicDependencies } from '../../types';
import { actions, SliceAction } from './slice';

export const userAsyncEpic: Epic = (
  action$: Observable<SliceAction['fetchCurrentUser']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.fetchCurrentUser.match),
    switchMap(async () => {
      try {
        const result = await client.query({
          query: currentUser(),
        });
        return actions.loadedUser({ data: result.data });
      } catch (err) {
        return actions.loadUserError();
      }
    })
  );

export const createReviewAsyncEpic: Epic = (
  action$: Observable<SliceAction['createReview']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.createReview.match),
    switchMap(async (action) => {
      try {
        const result = await client.mutate({
          mutation: createReview(action.payload),
        });
        return actions.createdReview({ data: result.data });
      } catch (err) {
        return actions.createReviewError();
      }
    })
  );

const currentUser = () => {
  return gql`
    query {
      currentUser {
        id
        name
      }
    }
  `;
}

type createReviewDTO = {
  title: string;
  body: string;
  rating: number;
  movieId: string;
  userReviewerId: string;
}

const createReview = ({
  title,
  body,
  rating,
  movieId,
  userReviewerId,
}: createReviewDTO) => {
  return gql`
    mutation {
      createMovieReview(input: {
        movieReview: {
          title: "${title}",
          body: "${body}",
          rating: ${rating},
          movieId: "${movieId}",
          userReviewerId: "${userReviewerId}"
        }})
      {
        movieReview {
          id
          title
          body
          rating
          movieByMovieId {
            title
          }
          userByUserReviewerId {
            name
          }
        }
      }
    }
  `;
}
