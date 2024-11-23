import { values } from "lodash";
import { ManagementFormKeysProps, UseManagementFormProps } from "./management.types";
import { RootState, useAppDispatch } from "@/redux/store";
import { useRouter } from "next/router";
import useModal from "@/hooks/useModal";
import { useSelector } from "react-redux";
import { getCarList } from "@/redux/slices/management/managementActions";
import { CarListRequest } from "@/redux/types/management.types";
import { useEffect } from "react";

export const useManagement = ({
    values,
    setFieldValue,
}:UseManagementFormProps) =>{
    const dispatch = useAppDispatch();
  const router = useRouter();
  const [isModalOpen, openModal, closeModal] = useModal();
  const { locale, query } = router;
//   const totalPages = useSelector(
//     (state: RootState) => state.management.page || 1
//   );
//   const totalCount = useSelector(
//     (state: RootState) => state.report.salesReport.salesReport?.totalCount || 1
//   );
   
const onSearch = (value: ManagementFormKeysProps) => {

    const request: CarListRequest = {
        license:value.licensePlate,
        per_page: value.perPage,
      page: value.page,
    };
    dispatch( getCarList(request, () => {}));
  };

  const onChangePage = async (page: number) => {
    await setFieldValue("page", page);
    const updatedValues = { ...values, page };
    onSearch(updatedValues);
  };
  const handleChangeOrder = async (order: "desc" | "asc") => {
    await setFieldValue("order", order);
    const updatedValues = { ...values, order };
    onSearch(updatedValues);
  };

  const handleChangePerPage = async (perPage: number) => {
    await setFieldValue("page", 1);
    await setFieldValue("perPage", perPage);
    const updatedValues = { ...values, perPage };
    onSearch(updatedValues);
  };

  const handleOnBlurCardPage = async (page: number) => {
    await setFieldValue("page", page);
    const updatedValues = { ...values, page };
    onSearch(updatedValues);
  };

  useEffect(() => {
    if (Object.keys(query).length === 0) {
    } else {
      onSearch(values);
    }
  }, [query]);


  return {
  
    onChangePage,
    handleOnBlurCardPage,
    handleChangePerPage,
    handleChangeOrder,
    isModalOpen,
    closeModal,
  };
}

