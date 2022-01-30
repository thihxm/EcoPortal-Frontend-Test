import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReviewsState {
  movieId: string;
  fetchMovieData?: unknown[];
  fetchReviewsData?: unknown[];
}

const initialState: ReviewsState = {
  movieId: '',
  fetchMovieData: undefined,
  fetchReviewsData: undefined,
};

export const slice = createSlice({
  initialState,
  name: 'reviews',
  reducers: {
    fetchMovieById: (state, action: PayloadAction<string>) => {
      state.movieId = action.payload; 
    },
    fetchReviewsByMovie: (state, action: PayloadAction<string>) => {
      state.movieId = action.payload;
    },
    clearReviewsData: (state) => {
      state.movieId = '';
      state.fetchReviewsData = undefined;
    },
    clearMovieData: (state) => {
      state.movieId = '';
      state.fetchMovieData = undefined;
    },
    loadedMovie: (state, action: PayloadAction<{ data: unknown[] }>) => {
      state.fetchMovieData = action.payload.data;
    },
    loadMovieError: (state) => {
      state.fetchMovieData = ['Error Fetching Movie :('];
    },
    loadedReviews: (state, action: PayloadAction<{ data: unknown[] }>) => {
      state.fetchReviewsData = action.payload.data;
    },
    loadReviewsError: (state) => {
      state.fetchReviewsData = ['Error Fetching Reviews :('];
    },
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export default slice.reducer;
