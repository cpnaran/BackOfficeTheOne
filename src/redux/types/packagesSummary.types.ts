export interface PackagesSummaryState {
  error: string | null;
  loading: boolean;
  packageSummary:PackagesSummaryGraph[]

}


export interface PackagesSummaryGraph {
    packageId:string,
    count:number,
   packageName :string
}


export interface PackagesSummaryGraphRequest {
    year:string;
}
