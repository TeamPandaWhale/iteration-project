import { configureStore } from '@reduxjs/toolkit';
import appReducer from './reducers/appSlice.js';
import loginReducer from './reducers/loginSlice.js';
import signupReducer from './reducers/signupSlice.js';


const store = configureStore({
  reducer: {
    app: appReducer,
    login: loginReducer,
    signup: signupReducer
  },
});

export default store;



// import React, { useRef } from 'react';
// import { fetchReceiptData } from '../reducers/receiptSlicer';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// const pictureBody = () => {
//   const dispatch = useDispatch();
//   const Navigate = useNavigate();
//   const fileInput = useRef(null);
  
//   const handleUpload = async () => {
//     const file = fileInput.current.files[0];
//     if (!file) {
//       console.log('No file selected');
//       return;
//     }
//     const formData = new FormData();
//     formData.append('image', file);
//     dispatch(fetchReceiptData(formData));
//     Navigate('/receipt');
//   };
// //--------------------------------------------------------------------------------------------------

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//   receiptData: [],
//   loading: 'idle',
//   tax: 0,
//   tip: 0,
//   total: 0
// };

// export const fetchReceiptData = createAsyncThunk('/upload', async (formData, thunkAPI) => {
//   const response = await axios.post('http://localhost:3000/upload', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
//   return response.data;
// });

// export const receiptTableSlice = createSlice({
//   name: 'receipts',
//   initialState,
//   reducers: {}, // do i need this? will changing paths in tabBarSlicer make it harder to navigate to the receipt page? should I be navigating to a page that is on the tab bar from the upload button?
//   extraReducers: (builder) => {
//     builder.addCase(fetchReceiptData.fulfilled, (state, action) => {
//       state.receiptData = action.payload;
//       const tip = .2;
//       const tax = .08875;
//       let sum = 0;
//       for(let i = 0; i < state.receiptData.length; i++){
//         sum += Number.parseFloat(state.receiptData[i].itemCost) * Number(state.receiptData[i].itemQuantity);
//       }
//       console.log(state);
//       state.tax =  Number(sum * tax).toFixed(2);
//       state.tip = Number(sum * tip).toFixed(2);
//       state.total = Number(sum + Number(state.tax) + Number(state.tip)).toFixed(2);
//       state.loading = 'idle';
//     });
//   },
// });

// // export const { findTotal } = receiptTableSlice.actions;

// export const { actions } = receiptTableSlice;

// export default receiptTableSlice.reducer;
