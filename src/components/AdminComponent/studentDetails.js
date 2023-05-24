import React, { useState, useEffect } from "react";
import Navbar from "../design/Navbar";
import Papa from "papaparse";
import jsPDF from "jspdf";
import emailjs from "@emailjs/browser";
import "./index.css";
import { useNavigate } from "react-router-dom";

const Papaparse = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Papa.parse(process.env.REACT_APP_SHEET_URL, {
      download: true,
      header: true,
      complete: (results) => {
        console.log(results.data);
        setData(results.data);
      },
    });
  }, []);

  function createPdf(item) {
    var doc = new jsPDF("landscape", "px", "a4", false);
    doc.rect(20, 20, 600, 400, "D");
    doc.setLineWidth(2);
    doc.setDrawColor(255, 0, 0);
    doc.setFillColor(0, 255, 0);

    doc.text(
      60,
      60,
      "TestCompleted: " +
        item.Timestamp +
        "\n" +
        "\n" +
        "Email: " +
        item.Email +
        "\n" +
        "\n" +
        "Score: " +
        item.Score +
        "\n" +
        "\n" +
        "Java Score : " +
        item.Java_Score +
        "\n" +
        "\n" +
        "React Score : " +
        item.React_Score +
        "\n" +
        "\n" +
        "JavaScript Score : " +
        item.Javascript_Score +
        "\n" +
        "\n" +
        "Operating System Score : " +
        item.Operating_System_Score
    );
    doc.save("result.pdf");
  }

  const sendScore = (item) => {
    var document = new jsPDF("landscape", "px", "a4", false);
    document.rect(20, 20, 600, 400, "D");
    document.setLineWidth(2);
    document.setDrawColor(255, 0, 0);
    document.setFillColor(0, 255, 0);
    document.text(
      60,
      60,
      "TestCompleted: " +
        item.Timestamp +
        "\n" +
        "\n" +
        "Email: " +
        item.Email +
        "\n" +
        "\n" +
        "Score: " +
        item.Score +
        "\n" +
        "\n" +
        "Java Score : " +
        item.Java_Score +
        "\n" +
        "\n" +
        "React Score : " +
        item.React_Score +
        "\n" +
        "\n" +
        "JavaScript Score : " +
        item.Javascript_Score +
        "\n" +
        "\n" +
        "Operating System Score : " +
        item.Operating_System_Score
    );

    const pdfContent = document.output("datauristring");

    let message = `Hello ${item.Email} \n \n Here Your result Details \n \n ${pdfContent}`;

    emailjs
      .send(
        "service_lambt8e",
        "template_1snfqxn",
        {
          to_name: item.Email,
          from_name: "sriram",
          message:
            "https://www.youtube.com/watch?v=5Vp4RVLNo3c&ab_channel=Cybernatico",
          to_email: item.Email,
        },
        "97pI7JWf7O5EPMjAH"
      )
      .then((result) => {
        console.log("Email sent successfully:", result.text);
        alert(`Email sent to ${item.Email}`);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  data.map((item) => {
    let Java_Score = 0;
    let Operating_System_Score = 0;
    let Javascript_Score = 0;
    let React_Score = 0;
    Object.keys(item).map((_, i) => {
      if (i > 2) {
        if (
          item[_] === "TRUE" &&
          JSON.parse(process.env.REACT_APP_JAVA_ORDER)
            .map((item) => parseInt(item))
            .includes(i - 2)
        ) {
          Java_Score += 1;
        }
        if (
          item[_] === "TRUE" &&
          JSON.parse(process.env.REACT_APP_OS_ORDER)
            .map((item) => parseInt(item))
            .includes(i - 2)
        ) {
          Operating_System_Score += 1;
        }
        if (
          item[_] === "TRUE" &&
          JSON.parse(process.env.REACT_APP_JAVASCRIPT_ORDER)
            .map((item) => parseInt(item))
            .includes(i - 2)
        ) {
          Javascript_Score += 1;
        }
        if (
          item[_] === "TRUE" &&
          JSON.parse(process.env.REACT_APP_REACT_ORDER)
            .map((item) => parseInt(item))
            .includes(i - 2)
        ) {
          React_Score += 1;
        }
      }
    });

    item.Java_Score = Java_Score;
    item.Operating_System_Score = Operating_System_Score;
    item.Javascript_Score = Javascript_Score;
    item.React_Score = React_Score;
  });

  return (
    <div>
      <Navbar />
      {console.log(process.env)}
      <h1>Student Details</h1>
      <div className='display'>
        <div>
          <label htmlFor='start-date'>Start Date : </label>
          <input type='date' id='start-date' />
        </div>
        <div>
          <label htmlFor='end-date'>End Date : </label>
          <input type='date' id='end-date' />
        </div>
      </div>
      {data.length > 0 ? (
        <div className='table-container'>
          <table className='table table-striped m-3'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Completed On</th>
                <th>Email</th>
                <th>Score</th>
                <th>Profiles</th>
                <th>Download Score</th>
                <th>Send Score</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{item.Timestamp}</td>
                  <td>{item.Email}</td>
                  <td>{item.Score}</td>
                  <td>
                    <button
                      onClick={() =>
                        navigate("/studentProfile", { state: item })
                      }
                    >
                      view Profile
                    </button>
                  </td>
                  <td>
                    <button onClick={() => createPdf(item)}>Download</button>
                  </td>
                  <td>
                    <button onClick={() => sendScore(item)}>Send</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default Papaparse;
