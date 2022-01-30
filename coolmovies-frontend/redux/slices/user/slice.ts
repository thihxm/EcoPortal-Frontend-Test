import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserData = {
  currentUser: {
    id: string;
    name: string;
  };
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

type createReviewDTO = {
  title: string;
  body: string;
  rating: number;
  movieId: string;
  userReviewerId: string;
}

interface UserState {
  movieId: string;
  fetchUserData?: UserData | string[];
  newReviewData?: NewReviewData | string[];
}

const initialState: UserState = {
  movieId: '',
  fetchUserData: undefined,
  newReviewData: undefined,
};

export const slice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    fetchCurrentUser: () => {},
    clearUserData: (state) => {
      state.fetchUserData = undefined;
    },
    loadedUser: (state, action: PayloadAction<{ data: UserData }>) => {
      state.fetchUserData = action.payload.data;
    },
    loadUserError: (state) => {
      state.fetchUserData = ['Error Fetching User :('];
    },

    createReview: (state, action: PayloadAction<createReviewDTO>) => {},
    createdReview: (state, action: PayloadAction<{ data: NewReviewData }>) => {
      state.newReviewData = action.payload.data;
    },
    createReviewError: (state) => {
      state.newReviewData = ['Error Creating Review :('];
    },
    clearCreateReview: (state) => {
      state.newReviewData = undefined;
    },
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export default slice.reducer;
