import React, { useEffect } from "react";
import "./Navbar.css";
import { Nav } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { refreshLoginAction, logoutAction } from "../pages/AuthStore/action";

const Navbar = () => {
  const login = useSelector((state) => state.auth.loginStatus);
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
    localStorage.clear();
  };
  // if (!login) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <div>
      <div className="header">
        <h3>Luck's Library</h3>
        {login ? <button onClick={onLogout}>Log out</button> : ""}
      </div>
    </div>
  );
};

export default Navbar;
