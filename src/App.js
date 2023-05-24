import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentDetails from "./components/StudentComponent/StudentDetails";
import PsychoMetricText from "./components/StudentComponent/PsychometricText";
import MyContext from "./context/context";
import { useState } from "react";
import ContactUs from "./components/AdminComponent/Sendmail";
import Papaparse from "./components/AdminComponent/studentDetails";
import StudentProfile from "./components/AdminComponent/StudentProfile";

import PrintDetails from "./components/AdminComponent/PrintDetails";
import TestInstructions from "./components/StudentComponent/TestInstructions";
import GetStudentsDetails from "./components/AdminComponent/GetStudentDetails";

function App() {
  const [studentDetails, setStudentDetails] = useState([]);
  const getDetails = (item) => {
    setStudentDetails(item);
  };
  return (
    <MyContext.Provider value={{ getDetails, studentDetails }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TestInstructions />} />
          <Route path='/startText' element={<PsychoMetricText />} />
          <Route path='/ContactUs' element={<ContactUs />} />
          <Route path='/AdminLogin' element={<GetStudentsDetails />} />
          <Route path='/studentProfile' element={<StudentProfile />} />
          <Route path='/printDetails' element={<PrintDetails />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
