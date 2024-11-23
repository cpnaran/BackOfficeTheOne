import api from "@/api";
import { AppThunk } from "@/redux/store";
import {
  packagesSummaryFailure,
  packagesSummaryStart,
  packagesSummarySuccess,
} from "./packageSummarySlice";
import { GraphRequest } from "@/redux/types/dashboardSlice.types";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getPackagesSummary =
  (
    request: GraphRequest,
    callback: (check: boolean) => void
  ): AppThunk =>
  async (dispatch) => {
    dispatch(packagesSummaryStart());
    try {
      const response = await api.get(
        `${apiBaseUrl}/back-office/Package-summary?year=${request.year}`,
        {}
      );
     console.log(response.data,"response.data")
      dispatch(packagesSummarySuccess(response.data));
      callback(true);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      console.error(error);
      dispatch(packagesSummaryFailure(errorMessage));
      callback(false);
    }
  };
