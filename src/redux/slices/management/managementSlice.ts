import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./management.utils";
import {  CarListRespone, OptionPromotion } from "@/redux/types/management.types";
import { getOptionPremium } from "./managementActions";

const managementSlice = createSlice({
  name:"management",
  initialState,
  reducers:{
    promoteStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    promoteSuccess: (state) => {
      state.loading = false
    },
    promoteFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload || "An error occurred.";
    },
    demoteStart:(state) =>{
      state.loading =true;
      state.error =null;
    },
    demoteSuccess: (state) => {
      state.loading = false
    },
    demoteFailure:(state,action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload || "An error occurred.";
    },
    addDayStart:(state)=>{
      state.loading = true;
      state.error = null;
    },
    addDaySuccess: (state) => {
      state.loading = false
    },
    addDayFailure:(state,action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload || "An error occurred.";
    },
    getCarListStart:(state) => {
      state.loading =true;
      state.error =null
    },
    getCarListSuccess: (state,action: PayloadAction<CarListRespone>) =>{
      state.loading = false;
      state.carList =action.payload.data
      state.totalCount = action.payload.totalCount
      state.totalPage =action.payload.totalPage

    },
    getCarListFailure:(state,action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload || "An error occurred.";
    },
      getOptionPremiumStart:(state)=>{
      state.loading = true;
      state.error = null;
    },
    getOptionPremiumSuccess: (state,action: PayloadAction<OptionPromotion[]>) => {
      state.loading = false;
      state.option = action.payload
    },
    getOptionPremiumFailure:(state,action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload || "An error occurred.";
    },
  }
   
});

export const {
  promoteStart,
  promoteSuccess,
  promoteFailure,
  demoteStart,
  demoteSuccess,
  demoteFailure,
  addDayStart,
  addDaySuccess,
  addDayFailure,
  getCarListStart,
  getCarListSuccess,
  getCarListFailure,
  getOptionPremiumStart,
  getOptionPremiumSuccess,
  getOptionPremiumFailure

} = managementSlice.actions;

export default managementSlice.reducer;