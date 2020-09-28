const initialState = {
  members: null,
  loading: false,
  loginStatus: "",
  userType: "",
  errors: "",
};

const authReducer = (state = initialState, Action) => {
  switch (Action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        members: Action.payload,
        loading: false,
        loginStatus: "success",
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        loading: false,
        loginStatus: "fail",
      };
    default:
      return state;
  }
};

export default authReducer;
