import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./login.utils";


const loginSlice = createSlice({
  name:"login",
  initialState,
  reducers:{
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state,action: PayloadAction<string>) => {
      state.loading = false;
      state.token = action.payload
  
    },
   loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload || "An error occurred.";
    },
    refreshStart: (state) =>{
      state.loading =true;
      state.error = null;
    },
    refreshSuccess: (state,action: PayloadAction<string>) => {
      state.loading = false;
      state.refresh_token = action.payload
    },
     refreshFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload || "An error occurred.";
    },
  }
   
});

export const {
 loginStart,
 loginSuccess,
 loginFailure,
 refreshStart,
 refreshSuccess,
 refreshFailure,
} = loginSlice.actions;

export default loginSlice.reducer;