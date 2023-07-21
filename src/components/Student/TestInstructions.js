// TestInstructions component used to get test instructions before taking the test
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./index.css";

const TestInstructions = () => {
  // agreed variable usestate to store boolean value of agreed
  const [agreed, setAgreed] = useState(false);

  const [cursor, setCursor] = useState("default");
  const changeCursor = () => {
    setCursor((prevState) => {
      return "default";
    });
  };
  // navigate varaible used to navigating to different paths
  const navigate = useNavigate();
  // handleAgreeChange function to set boolean value of agreed variable
  const handleAgreeChange = () => {
    setAgreed(!agreed);
  };

  // handleStartTest function to check the condition to take the test
  const handleStartTest = () => {
    // if agreed variable is true then it'll navigates to streamRecommendationTest route
    if (agreed) {
      navigate("/streamRecommendationTest");
    } else {
      // Display an error message or prevent starting the test
      console.log("Please agree to the instructions before starting the test.");
    }
  };

  return (
    <div
      onClick={changeCursor}
      style={{ cursor: cursor }}
      className="cont-test-inst"
    >
      <div className="pdf-headerr">
        {/* logo and after clicking this logo, it'll navigates to home route*/}
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/dhbmdoldt/image/upload/v1689847916/Logo_ForDark-BG_tfgmpi.png"
            alt="logo"
            className="logo1"
          />
          <a
            href="http://www.overseaseducation.net"
            target="_blank"
            className="anchor"
          >
            www.overseaseducation.net
          </a>
        </div>
        <h2 className="global-heading">Study Global</h2>
        <div className="self-align">
          <p>
            <br />
            <b>Email : jivanishahina@gmail.com</b>
            <br />
            <b>Phone : </b>9999999999
          </p>
        </div>
      </div>
      <div className="test-instructions">
        <div>
          <div className="instruction-container">
            <h2 className="heading">Online Test Instructions</h2>
            {/* <h1 className="instruction-heading">Instructions</h1> */}
            <ul className="instructions">
              <li>
                Ensure you have a stable internet connection throughout the
                test.
              </li>
              <li>
                Use a desktop or laptop computer for the best experience. Mobile
                devices are not recommended.
              </li>
              <li>
                Close any unnecessary applications or tabs on your computer.
              </li>
              <li>Answer each question to the best of your ability.</li>
              <li>
                Once you have completed the test, carefully review your answers
                before submitting.
              </li>
              <li>
                Click on the "Submit" button only when you are ready to finalize
                your test.
              </li>
              <li>
                After submission, you may not be able to make any changes or
                revisit the test.
              </li>
            </ul>
            <h1 className="good-luck">Good luck! </h1>
          </div>
          <label className="label">
            <input
              type="checkbox"
              checked={agreed}
              onChange={handleAgreeChange}
              style={{ marginRight: "8px" }}
            />
            I agree to the test instructions
          </label>
          <button
            className={agreed ? "start-button" : "not-start-button"}
            onClick={handleStartTest}
            disabled={!agreed}
          >
            Start Test
          </button>
        </div>
      </div>
      <div style={{width:'100%'}}>
      <Footer />
      </div>
    </div>
  );
};

export default TestInstructions;