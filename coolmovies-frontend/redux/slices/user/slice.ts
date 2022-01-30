import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserData = {
  currentUser: {
    id: string;
    name: string;
  };
}

interface UserState {
  movieId: string;
  fetchUserData?: UserData | string[];
}

const initialState: UserState = {
  movieId: '',
  fetchUserData: undefined,
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
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export default slice.reducer;
