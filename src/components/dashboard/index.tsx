import Card from "../share/card/card";
import { useDashboard } from "./dashboard.hooks";
import styles from "./dashboard.module.css";
import AreaChart from "../share/chart/AreaCharts/areaCharts";
import { Select } from "antd";
import AreaCarChart from "../share/chart/AreaCharts/areaChartsCar";
import PeakTimeChart from "../share/chart/AreaCharts/areaChartsTime";
import LoadingScreen from "../loadingScreen/loading";
import StackedBarChart from "../share/chart/BarCharts/barCharts";

const DashBoardPageContainer: React.FC = () => {
  const {
    handledMonth,
    handledYearChange,
    handledYearCarChange,
    year,
    yearCar,
    month,
    cards,
    graph,
    graphCar,
    graphTime,
    loading,
    summaryPackages,
  } = useDashboard();
  return (
    <div className={styles.wrapper}>
      <div className={styles.card_container}>
        <div className={styles.select_container}>
          <p>เลือกเดือน:</p>
          <Select
            defaultValue={month}
            style={{ width: 200, height: 40 }}
            onChange={(e) => {
              handledMonth(e);
            }}
            options={[
              { value: 0, label: "มกราคม" },
              { value: 1, label: "กุมภาพันธ์" },
              { value: 2, label: "มีนาคม" },
              { value: 3, label: "เมษายน" },
              { value: 4, label: "พฤษภาคม" },
              { value: 5, label: "มิถุนายน" },
              { value: 6, label: "กรกฎาคม" },
              { value: 7, label: "สิงหาคม" },
              { value: 8, label: "กันยายน" },
              { value: 9, label: "ตุลาคม" },
              { value: 10, label: "พฤศจิกายน" },
              { value: 11, label: "ธันวาคม" },
            ]}
          />
        </div>
        <div className={styles.cards}>
          {cards.map((item) => (
            <Card item={item} key={item.id} className={styles["w-100"]} />
          ))}
        </div>
      </div>
      <div className={styles.chartContent}>
        <AreaCarChart
          graph={graphCar}
          year={yearCar}
          handleYearChange={handledYearCarChange}
        />
        <AreaChart
          graph={graph}
          year={year}
          handleYearChange={handledYearChange}
        />
      </div>
      <div className={styles.chartContentTime}>
        <PeakTimeChart
          graph={graphTime}
          year={year}
          handleYearChange={handledYearChange}
        />
      </div>
      <div className={styles.chartContentTime}>
        <StackedBarChart graph={summaryPackages} />
      </div>
      {loading && <LoadingScreen />}
    </div>
  );
};

export default DashBoardPageContainer;
