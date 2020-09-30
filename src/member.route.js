import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export const MemberRoute = ({ component: Component, ...props }) => {
  const login = useSelector((state) => state.auth.loginStatus);
  const members = useSelector((state) => state.auth.members);
  const history = useHistory();
  return (
    <Route
      {...props}
      render={(props) => {
        if (login && members.usertype == "member") {
          return <Component {...props} />;
        } else {
          //   return <Redirect to={{ pathname: history.goBack() }} />;
        }
      }}
    />
  );
};
