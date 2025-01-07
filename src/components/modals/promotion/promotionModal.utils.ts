import { PACKAGE_TYPE } from "@/redux/slices/promotion/proMotion.utils";
import { CreatePromotionFormKeysProps, CreatePromotionFormProps } from "../from/createPromotion.from.types";

export enum PROMOTION_MODAL_STATE {
   EDIT ="EDIT",
   CREATE="CREATE",
   DELETE ="DELETE",
   UPDATE ="UPDATE"

  }
  





export const initialValues: CreatePromotionFormKeysProps = {
   name: "",
   days: "",
   amount: "",
   startAt: "",
   expiredAt: "",
   package: PACKAGE_TYPE.STANDARD
};
