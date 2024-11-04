import { useDeviceType } from "@/hooks/useDeviceType";
import {
  getCarGraph,
  getGraph,
  getIncome,
  getTimeGraph,
  getTotalCar,
} from "@/redux/slices/dashboard/dashboardActions";
import { setLayout } from "@/redux/slices/layout/layoutSlice";
import { RootState, useAppDispatch } from "@/redux/store";
import {
  GraphRequest,
  IncomeRequest,
} from "@/redux/types/dashboardSlice.types";

import { useEffect, useState } from "react";
import { FaCarSide } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { useSelector } from "react-redux";

export const useDashboard = () => {
  const date = new Date();
  const isDevice = useDeviceType();
  const dispatch = useAppDispatch();
  const [year, setyear] = useState<number>(date.getFullYear());
  const [yearCar, setyearCar] = useState<number>(date.getFullYear());
  const [month, setmonth] = useState<number>(date.getMonth());
  const graph = useSelector((state: RootState) => state.dashboard.graph);
  const graphCar = useSelector((state: RootState) => state.dashboard.graphCar);
  const graphTime = useSelector(
    (state: RootState) => state.dashboard.graphPeaktime
  );
  const loading = useSelector((state: RootState) => state.dashboard.loading);
  const carAmount = useSelector(
    (state: RootState) => state.dashboard.carAmount
  );
  const inCome = useSelector((state: RootState) => state.dashboard.income);
  const getMonthName = (month: number): string => {
    const monthNames = [
      "มกราคม", // 0
      "กุมภาพันธ์", // 1
      "มีนาคม", // 2
      "เมษายน", // 3
      "พฤษภาคม", // 4
      "มิถุนายน", // 5
      "กรกฎาคม", // 6
      "สิงหาคม", // 7
      "กันยายน", // 8
      "ตุลาคม", // 9
      "พฤศจิกายน", // 10
      "ธันวาคม", // 11
    ];

    // Check if month is valid
    if (month < 0 || month > 11) {
      throw new Error("Invalid month value. Must be between 0 and 11.");
    }

    return monthNames[month];
  };
  const cards = [
    {
      id: 1,
      title: "จำนวนรถทั้งหมด",
      total: carAmount + "  คัน" + " ของเดือน" + getMonthName(month),
      icons: <FaCarSide size={48} />,
    },
    {
      id: 2,
      title: "จำนวนรายได้ทั้งหมด",
      total: inCome + "  บาท" + " ของเดือน" + getMonthName(month),
      icons: <GiMoneyStack size={48} />,
    },
  ];

  const handledMonth = (values: number) => {
    setmonth(values);
  };
  const handledYearChange = (year: number) => {
    setyear(year);
  };

  const handledYearCarChange = (year: number) => {
    setyearCar(year);
  };

  useEffect(() => {
    dispatch(
      setLayout({ header: true, main: true, footer: true, sidebar: true })
    );
  }, [dispatch]);

  useEffect(() => {
    const request: GraphRequest = {
      year: year.toString(),
    };
    dispatch(getGraph(request, () => {}));
  }, [year]);

  useEffect(() => {
    dispatch(getTimeGraph(() => {}));
  }, []);

  useEffect(() => {
    const request: GraphRequest = {
      year: yearCar.toString(),
    };
    dispatch(getCarGraph(request, () => {}));
  }, [yearCar]);

  useEffect(() => {
    const request: IncomeRequest = {
      month: month,
    };
    dispatch(getIncome(request, () => {}));
    dispatch(getTotalCar(request, () => {}));
  }, [month]);

  return {
    handledMonth,
    handledYearChange,
    handledYearCarChange,
    isDevice,
    graph,
    graphCar,
    loading,
    month,
    year,
    yearCar,
    cards,
    graphTime,
  };
};
