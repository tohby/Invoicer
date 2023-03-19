import React from "react";
import logo from "../logo.svg";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const navs = [
    { id: "Home", active: false, disabled: true },
    { id: "Projects", active: false, disabled: true },
    { id: "Clients", active: false, disabled: true },
    { id: "Invoices", active: true, disabled: false },
  ];
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
        <ul className="nav mx-auto nav-pills">
          {navs.map((nav, i) => {
            return (
              <li className="nav-item" key={i}>
                <button
                  type="button"
                  className={`nav-link ${
                    nav.active ? "bg-primary-subtle" : ""
                  } `}
                  disabled={nav.disabled}
                >
                  {nav.id}
                </button>
              </li>
            );
          })}
        </ul>
        <span className="rounded-circle bg-dark text-white p-2">OA</span>
      </div>
    </nav>
  );
};

export default Navbar;
