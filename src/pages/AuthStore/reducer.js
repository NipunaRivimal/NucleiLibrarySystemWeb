const initialState = {
  members: null,
  loading: false,
  loginStatus: false,
  userType: "",
  loginErrors: "",
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
        loginStatus: true,
        // userType: Action.payload,
        loading: false,
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        loading: false,
        loginErrors: Action.payload,
      };
    case "REFRESH_LOGIN":
      return {
        ...state,
        loginStatus: Action.payload.login,
        userType: Action.payload.userType,
        members: Action.payload,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        members: null,
        loginStatus: false,
        userType: "",
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
