import { PromotionTableColumns } from "@/components/promotion/promotion.types";
import { CreatePromotionFormKeysProps } from "../from/createPromotion.from.types";
import {  useMemo } from "react";
import { useAppDispatch } from "@/redux/store";
import {
  addPackage,
  deletePackage,
  editPackage,
  getProMotionTable,
  updatePackage,
} from "@/redux/slices/promotion/proMotionActions";
import {
  CreatePromotionRequest,
  DeletePromotionRequest,
  EditCreatePromotionRequest,
  UpdatePromotionRequest,
} from "@/redux/slices/promotion/proMotion.utils";
import { toast } from "react-toastify";

export const usePromotionModal = (
  { promotion }: { promotion: PromotionTableColumns },
  { closeModal }: { closeModal: () => void }
) => {
  const dispatch = useAppDispatch();
  const promotionInitialValues: CreatePromotionFormKeysProps = useMemo(() => {
    console.log(promotion, "promotion");
    return {
      name: promotion.package,
      days: promotion.days.toString(),
      amount: promotion.amount.toString(),
      startAt: promotion.startAt,
      expiredAt: promotion.expiredAt,
      package: promotion.packageType,
    };
  }, []);
  const handleAddPromotion = (value: CreatePromotionFormKeysProps) => {
    const request: CreatePromotionRequest = {
      package: value.name,
      days: value.days.toString(),
      amount: value.amount.toString(),
      startAt: value.startAt,
      expiredAt: value.expiredAt,
      packageType: value.package,
      isActive: true,
    };
    dispatch(
      addPackage(request, (check) => {
        if (check) {
          closeModal();
          dispatch(getProMotionTable(() => {}));
           toast.success("เพิ่มแพ็คเก็จเรียบร้อย", {
            position: "top-right", // You can change position as needed
            autoClose: 5000, // Auto close after 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
            toast.error("เกิดข้อผิดพลาด", {
            position: "top-right", // You can change position as needed
            autoClose: 5000, // Auto close after 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
    );
  };
  const handleDelete = () => {
    const request: DeletePromotionRequest = {
      id: promotion.id,
    };
    dispatch(
      deletePackage(request, (check) => {
        if (check) {
          dispatch(getProMotionTable(() => {}));
          closeModal();
           toast.success("ลบแพ็คเก็จเรียบร้อย", {
            position: "top-right", // You can change position as needed
            autoClose: 5000, // Auto close after 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
            toast.error("เกิดข้อผิดพลาด", {
            position: "top-right", // You can change position as needed
            autoClose: 5000, // Auto close after 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
    );
  };

  const handleEdit = (value: CreatePromotionFormKeysProps) => {
    const request: EditCreatePromotionRequest = {
      id:promotion.id,
      package: value.name,
      days: value.days.toString(),
      amount: value.amount.toString(),
      startAt: value.startAt,
      expiredAt: value.expiredAt,
      packageType: value.package,
      isActive: true,
    };
    dispatch(
      editPackage(request, (check) => {
        if (check) {
            closeModal();
            dispatch(getProMotionTable(() => {}));
            toast.success("แก้ไขแพ็คเก็จเรียบร้อย", {
            position: "top-right", // You can change position as needed
            autoClose: 5000, // Auto close after 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }else {
            toast.error("เกิดข้อผิดพลาด", {
            position: "top-right", // You can change position as needed
            autoClose: 5000, // Auto close after 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
    );
  };
 const handleUpdate = () => {
    const request: UpdatePromotionRequest  = {
      id:promotion.id,
      isActive: !promotion.isActive,
    };
    dispatch(
     updatePackage(request, (check) => {
        if (check) {
            closeModal();
            dispatch(getProMotionTable(() => {}));
            toast.success("Update แพ็คเก็จเรียบร้อย", {
            position: "top-right", // You can change position as needed
            autoClose: 5000, // Auto close after 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }else {
            toast.error("เกิดข้อผิดพลาด", {
            position: "top-right", // You can change position as needed
            autoClose: 5000, // Auto close after 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
    );
  };

  return {
    promotionInitialValues,
    handleAddPromotion,
    handleDelete,
    handleEdit,
     handleUpdate
  };
};
