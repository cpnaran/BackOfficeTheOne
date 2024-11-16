import { LoginState } from "@/redux/types/loginSlice.types";

export const initialState: LoginState = {
  error: null,
  loading: false,
  token:null,
  refresh_token:null
};