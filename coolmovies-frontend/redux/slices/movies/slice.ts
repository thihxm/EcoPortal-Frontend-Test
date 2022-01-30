import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MovieData = {
  id: string;
  title: string;
  movieDirectorByMovieDirectorId: {
    name: string;
  };
  userByUserCreatorId: {
    name: string;
  },
  releaseDate: string;
}

type MoviesData = {
  allMovies: {
    nodes: MovieData[];
  };
}

interface MoviesState {
  fetchData?: MoviesData | string[];
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
    loaded: (state, action: PayloadAction<{ data: MoviesData }>) => {
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
