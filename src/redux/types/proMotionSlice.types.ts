export interface PromotionState {
    error: string | null;
    loading: boolean;
    packageTable: PackageTable[] 
  }
  

  export interface PackageTable {
    id:string;
    package:string;
    amount:number;
    days:number;
    isActive:boolean;
    startAt:string;
    expiredAt:string;
    createdAt:string;
    updatedAt:string;
    packageType:string;
  }


