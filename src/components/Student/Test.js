// Test Component used to get the google form to take the test
import React, { useState } from "react";
import Footer from "../Footer/Footer";
import "./index.css";

const Text = () => {
  const [cursor, setCursor] = useState("default");
  const changeCursor = () => {
    setCursor((prevState) => {
      return "default";
    });
  };

  return (
    <div onClick={changeCursor} style={{ cursor: cursor }}>
      <div className="pdf-headerr">
        {/* logo and after clicking this logo, it'll navigates to home route*/}
        <div className="">
          <img
            src="https://res.cloudinary.com/de5cu0mab/image/upload/v1688971136/Logo_Final_uovjgi.png"
            alt="logo"
            className="logo"
            style={{ height: "90px", width: "140px", marginLeft: "23px" }}
          />
          <br />
        </div>
        <h1 style={{ alignSelf: "center" }}>Study Global</h1>
        <div style={{ alignSelf: "center" }}>
          <p>
            <b>email : </b>
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
      <Footer />
    </div>
  );
};

export default Text;
