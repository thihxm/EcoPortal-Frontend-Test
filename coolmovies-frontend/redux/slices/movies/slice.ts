import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MoviesState {
  fetchData?: unknown[];
}

const initialState: MoviesState = {
  fetchData: undefined
};

export const slice = createSlice({
  initialState,
  name: 'movies',
  reducers: {
    fetch: () => {},
    clearData: (state) => {
      state.fetchData = undefined;
    },
    loaded: (state, action: PayloadAction<{ data: unknown[] }>) => {
      state.fetchData = action.payload.data;
    },
    loadError: (state) => {
      state.fetchData = ['Error Fetching :('];
    },
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export default slice.reducer;
