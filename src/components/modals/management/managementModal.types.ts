import { ReactNode } from "react";

export interface  ManagementModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  onSubmit: (package_id:string,id:string) => void;
  management:ManagementType
  option:OptionType[]
}



export interface ManagementType {
    name:string;
     license:string;
     id:string;
   
}


export interface ManagementFormKeysProps {
   name:string;
   license:string;
package:string;
  }
  


  export interface OptionType {
  value: string;
  label:string;

}