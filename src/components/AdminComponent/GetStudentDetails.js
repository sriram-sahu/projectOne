import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import "./index.css";
import StudentsTable from "./StudentsTable";
const SCOPES = process.env.REACT_APP_SCOPE;

const GetStudentsDetails = () => {
  const [sheetData, setSheetData] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [filteredData, setFilteredData] = useState(sheetData);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [scores, setScores] = useState({
    java: 0,
    react: 0,
    js: 0,
    ma: 0,
  });
  const [streams, setStreams] = useState({
    interests: 0,
    aptitude: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadGoogleAPI = () => {
      const script = document.createElement("script");
      script.src = process.env.REACT_APP_SCRIPT_SRC;
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
          ], // don't write this in env file
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

  const fetchingData = () => {
    let java = 0;
    let ma_order = JSON.parse(process.env.REACT_APP_MA_ORDER);
    let ma_answers = JSON.parse(process.env.REACT_APP_MA_ANSWERS);
    let js = 0;
    let javapercentage = 0;
    let Napercentage = 0;
    let jsPercentage = 0;
    let reactPercentage = 0;
    let mentalability = 0;
    let react_score = 0;
    sheetData.map((item, index) => {
      Object.keys(item).map((score, i) => {
        if (i > 2) {
          if (
            item[score] === "TRUE" &&
            JSON.parse(process.env.REACT_APP_JAVASCRIPT_ORDER)
              .map((item) => parseInt(item))
              .includes(i - 2)
          ) {
            java += 1;
            javapercentage = (java / sheetData.length / 5) * 100;
          }
          if (ma_order.map((item) => parseInt(item)).includes(i - 2)) {
            if (typeof ma_answers[ma_order.indexOf(i - 2)] === "string") {
              if (
                item[score].toLowerCase() ===
                ma_answers[ma_order.indexOf(i - 2)].toLowerCase()
              ) {
                mentalability += 1;
              }
            } else {
              if (
                parseInt(item[score]) === ma_answers[ma_order.indexOf(i - 2)]
              ) {
                mentalability += 1;
              }
              Napercentage = (mentalability / sheetData.length / 5) * 100;
            }
          }
          if (
            item[score] === "TRUE" &&
            JSON.parse(process.env.REACT_APP_JAVASCRIPT_ORDER)
              .map((item) => parseInt(item))
              .includes(i - 2)
          ) {
            js += 1;
            jsPercentage = (js / sheetData.length / 5) * 100;
          }
          if (
            item[score] === "TRUE" &&
            JSON.parse(process.env.REACT_APP_REACT_ORDER)
              .map((item) => parseInt(item))
              .includes(i - 2)
          ) {
            react_score += 1;
            reactPercentage = (react_score / sheetData.length / 5) * 100;
          }
        }
      });
    });
    setScores({
      ...scores,
      java: javapercentage,
      react: reactPercentage,
      ma: Napercentage,
      js: jsPercentage,
    });
    setStreams({
      ...streams,
      interests: (javapercentage + reactPercentage + jsPercentage) / 3,
      aptitude: Napercentage,
    });
    //
  };
  useEffect(() => {
    fetchingData();
  }, [sheetData]);

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
      end.setDate(end.getDate() + 1); // Added one day to the end date
      return itemDate >= start && itemDate <= end;
    });
    setFilteredData(filtered);
  };

  const handleSignOut = () => {
    const authInstance = window.gapi.auth2.getAuthInstance();
    authInstance.signOut();
  };

  const pieData = [
    {
      name: "Java",
      value: scores.java,
    },
    {
      name: "React",
      value: scores.react,
    },
    {
      name: "JavaScript",
      value: scores.js,
    },
    {
      name: "Mental Ability",
      value: scores.ma,
    },
  ];
  const pieData1 = [
    {
      name: "Interests",
      value: streams.interests,
    },
    {
      name: "Aptitude",
      value: streams.aptitude,
    },
  ];
  const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];
  const COLORS1 = ["#8884d8", "#82ca9d"];

  return (
    <div>
      <div>
        <p>
          {isSignedIn ? (
            <>
              <span className='display-between'>
                Email : {userEmail}{" "}
                <button onClick={handleSignOut}>Sign Out</button>
              </span>
            </>
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "20px",
            }}
          >
            <PieChart width={730} height={300}>
              <Pie
                data={pieData}
                color='#000000'
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                outerRadius={120}
                fill='#8884d8'
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            <PieChart width={730} height={300}>
              <Pie
                data={pieData1}
                color='#000000'
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                outerRadius={120}
                fill='#8884d8'
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS1[index % COLORS1.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
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
              <StudentsTable data={filteredData} />
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
