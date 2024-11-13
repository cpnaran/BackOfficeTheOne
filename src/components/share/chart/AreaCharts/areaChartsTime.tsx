// components/PeakTimeChart.js
import React from "react";
import dynamic from "next/dynamic";
import styles from "./areaCharts.module.css";
import {
  GraphContainerProps,
  GraphTimeContainerProps,
} from "./areaCharts.types";
import { ApexOptions } from "apexcharts";

// ใช้ dynamic import เพื่อให้ใช้ ApexCharts ได้ใน Next.js
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const PeakTimeChart = ({ graph }: GraphTimeContainerProps) => {
  // กำหนดข้อมูลสำหรับกราฟ
  const series = [
    {
      name: "ปริมาณการใช้รถ",
      data: [
        parseFloat(graph["00"]),
        parseFloat(graph["01"]),
        parseFloat(graph["02"]),
        parseFloat(graph["03"]),
        parseFloat(graph["04"]),
        parseFloat(graph["05"]),
        parseFloat(graph["06"]),
        parseFloat(graph["07"]),
        parseFloat(graph["09"]),
        parseFloat(graph[10]),
        parseFloat(graph[11]),
        parseFloat(graph[12]),
        parseFloat(graph[13]),
        parseFloat(graph[14]),
        parseFloat(graph[15]),
        parseFloat(graph[16]),
        parseFloat(graph[17]),
        parseFloat(graph[18]),
        parseFloat(graph[19]),
        parseFloat(graph[20]),
        parseFloat(graph[21]),
        parseFloat(graph[22]),
        parseFloat(graph[23]),
        parseFloat(graph[24]),
      ], // ตัวอย่างข้อมูล
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    colors: ["#008FFB"],
    xaxis: {
      categories: [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "10:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
      ], // ตัวอย่างเวลาที่ต้องการ
    },
    yaxis: {
      show: false, // Hide y-axis
    },
    title: {
      text: "Peak Time Analysis",
      align: "center",
    },
  };

  return (
    <div className={styles.containerTime}>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default PeakTimeChart;
