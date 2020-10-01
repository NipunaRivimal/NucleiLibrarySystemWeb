import React, { useState } from "react";
import { InputGroup, FormControl, Button, Alert } from "react-bootstrap";
import "./Login.css";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "./AuthStore/action";
import { Redirect } from "react-router-dom";
import useLoginForm from "../customHooks/useLoginForm";
import validateLogin from "../customFunctions/validateLogin";

const Login = () => {
  const { handleChange, handleSubmit, values, errors } = useLoginForm(
    submit,
    validateLogin
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const member = useSelector((state) => state.auth.members);
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const loginErrors = useSelector((state) => state.auth.loginErrors);
  const dispatch = useDispatch();
  const userLogin = (userCredintials) => dispatch(loginAction(userCredintials));

  function submit() {
    userLogin({
      email: values.email,
      password: values.password,
    });
  }

  //check logged user type , if member redirect to borrowed books page
  if (member && member.usertype == "member") {
    return <Redirect to={`/borrowedbooks/${member._id}`} />;
  }

  //check logged user type , if admin redirect to allbook page
  if (member && member.usertype == "admin") {
    return <Redirect to="/allbooks" />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <div>
        <form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </InputGroup>
          {errors.email && <Alert variant="danger">{errors.email}</Alert>}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
          </InputGroup>
          {errors.password && <Alert variant="danger">{errors.password}</Alert>}
          {!loginStatus && loginErrors && (
            <Alert variant="danger">{loginErrors}</Alert>
          )}
          <Button
            variant="outline-success"
            style={{ width: "100%" }}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
