import { ManagementState } from "@/redux/types/management.types";

export const initialState: ManagementState = {
  error: null,
  loading: false,
  page:1,
  per_page:10,
  carList:[]
};