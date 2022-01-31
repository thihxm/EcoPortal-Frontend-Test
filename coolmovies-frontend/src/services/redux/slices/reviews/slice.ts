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

type MovieReview = {
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

type NewReviewData = {
  createMovieReview: MovieReview
}

type UpdateReviewDTO = {
  reviewId: string;
  title?: string;
  body?: string;
  rating?: number;
}

type UpdatedReviewData = {
  updateMovieReviewById: MovieReview
}

interface ReviewsState {
  movieId: string;
  fetchMovieData?: MovieData | string[];
  fetchReviewsData?: ReviewsData | string[];
  newReviewData?: NewReviewData | string[];
  updatedReviewData?: UpdatedReviewData | string[];
  loadingMovieData: boolean;
  loadingMutation: boolean;
}

const initialState: ReviewsState = {
  movieId: '',
  fetchMovieData: undefined,
  fetchReviewsData: undefined,
  newReviewData: undefined,
  updatedReviewData: undefined,
  loadingMovieData: false,
  loadingMutation: false,
};

export const slice = createSlice({
  initialState,
  name: 'reviews',
  reducers: {
    fetchMovieById: (state, action: PayloadAction<string>) => {
      state.movieId = action.payload;
      state.loadingMovieData = true;
    },
    fetchReviewsByMovie: (state, action: PayloadAction<string>) => {
      state.movieId = action.payload;
      state.loadingMovieData = true;
    },
    clearReviewsData: (state) => {
      state.movieId = '';
      state.fetchReviewsData = undefined;
      state.loadingMovieData = false;
    },
    clearMovieData: (state) => {
      state.movieId = '';
      state.fetchMovieData = undefined;
      state.loadingMovieData = false;
    },
    loadedMovie: (state, action: PayloadAction<{ data: MovieData }>) => {
      state.fetchMovieData = action.payload.data;
      state.loadingMovieData = false;
    },
    loadMovieError: (state) => {
      state.fetchMovieData = ['Error Fetching Movie :('];
      state.loadingMovieData = false;
    },
    loadedReviews: (state, action: PayloadAction<{ data: ReviewsData }>) => {
      state.fetchReviewsData = action.payload.data;
      state.loadingMovieData = false;
      state.newReviewData = undefined;
      state.updatedReviewData = undefined;
    },
    loadReviewsError: (state) => {
      state.fetchReviewsData = ['Error Fetching Reviews :('];
      state.loadingMovieData = false;
    },

    createReview: (state, action: PayloadAction<CreateReviewDTO>) => {
      state.loadingMutation = true;
    },
    createdReview: (state, action: PayloadAction<{ data: NewReviewData }>) => {
      state.newReviewData = action.payload.data;
      state.loadingMutation = false;
    },
    createReviewError: (state) => {
      state.newReviewData = ['Error Creating Review :('];
      state.loadingMutation = false;
    },
    clearCreateReview: (state) => {
      state.newReviewData = undefined;
      state.loadingMutation = false;
    },

    updateReview: (state, action: PayloadAction<UpdateReviewDTO>) => {
      state.loadingMutation = true;
    },
    updatedReview: (state, action: PayloadAction<{ data: UpdatedReviewData }>) => {
      state.updatedReviewData = action.payload.data;
      state.loadingMutation = false;
    },
    updateReviewError: (state) => {
      state.updatedReviewData = ['Error Updating Review :('];
      state.loadingMutation = false;
    },
    clearUpdateReview: (state) => {
      state.updatedReviewData = undefined;
      state.loadingMutation = false;
    },
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export default slice.reducer;
