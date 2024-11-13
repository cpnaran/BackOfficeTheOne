import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./packagesSummary.utils";
import { PackagesSummaryGraph } from "@/redux/types/packagesSummary.types";

const packagesSummarySlice = createSlice({
  name: "packagesSummary",
  initialState,
  reducers: {
    packagesSummaryStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    packagesSummarySuccess: (state,action: PayloadAction<PackagesSummaryGraph[]>) => {
      state.loading = false;
      state.packageSummary = action.payload
    },
    packagesSummaryFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload || "An error occurred.";
    },
  },
});
export const {
  packagesSummaryStart,
  packagesSummarySuccess,
  packagesSummaryFailure,
} = packagesSummarySlice.actions;
export default packagesSummarySlice.reducer;
