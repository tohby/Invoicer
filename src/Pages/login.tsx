import React, { useState } from "react";
import logo from "../logo.svg";
import { Eye, EyeOff } from "react-feather";
import { useForm } from "react-hook-form";

const login = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="d-flex justify-content-center align-items-center h-100 w-100 m-auto login">
      <div className="col-lg-3">
        <div className="text-center">
          <img src={logo} alt="Invoicer logo" className="logo mb-4" />
        </div>
        <div className="card border-0 shadow-sm p-3">
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type={visible ? "text" : "password"}
                    className="form-control"
                  />
                  <span className="input-group-text bg-transparent">
                    <button
                      className="btn"
                      type="button"
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </span>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-dark">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
