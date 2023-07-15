// Chart component is about score card design,downloading score card,sending scores to student through emails including cc
// import react, jspdf, @emailjs/browser, react-bootstrap, react-to-print, react-router-dom, recharts and css files index.css, bootstrap/dist/css/bootstrap.min.css to render chart component
import React, { useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import jsPDF from "jspdf";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import emailjs from "@emailjs/browser";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Footer from "../Footer/Footer";
import { useReactToPrint } from "react-to-print";
import { useLocation, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./index.css";

function Chart() {
  // detailsPdf is a useref hook used to persist values between renders
  const detailsPdf = useRef();
  // location varaiable to get location of the studentChart route and state
  const location = useLocation();
  // navigate variable used to naviagating to different routes
  const navigate = useNavigate();
  // useState of data to store the stream recommendation test data responses
  const [data, setData] = useState(location.state);
  // mailId usestate to store cc mail id's
  const [mailId, setMailId] = useState(null);
  // isOpen usestate to store boolean values to open or close modal
  const [isOpen, setIsOpen] = useState(false);
  // colors for piechart
  const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];
  // aptitude score of all streams
  const aptitude_score =
    data.humanities_aptitude_score +
    data.commerce_aptitude_score +
    data.science_bio_aptitude_score +
    data.science_math_aptitude_score;
  // interest score of all streams
  const interests_score =
    data.humanities_interests_score +
    data.commerce_interests_score +
    data.science_bio_interests_score +
    data.science_math_interests_score;
  // pieData is pie chart Data of stream recommendation test aptitude and interst scores
  let pieData = [
    {
      name: "Aptitude",
      value: aptitude_score,
    },
    {
      name: "Interests",
      value: interests_score,
    },
  ];

  // generatePdf function used to generate the pdf which includes student details along with all streams aptitude and interest scores piechart when clicking on the download button in the component
  const generatePdf = useReactToPrint({
    content: () => detailsPdf.current,
    documentTitle: data.Email_Address.slice(0, data.Email_Address.indexOf("@")),
    onAfterPrint: () => alert("pdf downloaded"),
  });
  // handle Submit function used to sent email to students regarding candidate details and scores through email
  const handleSubmit = (item) => {
    data.new_Mail = item;
    data.aptitude_score = aptitude_score;
    data.interests_score = interests_score;
    emailjs
      .send(
        "service_ymf4cxn",
        "template_r90aam3",
        {
          ...data,
        },
        "l586GhABgihjc8ccg"
      )
      .then((result) => {
        console.log("Email sent successfully:", result.text);
        alert(`Email sent to ${data.Email_Address}`);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };
  // sendMail function used to set boolean value of isOpen variable
  const sendMail = (data) => {
    setIsOpen(!isOpen);
  };
  // handleClose function used to set boolean value of isOpen variable
  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  const onClickSendManually = (data) => {
    console.log(data);
    const subject = "Stream Recommendation Test Score Details"; // email subject
    const body = `Dear ${data.Full_Name},%0D%0A %0D%0A     Hope you are doing well. Your Strem Recommendation Test submission was successful. Here is your test score. We will share the detailed score report and discuss the stream that is best suited for you over a call. %0D%0A %0D%0AYour Stream Recommendation Test Scores: %0D%0A %0D%0A`; // email  body
    window.location.href = `mailto:${data.Email_Address}?cc=${data.Parent_Email_Id}&subject=${subject}&body=${body}`;
  };

  return (
    // chart container with student, piechart, download and send email button
    <div>
      <div className='chart-container'>
        {/* header for desktop  with Logo and components Dashboard, Assessments, Test Reports, Student Reports and Admin */}
        <div className='admin-header-container'>
          <div className='admin-header-logo-container'>
            {/* logo */}
            <img
              src='https://res.cloudinary.com/de5cu0mab/image/upload/v1688971136/Logo_Final_uovjgi.png'
              alt='logo'
              className="logo"
              onClick={() => navigate("/")}
            />
            <h6 className="test-heading">Stream Recommendation Test</h6>
          </div>
          <div className='admin-desktop-header-navbar-container'>
            {/* when clicking this Home text, it'll navigates to home route*/}
            <p
              className='admin-desktop-header-navbar-link'
              onClick={() => navigate("/")}
            >
              Home
            </p>
            {/* when clicking this Admin text, it'll navigates to admin login route and again admin can access all routes */}
            <p
              className='admin-desktop-header-navbar-link'
              onClick={() => navigate("/adminLogin")}
            >
              Admin
            </p>
          </div>
          {/* nav header for mobile  with Logo and components Dashboard, Assessments, Test Reports, Student Reports and Admin */}
          <div className='admin-mobile-header-navbar-container'>
            <Popup
              contentStyle={{
                width: "70%",
                backgroundColor: "white",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "content",
                alignItems: "center",
              }}
              trigger={
                <button className='admin-hamburger-btn'>
                  <GiHamburgerMenu />
                </button>
              }
              position='bottom right'
            >
              <ul className='admin-mobile-hamburger-menu'>
                {/* when clicking this Home text, it'll navigates to home route*/}
                <li
                  onClick={() => navigate("/")}
                  className='admin-header-navbar-link'
                >
                  Home
                </li>
                {/* when clicking this Admin text, it'll navigates to admin login route and again admin can access all routes */}
                <li
                  onClick={() => navigate("/adminLogin")}
                  className='admin-header-navbar-link'
                >
                  Admin
                </li>
              </ul>
            </Popup>
          </div>
        </div>
        {/* student details and piechart */}
        <div ref={detailsPdf} className='charts'>
          <div className='details'>
            <h1 style={{ fontSize: "30px", fontWeight: "bold" }}>
              Student Details:
            </h1>
            <p>Name : {data.Full_Name}</p>
            <p>Test Completed On : {data.Timestamp}</p>
            <p>Email : {data.Email_Address}</p>
            <p>Phone Number : {data.Phone_Number}</p>
            <p>Parent Email Id: {data.Parent_Email_Id}</p>
            <p>Parent Phone Number :{data.Parent_Phone_Number}</p>
            <p>Total Score : {data.Score}</p>
            <p>
              Aptitude Score :{" "}
              {data.humanities_aptitude_score +
                data.commerce_aptitude_score +
                data.science_bio_aptitude_score +
                data.science_math_aptitude_score}
            </p>
            <p>
              Interests Score :{" "}
              {data.humanities_interests_score +
                data.commerce_interests_score +
                data.science_bio_interests_score +
                data.science_math_interests_score}
            </p>
          </div>
          <div>
            <PieChart width={280} height={280}>
              <Pie
                data={pieData}
                color='#000000'
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                outerRadius={100}
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
          </div>
        </div>
        {/* download, send email and view Data buttons  */}
        <div className='button-container'>
          {/* download button to download the score card */}
          <button
            type='button'
            style={{
              backgroundColor: "#004461",
            }}
            className='send'
            onClick={generatePdf}
          >
            Download Score
          </button>
          {/* send email button to send the score card through email*/}
          <button
            style={{
              backgroundColor: "darkgrey",
            }}
            onClick={() => sendMail(data)}
            className='send'
          >
            Send Email
          </button>
          {/* clicking view Data button to navigate to studentBarChart route*/}
          <button
            style={{ backgroundColor: "#ED2B2A" }}
            onClick={() => navigate("/studentBarChart", { state: data })}
            className='send'
          >
            View Details
          </button>
          <button
            style={{
              backgroundColor: "#004461",
            }}
            className='send'
            onClick={() => onClickSendManually(data)}
          >
            Send Manually
          </button>
        </div>
        {/* react-bootstrap modal for including cc */}
        <Modal show={isOpen} onRequestClose={handleClose} className='modal'>
          <Modal.Header closeButton onClick={handleClose}>
            <Modal.Title>Email Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Student Mail ID: </Form.Label>
              <Form.Control type='text' value={data.Email_Address} />
            </Form.Group>
            <Form.Group>
              <Form.Label>CC Mail ID's: </Form.Label>
              <Form.Control
                type='text'
                value={mailId}
                onChange={(e) => setMailId(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button
              style={{
                backgroundColor: "#111359",
                marginTop: "-7px",
                color: "white",
                padding: "3px",
              }}
              variant='primary'
              type='submit'
              onClick={() => {
                handleSubmit(mailId);
                setIsOpen(!isOpen);
              }}
            >
              Send Email
            </button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </div>
  );
}

export default Chart;
