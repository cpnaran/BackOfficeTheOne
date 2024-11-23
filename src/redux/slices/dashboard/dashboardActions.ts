import { AppThunk } from "@/redux/store";
import { GraphRequest, IncomeRequest } from "@/redux/types/dashboardSlice.types";
import { graphCarFailure, graphCarStart, graphCarSuccess, graphFailure, graphPeaktimeFailure, graphPeaktimeStart, graphPeaktimeSuccess, graphStart, graphSuccess, incomeFailure, incomeStart, incomeSuccess, totalCarFailure, totalCarStart, totalCarSuccess } from "./dashboardSlice";
import api from "@/api";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;



export  const getGraph = (request: GraphRequest, callback: (check:boolean) => void): AppThunk   =>
  async (dispatch) => {
    dispatch( graphStart());
    try {
    const response =  await api.get(
          `${apiBaseUrl}/back-office/Revenue/graph?year=${request.year}`,
          
        ); 
       console.log(response.data,"response.data")
        dispatch(graphSuccess(response.data));
        callback(true);
      
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      console.error(error);
      dispatch(graphFailure(errorMessage));
         callback(false);
    }
  };


export  const getTotalCar = (request: IncomeRequest, callback: (check:boolean) => void): AppThunk   =>
  async (dispatch) => {
    dispatch(totalCarStart());
    try {
    const response =  await api.get(
          `${apiBaseUrl}/back-office/Total-car?month=${request.month}`,
          
        ); 
        console.log(response.data,"car")
        dispatch(totalCarSuccess(response.data));
        callback(true);
      
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      console.error(error);
      dispatch(totalCarFailure(errorMessage));
         callback(false);
    }
  };



  export  const getIncome = (request: IncomeRequest, callback: (check:boolean) => void): AppThunk   =>
  async (dispatch) => {
    dispatch(incomeStart());
    try {
    const response =  await api.get(
          `${apiBaseUrl}/back-office/Revenue?month=${request.month}`,
          
        ); 
        dispatch(incomeSuccess(response.data));
        callback(true);
      
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      console.error(error);
      dispatch(incomeFailure(errorMessage));
         callback(false);
    }
  };



  export  const getCarGraph = (request: GraphRequest, callback: (check:boolean) => void): AppThunk   =>
  async (dispatch) => {
    dispatch( graphCarStart());
    try {
    const response =  await api.get(
          `${apiBaseUrl}/back-office/Total-car/graph?year=${request.year}`,
          
        ); 

        dispatch(graphCarSuccess(response.data));
        callback(true);
      
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      console.error(error);
      dispatch(graphCarFailure(errorMessage));
         callback(false);
    }
  };

   export  const getTimeGraph = ( callback: (check:boolean) => void): AppThunk   =>
  async (dispatch) => {
    dispatch(graphPeaktimeStart());
    try {
    const response =  await api.get(
          `${apiBaseUrl}/back-office/Usage-Time`,
          
        ); 

        dispatch(graphPeaktimeSuccess(response.data));
        callback(true);
      
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      console.error(error);
      dispatch(graphPeaktimeFailure(errorMessage));
         callback(false);
    }
  };


