import { FormikErrors, FormikProps } from "formik";

export interface ManagementFormKeysProps {
    licensePlate:string
    page: number;
  perPage: number;
  }

  
  export interface ManagementFormProps extends FormikProps<ManagementFormKeysProps> {
  }
  
  export interface UseManagementFormProps{
    values: ManagementFormKeysProps;
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => Promise<void | FormikErrors<ManagementFormKeysProps>>;
  }
  