import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MovieData = {
  movieById: {
    id: string;
    title: string;
    movieDirectorByMovieDirectorId: {
      name: string;
    };
    userByUserCreatorId: {
      name: string;
    };
    releaseDate: string;
  };
}

type Review = {
  id: string;
  title: string;
  body: string;
  rating: number;
  movieByMovieId: {
    title: string;
  };
  userByUserReviewerId: {
    id: string;
    name: string;
  };
}

type ReviewsData = {
  allMovieReviews: {
    nodes: Review[];
  };
}

interface ReviewsState {
  movieId: string;
  fetchMovieData?: MovieData | string[];
  fetchReviewsData?: ReviewsData | string[];
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
    loadedMovie: (state, action: PayloadAction<{ data: MovieData }>) => {
      state.fetchMovieData = action.payload.data;
    },
    loadMovieError: (state) => {
      state.fetchMovieData = ['Error Fetching Movie :('];
    },
    loadedReviews: (state, action: PayloadAction<{ data: ReviewsData }>) => {
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
