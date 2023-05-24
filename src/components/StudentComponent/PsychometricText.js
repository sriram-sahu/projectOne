import React from "react";
import Navbar from "../design/Navbar";

const PsychoMetricText = () => {
  return (
    <div>
      <Navbar />
      <div className='details-container'>
        <div>
          <div>
            <iframe
              src='https://docs.google.com/forms/d/e/1FAIpQLSdFjj1yaEfqFu0RbZkcDf8D3E92LJyZCYGtBlzURhEdXmPvvQ/viewform?embedded=true'
              width='640'
              height='5154'
            >
              Loading…
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsychoMetricText;
