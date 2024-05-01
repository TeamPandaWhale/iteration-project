import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  initialGames: [],
  user: ''
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

export const { changePage, isLoading } = appSlice.actions;

export default appSlice.reducer;