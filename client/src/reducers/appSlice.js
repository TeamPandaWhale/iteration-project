import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  initialGames: [],
  user: '',
  games: [],
  currentGames: [],
  currentPage: 0,
  activePFilter: [],
  activeGFilter: [],
  platforms: [],
  genre: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setInitialGames: (state, action) => {
      state.initialGames = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setGames: (state, action) => {
      state.games = action.payload;
    },
    setCurrentGames: (state, action) => {
      state.currentGames = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setActivePFilter: (state, action) => {
      state.activePFilter = action.payload;
    },
    setActiveGFilter: (state, action) => {
      state.activeGFilter = action.payload;
    },
    setPlatforms: (state, action) => {
      state.platforms = action.payload;
    },
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
  },
});

export const {
  setIsAuthenticated,
  setInitialGames,
  setUser,
  setGames,
  setCurrentGames,
  setCurrentPage,
  setActivePFilter,
  setActiveGFilter,
  setPlatforms,
  setGenre,
} = appSlice.actions;

export default appSlice.reducer;
