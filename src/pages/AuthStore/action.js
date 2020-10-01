import axios from "axios";

export const loginAction = (userCredintials) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .post("http://localhost:8081/auth/login", userCredintials)
      .then((respose) => {
        if (respose.data.status === 200) {
          //set states to success login and save token to local storage
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
          //set states to login fail
          //status 600 - password doesnt match
          //status 601 - no user found
          dispatch({ type: "LOGIN_FAIL", payload: respose.data.message });
        } else {
          //set states to login fail
          dispatch({
            type: "LOGIN_FAIL",
            payload: "Something wrong! Please try again.",
          });
        }
      })
      .catch((error) => {
        //set states to login fail
        dispatch({
          type: "LOGIN_FAIL",
          payload: "Something wrong! Please try again.",
        });
      });
  };
};

//when page refresh get user details from locally saved token and set them to state
export const refreshLoginAction = (user) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    dispatch({ type: "REFRESH_LOGIN", payload: user });
  };
};

//set states to log out
export const logoutAction = (user) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    dispatch({ type: "LOGOUT" });
  };
};
