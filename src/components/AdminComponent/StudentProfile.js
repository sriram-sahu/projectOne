import React, { useRef } from "react";
import { useLocation } from "react-router";
import StudentPieChart from "./StudentPieChart";
import Chat from "./StudentChart";
import { useReactToPrint } from "react-to-print";
import Barchart from "./BarCharts";

const StudentProfile = () => {
  const location = useLocation();
  const detailsPdf = useRef();
  const item = location.state;
  console.log("a", item);
  const {
    Email,
    Score,
    Java_Score,
    Operating_System_Score,
    Javascript_Score,
    React_Score,
  } = item;

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
        <p>Java Score : {Java_Score}</p>
        <p>JavaScript Score : {Javascript_Score}</p>
        <p>React Score : {React_Score}</p>
        <p>Operating System Score : {Operating_System_Score}</p>
        <div>
          {/* <Chat
            Score={Score}
            Java_Score={Java_Score}
            Operating_System_Score={Operating_System_Score}
            Javascript_Score={Javascript_Score}
            React_Score={React_Score}
          /> */}
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
