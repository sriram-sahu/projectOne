import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline='central'
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function App(props) {
  const { EnglishScore, MathsScore } = props;
  const data = [
    { name: "Maths", value: (MathsScore / 4) * 100 },
    { name: "English", value: (EnglishScore / 1) * 100 },
  ];

  return (
    <div>
      <div>{console.log(EnglishScore / 1)}</div>
      <PieChart width={600} height={400}>
        <Pie
          data={data}
          cx={300}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill='#8884d8'
          dataKey='value'
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          iconSize={10}
          align='center'
          verticalAlign='bottom'
          layout='horizontal'
        />
      </PieChart>
    </div>
  );
}
