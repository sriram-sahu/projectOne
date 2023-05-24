import React from "react";
import "./index.css";

const Navbar = () => {
  return (
    <div>
      <nav
        className='navbar '
        data-bs-theme='white'
        style={{ backgroundColor: "rgb(248, 218, 179)" }}
      >
        <div className='container-fluid'>
          <a className='navbar-brand'></a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
