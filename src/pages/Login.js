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

  //   const onSubmitHadler = () => {
  //     userLogin({
  //       email: email,
  //       password: password,
  //     });
  //   };

  function submit() {
    userLogin({
      email: values.email,
      password: values.password,
    });
  }

  if (member && member.usertype == "member") {
    return <Redirect to={`/borrowedbooks/${member._id}`} />;
  }

  if (member && member.usertype == "admin") {
    return <Redirect to="/allbooks" />;
  }

  return (
    <div className="page-content">
      <div>
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
            // onChange={(event) => setEmail(event.target.value)}
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
            name="password"
            value={values.password}
            // onChange={(event) => setPassword(event.target.value)}
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
      </div>
    </div>
  );
};

export default Login;
