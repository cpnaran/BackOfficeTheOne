import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorState, initialState } from "./errorSlice.utils";

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<ErrorState>) => {
      state.code = action.payload.code;
      state.message = action.payload.message;
      state.url = action.payload.url;
    },
    clearError: (state) => {
      state.code = null;
      state.message = null;
      state.url = null;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;
