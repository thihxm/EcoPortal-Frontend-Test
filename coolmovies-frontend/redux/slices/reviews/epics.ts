import { gql } from '@apollo/client';
import { Epic, StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { RootState } from '../../store';
import { EpicDependencies } from '../../types';
import { actions, SliceAction } from './slice';

export const movieAsyncEpic: Epic = (
  action$: Observable<SliceAction['fetchReviewsByMovie']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.fetchReviewsByMovie.match),
    switchMap(async () => {
      try {
        const result = await client.query({
          query: movieById(state$.value.reviews.movieId),
        });
        return actions.loadedMovie({ data: result.data });
      } catch (err) {
        return actions.loadMovieError();
      }
    })
  );

export const reviewsAsyncEpic: Epic = (
  action$: Observable<SliceAction['fetchReviewsByMovie']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.fetchReviewsByMovie.match),
    switchMap(async () => {
      try {
        const result = await client.query({
          query: allReviewsByMovie(state$.value.reviews.movieId),
        });
        return actions.loadedReviews({ data: result.data });
      } catch (err) {
        return actions.loadReviewsError();
      }
    })
  );

const movieById = (movieId: string) => {
  return gql`
    query movieById {
      movieById(id: "${movieId}") {
        id
        title
        movieDirectorByMovieDirectorId {
          name
        }
        userByUserCreatorId {
          name
        }
        releaseDate
      }
    }
  `;
}

const allReviewsByMovie = (movieId: string) => {
  return gql`
    query AllReviewsByMovie {
      allMovieReviews(
        filter: {movieId: {equalTo: "${movieId}"}}
      ) {
        nodes {
          id
          title
          body
          rating
          movieByMovieId {
            title
          }
          userByUserReviewerId {
            name
            id
          }
        }
      }
    }
  `;
}
