import api from "@/api";
import { AppThunk } from "@/redux/store";
import {
  AddDayRequest,
  CarListRequest,
  DemoteRequest,
  PromoteRequest,
} from "@/redux/types/management.types";
import {
    addDayFailure,
    addDayStart,
  addDaySuccess,
  demoteFailure,
  demoteStart,
  demoteSuccess,
  getCarListFailure,
  getCarListStart,
  getCarListSuccess,
  promoteFailure,
  promoteStart,
  promoteSuccess,
} from "./managementSlice";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const updatePromote =
  (request: PromoteRequest, callback: (check: boolean) => void): AppThunk =>
  async (dispatch) => {
    dispatch(promoteStart());
    try {
      await api.put(`${apiBaseUrl}/back-office/Car/Promote`, request);
      dispatch(promoteSuccess());
      callback(true);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      console.error(error);
      dispatch(promoteFailure(errorMessage));
      callback(false);
    }
  };

export const demote =
  (request: DemoteRequest, callback: (check: boolean) => void): AppThunk =>
  async (dispatch) => {
    dispatch(demoteStart());
    try {
      await api.put(`${apiBaseUrl}/back-office/Car/Demote`, request);
      dispatch(demoteSuccess());
      callback(true);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      console.error(error);
      dispatch(demoteFailure(errorMessage));
      callback(false);
    }
  };

export const addDay =
  (request: AddDayRequest, callback: (check: boolean) => void): AppThunk =>
  async (dispatch) => {
    dispatch(addDayStart());
    try {
      await api.put(`${apiBaseUrl}/back-office/Car/Add-days`, request);
      dispatch(addDaySuccess());
      callback(true);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      console.error(error);
      dispatch(addDayFailure(errorMessage));
      callback(false);
    }
  };


  export const  getCarList = (request: CarListRequest, callback: (check: boolean) => void): AppThunk =>
    async (dispatch) => {
      dispatch(getCarListStart());
      try {
        const response = await api.put(`${apiBaseUrl}/back-office/Car/list`, request);
        dispatch(getCarListSuccess(response.data));
        callback(true);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "An error occurred.";
        console.error(error);
        dispatch(getCarListFailure(errorMessage));
        callback(false);
      }
    };
  
