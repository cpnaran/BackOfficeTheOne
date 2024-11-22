import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./management.utils";



const managementSlice = createSlice({
  name:"management",
  initialState,
  reducers:{
    
  }
   
});

export const {

} = managementSlice.actions;

export default managementSlice.reducer;