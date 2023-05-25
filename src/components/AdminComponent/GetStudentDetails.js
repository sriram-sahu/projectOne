import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import jsPDF from "jspdf";
import emailjs from "@emailjs/browser";
import { Navbar } from "react-bootstrap";
import "./index.css";
import StudentsTable from "./StudentsTable";
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

const GetStudentsDetails = () => {
  const [sheetData, setSheetData] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [filteredData, setFilteredData] = useState(sheetData);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadGoogleAPI = () => {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.onload = initializeGoogleAPI;
      document.head.appendChild(script);
    };

    const initializeGoogleAPI = () => {
      window.gapi.load("client:auth2", initClient);
    };

    const initClient = () => {
      window.gapi.client
        .init({
          apiKey: process.env.REACT_APP_API_KEY,
          clientId: process.env.REACT_APP_CLIENT_ID,
          scope: SCOPES,
          discoveryDocs: [
            "https://sheets.googleapis.com/$discovery/rest?version=v4",
          ],
        })
        .then(() => {
          console.log("Google API client initialized");
          const authInstance = window.gapi.auth2.getAuthInstance();
          setIsSignedIn(authInstance.isSignedIn.get());
          authInstance.isSignedIn.listen(updateSignInStatus);
          executeRequest();
          getUserEmail();
        })
        .catch((error) => {
          console.error("Error initializing Google API client", error);
        });
    };

    const updateSignInStatus = (isUserSignedIn) => {
      setIsSignedIn(isUserSignedIn);
      if (isUserSignedIn) {
        getUserEmail();
      } else {
        setUserEmail("");
      }
    };

    const executeRequest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_SHEET_ID,
          range: process.env.REACT_APP_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          console.log(values);
          const headers = values[0];
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          setSheetData(jsonData);
          setFilteredData(jsonData);
        })
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    const getUserEmail = () => {
      const authInstance = window.gapi.auth2.getAuthInstance();
      if (authInstance.isSignedIn.get()) {
        const currentUser = authInstance.currentUser.get();
        const basicProfile = currentUser.getBasicProfile();
        const email = basicProfile.getEmail();
        setUserEmail(email);
      }
    };

    loadGoogleAPI();
  }, []);

  sheetData.map((item, index) => {
    console.log("b", item);
    let Java_Score = 0;
    let Operating_System_Score = 0;
    let Javascript_Score = 0;
    let React_Score = 0;

    let ma_order = JSON.parse(process.env.REACT_APP_MA_ORDER);
    let ma_answers = JSON.parse(process.env.REACT_APP_MA_ANSWERS);

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
        if (ma_order.map((item) => parseInt(item)).includes(i - 2)) {
          if (typeof ma_answers[ma_order.indexOf(i - 2)] === "string") {
            if (
              item[_].toLowerCase() ===
              ma_answers[ma_order.indexOf(i - 2)].toLowerCase()
            ) {
              Operating_System_Score += 1;
            }
          } else {
            if (parseInt(item[_]) === ma_answers[ma_order.indexOf(i - 2)]) {
              Operating_System_Score += 1;
            }
          }
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

    item.id = index + 1; // Add the "id" key with the value of the current index plus 1
    item.Score =
      (
        Java_Score +
        Operating_System_Score +
        Javascript_Score +
        React_Score
      ).toString() +
      "/" +
      JSON.parse(process.env.REACT_APP_NO_OF_QUESTIONS);
    item.Java_Score = Java_Score;
    item.Operating_System_Score = Operating_System_Score;
    item.Javascript_Score = Javascript_Score;
    item.React_Score = React_Score;
  });

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

  const handleSignIn = () => {
    const authInstance = window.gapi.auth2.getAuthInstance();
    authInstance.signIn().catch((error) => {
      if (error.error === "popup_closed_by_user") {
        // Handle the canceled sign-in process
      } else {
        console.error("Error signing in with Google", error);
        // Handle other sign-in errors
      }
    });
  };
  const handleFilter = () => {
    const filtered = sheetData.filter((item) => {
      const itemDate = new Date(item.Timestamp);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return itemDate >= start && itemDate <= end;
    });
    setFilteredData(filtered);
  };

  const handleSignOut = () => {
    const authInstance = window.gapi.auth2.getAuthInstance();
    authInstance.signOut();
  };

  return (
    <div>
      <Navbar />
      <div>
        <p>
          {isSignedIn ? (
            <span className='display-between'>
              Email : {userEmail}{" "}
              <button onClick={handleSignOut}>Sign Out</button>
            </span>
          ) : (
            <div className='display-column'>
              <h2>Login With Google</h2>
              <button onClick={handleSignIn}>Sign In with Google</button>
            </div>
          )}
        </p>
      </div>
      {isSignedIn && sheetData.length > 0 && (
        <div>
          <div className='display-center'>
            <div className='display-between'>
              Start Date:{" "}
              <input
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            {"    "}
            <div>
              End Date:{" "}
              <input
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <button onClick={handleFilter}>Filter</button>
          </div>
          <div>
            {Array.isArray(sheetData) && filteredData.length > 0 ? (
              <StudentsTable data={sheetData} />
            ) : (
              <div>No data available</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GetStudentsDetails;
