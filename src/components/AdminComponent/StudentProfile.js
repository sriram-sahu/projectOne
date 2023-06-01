import React, { useRef } from "react";
import { useLocation } from "react-router";
import { useReactToPrint } from "react-to-print";
import Barchart from "./BarCharts";
import PieChart from "./PieChart";

const StudentProfile = () => {
  const location = useLocation();
  const detailsPdf = useRef();
  const item = location.state;
  const {
    Email,
    Score,
    Java_Score,
    Operating_System_Score,
    Javascript_Score,
    React_Score,
  } = item;
  const interests_score = Java_Score + React_Score + Javascript_Score;
  const aptitude_score = Operating_System_Score;

  const generatePdf = useReactToPrint({
    content: () => detailsPdf.current,
    documentTitle: "Student results",
    // onAfterPrint: () => alert("pdf downloaded"),
  });

  return (
    <div>
      <div className='p-3' ref={detailsPdf}>
        {console.log(item)}
        <h1>Student Details</h1>
        <p>name : </p>
        <p>Email : {Email}</p>
        <p>Score : {Score}</p>
        <p>Interests Score : {interests_score}</p>
        <p>Aptitude Score : {aptitude_score}</p>
        <div>
          <PieChart
            Score={Score}
            Java_Score={Java_Score}
            Operating_System_Score={Operating_System_Score}
            Javascript_Score={Javascript_Score}
            React_Score={React_Score}
          />
          {console.log("barChart")}
          <Barchart itemDetails={item} />
        </div>
      </div>
      <div className='text-center'>
        <button className='btn btn-primary' onClick={generatePdf}>
          Download
        </button>
      </div>
    </div>
  );
};

export default StudentProfile;
