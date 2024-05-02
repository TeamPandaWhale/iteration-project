import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  initialGames: [],
  user: '',
  games: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setGames: (state, action) => {
      state.initialGames = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loggedIn, setGames, setUser } = appSlice.actions;

export default appSlice.reducer;
