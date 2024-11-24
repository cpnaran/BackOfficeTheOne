
import {
  Action,
  ThunkAction,
  configureStore,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import layoutReducer from "./slices/layout/layoutSlice";
import  promotionReducer from "./slices/promotion/proMotionSlice";
import  dashboardReducer from "./slices/dashboard/dashboardSlice";
import loginReducer from "./slices/login/loginSlice"
import managementReducer from "./slices/management/managementSlice"
import  packagesSummaryReducer from "./slices/packagesummary/packageSummarySlice"
const store = configureStore({
  reducer: {
       layout: layoutReducer,
       promotion:promotionReducer,
       dashboard:dashboardReducer,
       login:loginReducer,
       management:managementReducer,
       packageSummary:packagesSummaryReducer

  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
