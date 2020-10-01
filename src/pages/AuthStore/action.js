import axios from "axios";

export const loginAction = (userCredintials) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .post("http://localhost:8081/auth/login", userCredintials)
      .then((respose) => {
        if (respose.data.status === 200) {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: respose.data.data,
          });
          localStorage.setItem(
            "login",
            JSON.stringify({
              login: true,
              userid: respose.data.data.userid,
              usertype: respose.data.data.usertype,
              firstname: respose.data.data.firstname,
              _id: respose.data.data._id,
              token: respose.data.token,
            })
          );
        } else if (respose.data.status === 600 || respose.data.status === 601) {
          dispatch({ type: "LOGIN_FAIL", payload: respose.data.message });
        } else {
          dispatch({
            type: "LOGIN_FAIL",
            payload: "Something wrong! Please try again.",
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: "LOGIN_FAIL",
          payload: "Something wrong! Please try again.",
        });
      });
  };
};

export const refreshLoginAction = (user) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    dispatch({ type: "REFRESH_LOGIN", payload: user });
  };
};

export const logoutAction = (user) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    dispatch({ type: "LOGOUT" });
  };
};
