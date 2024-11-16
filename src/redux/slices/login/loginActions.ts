import api from "@/api";
import { AppThunk } from "@/redux/store";
import { getTableProMotionStart, getTableProMotionSuccess, getTableProMotionFailure } from "../promotion/proMotionSlice";
import { loginFailure, loginStart, loginSuccess, refreshStart, refreshSuccess } from "./loginSlice";
import session from "@/utils/session";
import { LoginRequest } from "@/redux/types/loginSlice.types";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const login=
  (request:LoginRequest,callback: (check: boolean) => void): AppThunk =>
  async (dispatch) => {
    dispatch(loginStart());
    try {
      const response = await api.post(`${apiBaseUrl}/Login`, {
            username: request.username,
            password: request.password,
          },
         );
          const { token, refreshToken } = response.data;
          session.saveKeyStorage("user", JSON.stringify(response.data));
          session.saveAccessToken(token);
          session.saveKeyStorage("refresh_token", refreshToken);
      dispatch(loginSuccess(response.data));
      callback(true);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      console.error(error);
      dispatch(loginFailure(errorMessage));
      callback(false);
    }
  };

let refreshPromise: Promise<string> | null = null;
let isRefreshing = false;

export const refreshAccessToken = () => {
  if (!isRefreshing) {
    refreshPromise = new Promise((resolve, reject) => {
      api.post(`${apiBaseUrl}/Login/refresh`,
      )
        .then((response) => {
        const {token} = response.data
          session.saveAccessToken(token);
          session.saveKeyStorage("user", JSON.stringify(response.data));
          resolve(token);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          isRefreshing = false;
        });
    });
  }
  
  return refreshPromise;
};

