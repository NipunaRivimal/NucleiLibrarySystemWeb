import React, { useEffect } from "react";
import "./Navbar.css";
import { Nav, Button, Row, Col } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { refreshLoginAction, logoutAction } from "../pages/AuthStore/action";

const Navbar = () => {
  const login = useSelector((state) => state.auth.loginStatus);
  const members = useSelector((state) => state.auth.members);
  const dispatch = useDispatch();
  const refreshLogin = (user) => dispatch(refreshLoginAction(user));
  const userLogout = () => dispatch(logoutAction());

  useEffect(() => {
    storeCollector();
  }, []);

  const storeCollector = () => {
    let store = JSON.parse(localStorage.getItem("login"));
    if (store && store.login) {
      refreshLogin(store);
    }
  };

  const onLogout = (e) => {
    userLogout();
    localStorage.removeItem("login");
  };

  return (
    <div>
      <div className="header">
        <Row>
          <Col lg={4} md={12} xs={12}>
            <div className="item">
              <div style={{ alignSelf: "flex-start", marginLeft: "10px" }}>
                {members && "Hi " + members.firstname + "!"}
              </div>
            </div>
          </Col>
          <Col lg={4} md={12} xs={12}>
            <div className="item">
              <h3>Luck's Library</h3>
            </div>
          </Col>
          <Col lg={4} md={12} xs={12}>
            <div className="item">
              <div style={{ alignSelf: "flex-end", marginRight: "10px" }}>
                {login ? (
                  <a href="/">
                    <Button variant="outline-dark" onClick={onLogout}>
                      Log out
                    </Button>
                  </a>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Navbar;
