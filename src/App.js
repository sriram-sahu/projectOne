import { BrowserRouter, Routes, Route } from "react-router-dom";
import PsychoMetricText from "./components/StudentComponent/PsychometricText";
import StudentProfile from "./components/AdminComponent/StudentProfile";
import TestInstructions from "./components/StudentComponent/TestInstructions";
import GetStudentsDetails from "./components/AdminComponent/GetStudentDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TestInstructions />} />
        <Route path='/startText' element={<PsychoMetricText />} />
        <Route path='/AdminLogin' element={<GetStudentsDetails />} />
        <Route path='/studentProfile' element={<StudentProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
