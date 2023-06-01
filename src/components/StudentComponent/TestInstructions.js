import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const TestInstructions = () => {
  const [agreed, setAgreed] = useState(false);

  const navigate = useNavigate();

  const handleAgreeChange = () => {
    setAgreed(!agreed);
  };

  const handleStartTest = () => {
    if (agreed) {
      navigate("/startText");
    } else {
      // Display an error message or prevent starting the test
      console.log("Please agree to the instructions before starting the test.");
    }
  };

  return (
    <div>
      <div className='test-instructions'>
        <div>
          <h2>Online Test Instructions</h2>
          <div className='instruction-container'>
            <h1>Instructions</h1>
            <p className='instructions'>
              Ensure you have a stable internet connection throughout the test.
              <br />
              Use a desktop or laptop computer for the best experience. Mobile
              devices are not recommended.
              <br />
              Close any unnecessary applications or tabs on your computer.
              <br />
              Answer each question to the best of your ability.
              <br />
              If you encounter any technical issues during the test, notify your
              instructor immediately.
              <br />
              Once you have completed the test, carefully review your answers
              before submitting.
              <br />
              Click on the "Submit" button only when you are ready to finalize
              your test.
              <br />
              After submission, you may not be able to make any changes or
              revisit the test.
              <br /> If you have any questions or encounter any issues, reach
              out to your instructor immediately.
            </p>
            <h1>Good luck! </h1>
          </div>
          <label>
            <input
              type='checkbox'
              checked={agreed}
              onChange={handleAgreeChange}
            />
            I agree to the test instructions
          </label>
          <button
            className='btn btn-primary my-3 m-3'
            onClick={handleStartTest}
            disabled={!agreed}
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestInstructions;
