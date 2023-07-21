// Test Component used to get the google form to take the test
import React, { useState } from "react";
import Footer from "../Footer/Footer";
import "./index.css";

const Test = () => {
  const [cursor, setCursor] = useState("default");
  const changeCursor = () => {
    setCursor((prevState) => {
      return "default";
    });
  };
  return (
    <div
      className="test-container"
      onClick={changeCursor}
      style={{ cursor: cursor }}
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
      <div className="details-container">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSc6Awak0_3NAajQr7wKL2Rs_Uchp6wbmzQSmeiobQHPoe0idg/viewform?embedded=true"
          title="test"
        >
          Loading…
        </iframe>
      </div>
      <div style={{width:'100%'}}>
      <Footer />
      </div>
    </div>
  );
};

export default Test;
