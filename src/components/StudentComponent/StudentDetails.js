import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

import MyContext from "../../context/context";

const StudentDetails = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { getDetails } = React.useContext(MyContext);

  const navigate = useNavigate();
  const onSubmitDetails = (event) => {
    event.preventDefault();
    if (name === "") {
      setErrorMsg("Enter Name");
    } else if (email === "") {
      setErrorMsg("Enter Email");
    } else if (phoneNo.length < 10) {
      setErrorMsg("Enter Valid Mobile No");
    } else {
      setErrorMsg("");
      getDetails([{ name, email, phoneNo }]);
      navigate("/startText");
    }
  };
  return (
    <div>
      <div className='details-container'>
        <form className='forms-container' onSubmit={onSubmitDetails}>
          <h1 className='heading'>Enter Your Details</h1>
          <div className='form-floating mb-3'>
            <input
              type='text'
              className='form-control'
              id='Name'
              placeholder='Enter Your Name'
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <label htmlFor='Name'>Enter Name</label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='email'
              className='form-control'
              id='Email'
              placeholder='Enter Your Email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor='Email'>Email address</label>
          </div>
          <div className='form-floating'>
            <input
              type='number'
              className='form-control'
              id='number'
              placeholder='Enter Phone No'
              value={phoneNo}
              onChange={(event) => setPhoneNo(event.target.value)}
            />
            <label htmlFor='Number'>Mobile No</label>
          </div>
          <div>{errorMsg !== "" && <p className='error'> *{errorMsg}</p>}</div>
          <button type='submit' className='btn btn-primary my-3'>
            Start Text
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentDetails;
