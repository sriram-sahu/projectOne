// Test Component used to get the google form to take the test
import React from "react";
import "./index.css";

const Text = () => {
  return (
    <div>
      <div className="details-container">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSc6Awak0_3NAajQr7wKL2Rs_Uchp6wbmzQSmeiobQHPoe0idg/viewform?embedded=true"
          title="test"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
};

export default Text;
