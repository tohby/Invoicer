import React, { useState } from "react";
import logo from "../logo.svg";
import { Eye, EyeOff } from "react-feather";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { auth } from "../Services";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { ILoginForm } from "../Interface";

const Login = () => {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("dung+octopus4@101digital.io");
  const [password, setPassword] = useState("Abc@123456");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "dung+octopus4@101digital.io",
      password: "Abc@123456",
    },
    onSubmit: async (values: { password: any; email: any }) => {
      loginMutation.mutate({
        username: email,
        password,
      });
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must contain at least 8 characters, one uppercase letter, one special symbol such as @ and a number"
        )
        .required("Required"),
    }),
  });

  const loginMutation = useMutation(auth, {
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("org_token", data.data.memberships[0].token);
      history.push("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center h-100 w-100 m-auto login">
      <div className="col-lg-3">
        <div className="text-center">
          <img src={logo} alt="Invoicer logo" className="logo mb-4" />
        </div>
        <div className="card border-0 shadow-sm p-3">
          <div className="card-body">
            {loginMutation.isError ? (
              <>An error occurred: {loginMutation.error}</>
            ) : null}
            <form name={"sign-in"} onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={(formik.values && formik.values.email) ?? ""}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.email}.
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <input
                    id="password"
                    type={visible ? "text" : "password"}
                    className="form-control"
                    value={(formik.values && formik.values.password) ?? ""}
                    onChange={formik.handleChange}
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
                {formik.errors.password && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.password}.
                  </div>
                )}
              </div>
              <div className="text-success">
                Please wait, we are verifying your identity.
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className={`btn btn-dark ${loginMutation.isLoading}`}
                >
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

export default Login;
