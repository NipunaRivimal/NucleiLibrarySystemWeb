import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import "./Login.css";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "./AuthStore/action";
import { Redirect } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const member = useSelector((state) => state.auth.members);
  const dispatch = useDispatch();
  const userLogin = (userCredintials) => dispatch(loginAction(userCredintials));

  const onSubmitHadler = () => {
    userLogin({
      email: email,
      password: password,
    });
  };

  if (member && member.usertype == "member") {
    return <Redirect to="/allmembers" />;
  }

  if (member && member.usertype == "admin") {
    return <Redirect to="/allbooks" />;
  }

  return (
    <div className="page-content">
      <div>
        {member ? <h4>Hi {member.email}</h4> : <h4>No</h4>}
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </InputGroup>
        <Button
          variant="outline-success"
          style={{ width: "100%" }}
          onClick={onSubmitHadler}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
