import axios from "axios";

export const loginAction = (userCredintials) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .post("http://localhost:8081/auth/login", userCredintials)
      .then((respose) => {
        if (respose.status === 200)
          dispatch({ type: "LOGIN_SUCCESS", payload: respose.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
