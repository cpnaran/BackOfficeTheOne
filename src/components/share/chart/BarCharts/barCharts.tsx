import dynamic from "next/dynamic";
import { useMemo } from "react";
import styles from "./barCharts.module.css";
import { GraphBarProps } from "./barCharts.types";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type PackageData = {
  packageId: string;
  count: number;
  package_name: string;
};

type ChartData = {
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
};

const StackedBarChart = ({ graph }: GraphBarProps) => {
  // Define your data with PackageData type
  //   const data: PackageData[] = [
  //     {
  //       packageId: "30d27f15-0ace-4263-b789-1c851d15bc5c",
  //       count: 2,
  //       package_name: "แพ็คเกจ 90 วัน",
  //     },
  //     {
  //       packageId: "cda9755d-64bb-4eb5-b804-e0bc5d93ce9d",
  //       count: 1,
  //       package_name: "แพ็คเกจ 1 วัน test",
  //     },
  //     {
  //       packageId: "30d27f15-0ace-4263-b789-1c851d15bc5c",
  //       count: 2,
  //       package_name: "แพ็คเกจ 90 วัน",
  //     },
  //     {
  //       packageId: "30d27f15-0ace-4263-b789-1c851d15bc5c",
  //       count: 2,
  //       package_name: "แพ็คเกจ 90 วัน",
  //     },
  //     {
  //       packageId: "30d27f15-0ace-4263-b789-1c851d15bc5c",
  //       count: 2,
  //       package_name: "แพ็คเกจ 90 วัน",
  //     },
  //     {
  //       packageId: "30d27f15-0ace-4263-b789-1c851d15bc5c",
  //       count: 2,
  //       package_name: "แพ็คเกจ 90 วัน",
  //     },
  //     {
  //       packageId: "cda9755d-64bb-4eb5-b804-e0bc5d93ce9d",
  //       count: 1,
  //       package_name: "แพ็คเกจ 1 วัน test",
  //     },
  //     {
  //       packageId: "30d27f15-0ace-4263-b789-1c851d15bc5c",
  //       count: 2,
  //       package_name: "แพ็คเกจ 90 วัน",
  //     },
  //     {
  //       packageId: "30d27f15-0ace-4263-b789-1c851d15bc5c",
  //       count: 2,
  //       package_name: "แพ็คเกจ 90 วัน",
  //     },
  //     {
  //       packageId: "30d27f15-0ace-4263-b789-1c851d15bc5c",
  //       count: 2,
  //       package_name: "แพ็คเกจ 90 วัน",
  //     },
  //     {
  //       packageId: "30d27f15-0ace-4263-b789-1c851d15bc5c",
  //       count: 2,
  //       package_name: "แพ็คเกจ 90 วัน",
  //     },
  //     {
  //       packageId: "cda9755d-64bb-4eb5-b804-e0bc5d93ce9d",
  //       count: 1,
  //       package_name: "แพ็คเกจ 1 วัน test",
  //     },
  //     {
  //       packageId: "30d27f15-0ace-4263-b789-1c851d15bc5c",
  //       count: 2,
  //       package_name: "แพ็คเกจ 90 วัน",
  //     },
  //     {
  //       packageId: "30d27f15-0ace-4263-b789-1c851d15bc5c",
  //       count: 2,
  //       package_name: "แพ็คเกจ 90 วัน",
  //     },
  //     {
  //       packageId: "30d27f15-0ace-4263-b789-1c851d15bc5c",
  //       count: 2,
  //       package_name: "แพ็คเกจ 90 วัน",
  //     },

  //     {
  //       packageId: "30d27f15-0ace-4263-b789-1c851d15bc5c",
  //       count: 2,
  //       package_name: "แพ็คเกจ 90 วัน",
  //     },
  //     {
  //       packageId: "cda9755d-64bb-4eb5-b804-e0bc5d93ce9d",
  //       count: 1,
  //       package_name: "แพ็คเกจ 1 วัน test",
  //     },
  //     {
  //       packageId: "30d27f15-0ace-4263-b789-1c851d15bc5c",
  //       count: 2,
  //       package_name: "แพ็คเกจ 90 วัน",
  //     },
  //     {
  //       packageId: "30d27f15-0ace-4263-b789-1c851d15bc5c",
  //       count: 2,
  //       package_name: "แพ็คเกจ 90 วัน",
  //     },
  //     {
  //       packageId: "30d27f15-0ace-4263-b789-1c851d15bc5c",
  //       count: 2,
  //       package_name: "แพ็คเกจ 90 วัน",
  //     },
  //   ];

  // Transform data for ApexCharts with ChartData type
  const chartData: ChartData = useMemo(() => {
    return {
      series: [
        {
          name: "จำนวนที่ขายได้",
          data: graph.map((item) => item.count),
        },
      ],
      categories: graph.map((item) => item.packageName),
    };
  }, [graph]);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      stacked: true,
      height: Math.max(350, graph.length * 10),
    },
    plotOptions: {
      bar: {
        horizontal: true, // Make bars horizontal
        barHeight: "95%", // Adjust this value to make bars smaller
        borderRadius: 4,
        borderRadiusApplication: "end",
      },
    },

    xaxis: {
      categories: chartData.categories,
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} packages`,
      },
    },

    title: {
      text: "Package usage",
      align: "center",
      style: {
        fontSize: "14px",
      },
    },
  };

  return (
    <div className={styles.container}>
      <Chart
        options={options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default StackedBarChart;
