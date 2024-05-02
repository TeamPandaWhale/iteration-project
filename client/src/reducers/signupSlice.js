import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  password: '',
  error: ''
};

export const signupSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  }
});

export const { setUsername, setPassword, setError } = signupSlice.actions;

export default signupSlice.reducer;