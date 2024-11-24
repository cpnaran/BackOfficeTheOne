import * as Yup from "yup";

  export const validationSchema = Yup.object().shape({
   package: Yup.string().required("กรุณาเลือกแพ็คเกจ"),
   
  });
  