import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  initialGames: [],
  user: '',
  // Not sure if they ever use the mockGames they hard-coded in Main.jsx
  // We might need to fetch games and update games array here
  games: []
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
  }
});

export const { loggedIn, setGames, setUser } = appSlice.actions;

export default appSlice.reducer;