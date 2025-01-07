import { PromotionState } from "@/redux/types/proMotionSlice.types";

export const initialState: PromotionState = {
  error: null,
  loading: false,
  packageTable: [],
};

export interface CreatePromotionRequest {
  package: string;
  days: string;
  amount: string;
  startAt: string;
  expiredAt: string;
  packageType: string;
   isActive:boolean
}
export interface DeletePromotionRequest {
  id: string;
}

export enum PACKAGE_TYPE {
  STANDARD = "STANDARD",
  PROMOTION = "PROMOTION",
  PREMIUM  ="PREMIUM"
}



export interface EditCreatePromotionRequest {
   id:string;
  package: string;
  days: string;
  amount: string;
  startAt: string;
  expiredAt: string;
  packageType: string;
   isActive:boolean
}


export interface UpdatePromotionRequest {
   id:string;
   isActive:boolean
}