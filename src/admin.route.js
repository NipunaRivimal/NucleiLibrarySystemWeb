import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export const AdminRoute = ({ component: Component, ...props }) => {
  const login = useSelector((state) => state.auth.loginStatus);
  const members = useSelector((state) => state.auth.members);
  const history = useHistory();
  return (
    <Route
      {...props}
      render={(props) => {
        if (login && members.usertype == "admin") {
          // if user authenticate return component that user requests
          return <Component {...props} />;
        } else {
          // return same page if user not authenticated for requested route
          return <Redirect to={{ pathname: history.replace() }} />;
        }
      }}
    />
  );
};
