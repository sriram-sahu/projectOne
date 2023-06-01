import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import emailjs from "@emailjs/browser";
import "./index.css";

export default function StudentsTable(props) {
  const { data } = props;
  const navigate = useNavigate();

  const updateScore = (item) => {
    if (item.Total_Score === undefined) {
      fetch(`https://sheetdb.io/api/v1/lwkpk0h10tyzh/Email/${item.Email}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer 8zkvfpdud4jcdq3a2aenrr60f62m6687ob1k9omp",
        },
        body: JSON.stringify({
          data: {
            Javascript_Score: item.Javascript_Score,
            Java_Score: item.Java_Score,
            React_Score: item.React_Score,
            Operating_System_Score: item.Operating_System_Score,
            Total_Score:
              item.Javascript_Score +
              item.Java_Score +
              item.Operating_System_Score +
              item.React_Score,
          },
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const handleSendMail = (item) => {
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

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "Timestamp", headerName: "Completed On", width: 200 },
    { field: "Email", headerName: "Email", width: 300 },
    {
      field: "Score",
      headerName: "Score (20)",
      width: 150,
    },
    {
      field: "View Profile",
      headerName: "View Profile",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant='outlined'
          color='primary'
          onClick={() => {
            navigate("/studentProfile", { state: params.row });
            updateScore(params.row);
          }}
        >
          View Profile
        </Button>
      ),
    },
    {
      field: "Send Mail",
      headerName: "Send Mail",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant='outlined'
          color='primary'
          endIcon={<SendIcon />}
          onClick={() => handleSendMail(params.row)}
        >
          Send Mail
        </Button>
      ),
    },
  ];

  return (
    <div className='display-column p-3'>
      <div style={{ height: 400, width: "90%" }}>
        <DataGrid
          //   style={{ backgroundColor: "#d5dfe0" }}
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  );
}
