import React, { useState } from "react";
import { InputGroup, FormControl, Button, Alert } from "react-bootstrap";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
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
      <div style={{ width: "20%" }}>
        <Input
          size="large"
          placeholder="Email"
          prefix={<UserOutlined />}
          name="email"
          value={values.email}
          onChange={handleChange}
          style={{ marginBottom: "15px", minWidthidth: "100%" }}
        />

        {errors.email && <Alert variant="danger">{errors.email}</Alert>}

        <Input.Password
          size="large"
          placeholder="Password"
          prefix={<LockOutlined />}
          name="password"
          value={values.password}
          onChange={handleChange}
          style={{ marginBottom: "15px", minWidth: "100%" }}
        />
        {errors.password && (
          <Alert variant="danger" style={{ minWidth: "100%" }}>
            {errors.password}
          </Alert>
        )}
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
        {/* </form> */}
      </div>
    </div>
  );
};

export default Login;
