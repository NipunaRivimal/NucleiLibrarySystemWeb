import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import "./Login.css";

const Login = () => {
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
          />
        </InputGroup>
        <Button variant="outline-success" style={{ width: "100%" }}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
