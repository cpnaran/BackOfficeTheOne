import { isAction } from "@reduxjs/toolkit";
import { PACKAGE_TYPE } from "../slices/promotion/proMotion.utils";

export interface ManagementState {
  error: string | null;
  loading: boolean;
  page: number;
  per_page: number;
  carList: CarList[];
  option:OptionPromotion[]
  totalCount: number,
  totalPage: number
}

export interface PromoteRequest {
  id: string;
  package_id: string;
}

export interface DemoteRequest {
  id: string;
}

export interface AddDayRequest {
  id: string;
  day:number;
}

export interface CarListRespone {
 data: CarList[];
   totalCount: number,
  totalPage: number
}


export interface CarListRequest {
  license:string
  page:number,
  per_page:number
}

export interface CarList {
  id: string;
  userId: string;
  fullName:string;
  license: string;
  status: boolean;
  startAt: string;
  isActive:boolean,
  expiredAt: string;
  createdAt: string;
  updateAt: string;
  jsonData: SpecialPackage[];
}

export interface SpecialPackage {
  id: string;
  days: number;
  amount: number;
  package: string;
  startAt: string;
  isActive: boolean;
  expiredAt: string;
  packageType: string;
}






export interface OptionPromotion {
  id:string,
  package:string,
  amount:number,
  days:number,
  isActive:boolean,
  startAt:string,
  expiredAt:string,
  createdAt:string,
  updatedAt:String,
  packageType:PACKAGE_TYPE
}

export interface ManagementTableColumns {
  index?: number;
  id: string;
  fullName:string;
  userId:string;
  license:string;
  status:boolean;
  isActive: boolean;
  createdAt: string;
  expiredAt: string;
  jsonData?: SpecialPackage[];
  outOfDate:boolean;
  action?: string;
}