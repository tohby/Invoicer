import React from "react";
import logo from "../logo.svg";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  return (
    <nav
      className={`navbar bg-white border-bottom ${
        location.pathname === "/login" ? "d-none" : ""
      }`}
    >
      <div className="container-fluid px-5">
        <span className="navbar-brand">
          <img src={logo} alt="Invoicer logo" className="me-2" /> Invoicer
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
