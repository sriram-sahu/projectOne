import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
// import './Barchart.css'
const barColors = ["#1f77b4", "#ff7f0e"];
const Barchart = ({ itemDetails }) => {
  const interests_score =
    itemDetails.Java_Score +
    itemDetails.React_Score +
    itemDetails.Javascript_Score;
  const aptitude_score = itemDetails.Operating_System_Score;
  // Sample data
  const data = [
    { name: "Interests", score: interests_score },
    { name: "Aptitude", score: aptitude_score },
  ];

  return (
    <div className='bar'>
      {console.log("barChart")}
      <h1>Bar Chart </h1>
      <BarChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip wrapperStyle={{ top: 0, left: 10 }} />
        <Bar dataKey='score' fill='green' barSize={50}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
          ))}
        </Bar>
        <XAxis dataKey='name' />
        <YAxis type='number' domain={[0, 20]} />
      </BarChart>
    </div>
  );
};
export default Barchart;
