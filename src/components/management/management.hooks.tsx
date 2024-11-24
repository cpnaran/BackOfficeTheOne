import { values } from "lodash";
import {
  ManagementFormKeysProps,
  UseManagementFormProps,
} from "./management.types";
import { RootState, useAppDispatch } from "@/redux/store";
import { useRouter } from "next/router";
import useModal from "@/hooks/useModal";
import { useSelector } from "react-redux";
import {
  addDay,
  demote,
  getCarList,
  getOptionPremium,
  updatePromote,
} from "@/redux/slices/management/managementActions";
import {
  AddDayRequest,
  CarListRequest,
  DemoteRequest,
  ManagementTableColumns,
  PromoteRequest,
} from "@/redux/types/management.types";
import { useEffect, useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { dateFormat } from "@/utils/format";
import Menu from "antd/es/menu";
import Dropdown from "antd/es/dropdown";
import { FiMoreVertical } from "react-icons/fi";
import styles from "./management.from.module.css";
import { setLayout } from "@/redux/slices/layout/layoutSlice";
import { toast } from "react-toastify";
import { ManagementType } from "../modals/management/managementModal.types";

export const useManagement = ({
  values,
  setFieldValue,
}: UseManagementFormProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isModalOpen, openModal, closeModal] = useModal();
  const [show, setShow] = useState<boolean>(false);
  const [management, setManagement] = useState<ManagementType>();
  const { locale, query } = router;
  const totalPages = useSelector(
    (state: RootState) => state.management.totalPage || 1
  );
  const totalCount = useSelector(
    (state: RootState) => state.management.totalCount || 1
  );
  const managementPackageTable = useSelector(
    (state: RootState) => state.management.carList
  );

  const loading = useSelector((state: RootState) => state.management.loading);
  const columnHelper = createColumnHelper<ManagementTableColumns>();
  const optionPromotion = useSelector(
    (state: RootState) => state.management.option
  );
  const columnValues: ManagementTableColumns[] = useMemo(() => {
    if (managementPackageTable) {
      return managementPackageTable.map((e, index) => {
        return {
          index: index,
          id: e.id,
          fullName: e.fullName,
          userId: e.userId,
          license: e.license,
          status: e.status,
          startAt: e.startAt,
          expiredAt: e.expiredAt,
          jsonData: e.jsonData,
          isActive: e.isActive,
        };
      });
    } else {
      return [];
    }
  }, [managementPackageTable]);

  const onSearch = (value: ManagementFormKeysProps) => {
    const request: CarListRequest = {
      license: value.licensePlate,
      per_page: value.perPage,
      page: value.page,
    };
    dispatch(
      getCarList(request, () => {
        setShow(true);
      })
    );
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

  const handleSubmit = (value: ManagementFormKeysProps) => {
    onSearch(value);
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

  const modifiedPromotionOptions = useMemo(() => {
    const modifiedOptions = optionPromotion.map((opt) => ({
      value: opt.id,
      label: opt.package + " " + opt.amount + " " + "บาท",
    }));
    return modifiedOptions;
  }, [optionPromotion]);
  const handleAdd = (id: string) => {
    const request: AddDayRequest = {
      id: id,
    };
    dispatch(
      addDay(request, (check) => {
        if (check) {
          toast.success("เพิ่ม 15 วัน เรียบร้อย", {
            position: "top-right", // You can change position as needed
            autoClose: 5000, // Auto close after 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          onSearch(values);
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
  const handleDemote = (id: string) => {
    const request: DemoteRequest = {
      id: id,
    };
    dispatch(
      demote(request, (check) => {
        if (check) {
          toast.success("ปรับสถานะเป็นปกติ เรียบร้อย", {
            position: "top-right", // You can change position as needed
            autoClose: 5000, // Auto close after 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          onSearch(values);
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
  const handleUpdatePromote = (id: string, package_id: string) => {
    const request: PromoteRequest = {
      id: id,
      package_id: package_id,
    };
    dispatch(
      updatePromote(request, (check) => {
        if (check) {
          closeModal();
          toast.success("ปรับสถานะเป็นรายปี เรียบร้อย", {
            position: "top-right", // You can change position as needed
            autoClose: 5000, // Auto close after 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          onSearch(values);
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
  const columns = useMemo(
    () => [
      columnHelper.accessor("fullName", {
        header: "ชื่อ-นามสกุล",
        size: 48,
      }),

      columnHelper.accessor("license", {
        header: "ทะเบียน",
        size: 120,
      }),

      columnHelper.accessor("jsonData", {
        header: "สถานะ",
        size: 120,
        cell: (info) =>
          info.row.original.jsonData === null
            ? "ลูกค้ารายเดือน"
            : "ลูกค้ารายปี",
      }),
      columnHelper.accessor("startAt", {
        header: "วันเริ่ม",
        size: 100,
        cell: (info) => dateFormat(info.renderValue() || "", "DD/MM/BBBB"),
      }),
      columnHelper.accessor("expiredAt", {
        header: "วันสิ้นสุด",
        size: 100,
        cell: (info) => dateFormat(info.renderValue() || "", "DD/MM/BBBB"),
      }),

      columnHelper.accessor("action", {
        header: "ดำเนินการ",
        cell: (info) => {
          const menu =
            info.row.original.jsonData === null ? (
              <Menu>
                <Menu.Item
                  key="add"
                  onClick={() => {
                    handleAdd(info.row.original.id);
                  }}
                >
                  เพิ่มฟรี 15 วัน
                </Menu.Item>
                <Menu.Item
                  key="update"
                  onClick={() => {
                    const data: ManagementType = {
                      name: info.row.original.fullName,
                      license: info.row.original.license,
                      id: info.row.original.id,
                    };
                    setManagement(data);
                    openModal();
                  }}
                >
                  ปรับสถานะเป็นรายปี
                </Menu.Item>
              </Menu>
            ) : (
              <Menu>
                <Menu.Item
                  key="add"
                  onClick={() => {
                    handleAdd(info.row.original.id);
                  }}
                >
                  เพิ่มฟรี 15 วัน
                </Menu.Item>

                <Menu.Item
                  key="demote"
                  onClick={() => {
                    handleDemote(info.row.original.id);
                  }}
                >
                  ปรับสถานะเป็นปกติ
                </Menu.Item>
              </Menu>
            );

          return (
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              placement="bottomRight"
            >
              <div
                className={styles.action}
                onClick={(e) => e.preventDefault()}
              >
                <FiMoreVertical />
              </div>
            </Dropdown>
          );
        },
        size: 90,
      }),
    ],
    [columnHelper]
  );
  useEffect(() => {
    if (Object.keys(query).length === 0) {
    } else {
      onSearch(values);
    }
  }, [query]);

  useEffect(() => {}, [managementPackageTable]);

  useEffect(() => {
    onSearch(values);
    dispatch(getOptionPremium(() => {}));
    dispatch(
      setLayout({ header: true, main: true, footer: true, sidebar: true })
    );
  }, [dispatch]);
  return {
    onChangePage,
    handleOnBlurCardPage,
    handleChangePerPage,
    handleChangeOrder,
    closeModal,
    handleSubmit,
    handleUpdatePromote,
    management,
    show,
    isModalOpen,
    columnHelper,
    columnValues,
    totalPages,
    totalCount,
    managementPackageTable,
    columns,
    loading,
    modifiedPromotionOptions,
  };
};
