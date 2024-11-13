
import { PackagesSummaryState } from "@/redux/types/packagesSummary.types";

export const initialState:PackagesSummaryState = {
  error: null,
  loading: false,
  packageSummary:[]
};