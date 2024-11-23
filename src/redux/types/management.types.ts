export interface ManagementState {
  error: string | null;
  loading: boolean;
  page: number;
  per_page: number;
  carList: CarList[];
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
}

export interface CarListRespone {
  carList: CarList[];
}


export interface CarListRequest {
  license:string
  page:number,
  per_page:number
}

export interface CarList {
  id: string;
  userId: string;
  license: string;
  status: boolean;
  expiredAt: string;
  createdAt: string;
  updateAt: string;
  JsonData: SpecialPackage[];
}

export interface SpecialPackage {
  id: string;
  days: number;
  amount: number;
  package: string;
  startAt: string;
  isActive: number;
  expiredAt: string;
  packageType: string;
}
