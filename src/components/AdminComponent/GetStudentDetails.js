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
          console.log(jsonData, "json");
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

    item.id = index + 1;
    item.Score = (
      Java_Score +
      Operating_System_Score +
      Javascript_Score +
      React_Score
    ).toString();
    item.Java_Score = Java_Score;
    item.Operating_System_Score = Operating_System_Score;
    item.Javascript_Score = Javascript_Score;
    item.React_Score = React_Score;
  });

  const handleSignIn = () => {
    const authInstance = window.gapi.auth2.getAuthInstance();
    authInstance.signIn().catch((error) => {
      if (error.error === "popup_closed_by_user") {
        console.error("Popup Closed By the User", error);
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
              <button onClick={handleSignIn} className='google-signin-button'>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                  alt='Google Logo'
                />
                Sign In with Google
              </button>
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
