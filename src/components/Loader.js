import React from "react";
import { Spinner } from "react-bootstrap";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <div>
        <Spinner animation="border" />
      </div>
    </div>
  );
};

export default Loader;
