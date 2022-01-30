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

type CreateReviewDTO = {
  title: string;
  body: string;
  rating: number;
  movieId: string;
  userReviewerId: string;
}

type NewReviewData = {
  createMovieReview: {
    movieReview: {
      id: string;
      title: string;
      body: string;
      rating: number;
      movieByMovieId: {
        title: string;
      };
      userByUserReviewerId: {
        name: string;
      };
    }
  }
}

interface ReviewsState {
  movieId: string;
  fetchMovieData?: MovieData | string[];
  fetchReviewsData?: ReviewsData | string[];
  newReviewData?: NewReviewData | string[];
  loading: boolean;
}

const initialState: ReviewsState = {
  movieId: '',
  fetchMovieData: undefined,
  fetchReviewsData: undefined,
  newReviewData: undefined,
  loading: false,
};

export const slice = createSlice({
  initialState,
  name: 'reviews',
  reducers: {
    fetchMovieById: (state, action: PayloadAction<string>) => {
      state.movieId = action.payload;
      state.loading = true;
    },
    fetchReviewsByMovie: (state, action: PayloadAction<string>) => {
      state.movieId = action.payload;
      state.loading = true;
    },
    clearReviewsData: (state) => {
      state.movieId = '';
      state.fetchReviewsData = undefined;
      state.loading = false;
    },
    clearMovieData: (state) => {
      state.movieId = '';
      state.fetchMovieData = undefined;
      state.loading = false;
    },
    loadedMovie: (state, action: PayloadAction<{ data: MovieData }>) => {
      state.fetchMovieData = action.payload.data;
      state.loading = false;
    },
    loadMovieError: (state) => {
      state.fetchMovieData = ['Error Fetching Movie :('];
      state.loading = false;
    },
    loadedReviews: (state, action: PayloadAction<{ data: ReviewsData }>) => {
      state.fetchReviewsData = action.payload.data;
      state.loading = false;
    },
    loadReviewsError: (state) => {
      state.fetchReviewsData = ['Error Fetching Reviews :('];
      state.loading = false;
    },

    createReview: (state, action: PayloadAction<CreateReviewDTO>) => {
      state.loading = true;
    },
    createdReview: (state, action: PayloadAction<{ data: NewReviewData }>) => {
      state.newReviewData = action.payload.data;
      state.loading = false;
    },
    createReviewError: (state) => {
      state.newReviewData = ['Error Creating Review :('];
      state.loading = false;
    },
    clearCreateReview: (state) => {
      state.newReviewData = undefined;
      state.loading = false;
    },
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export default slice.reducer;
