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

export const updateReviewAsyncEpic: Epic = (
  action$: Observable<SliceAction['updateReview']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.updateReview.match),
    switchMap(async (action) => {
      try {
        const result = await client.mutate({
          mutation: updateReviewById(action.payload),
        });
        return actions.updatedReview({ data: result.data });
      } catch (err) {
        return actions.updateReviewError();
      }
    })
  );

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

type UpdateReviewDTO = {
  reviewId: string;
  title?: string;
  body?: string;
  rating?: number;
}

const updateReviewById = ({ reviewId, title, body, rating }: UpdateReviewDTO) => {
  return gql`
    mutation {
      updateMovieReviewById(input: {
        id: "${reviewId}",
        movieReviewPatch: {
          ${title && `title: "${title}",`}
          ${body && `body: "${body}",`}
          ${rating && `rating: ${rating},`}
        }
      }) {
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
