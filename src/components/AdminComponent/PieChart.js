import React from "react";

// import {Chart} from 'react-google-charts'
import Chart from "react-apexcharts";
const PieChart = (props) => {
  const { Operating_System_Score, React_Score, Java_Score, Javascript_Score } =
    props;
  const a = (Java_Score / 5) * 100;
  const b = (Javascript_Score / 5) * 100;
  const c = (React_Score / 5) * 100;
  const d = (Operating_System_Score / 5) * 100;
  return (
    <div>
      <Chart
        type='pie'
        width={500}
        height={200}
        series={[a, b, c, d]}
        options={{
          labels: ["Java", "JavaScript", "React", "Operating System"],
        }}
      ></Chart>
    </div>
  );
};

export default PieChart;
