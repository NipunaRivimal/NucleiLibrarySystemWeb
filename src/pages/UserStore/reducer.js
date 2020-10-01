const initialState = {
  members: [],
  loading: false,
  memberDeleted: false,
  errors: "",
};

const memberReducer = (state = initialState, Action) => {
  switch (Action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "GET_MEMBERS":
      return {
        ...state,
        members: Action.payload,
        loading: false,
        memberDeleted: false,
      };
    case "GET_MEMBERS_ERRORS":
      return {
        ...state,
        loading: false,
      };
    case "GET_SELECTED_MEMBERS":
      return {
        ...state,
        members: Action.payload,
        loading: false,
      };
    case "GET_SINGLE_MEMBER":
      return {
        ...state,
        members: Action.payload,
        loading: false,
      };
    case "ADD_MEMBER":
      return {
        ...state,
        members: Action.payload,
        loading: false,
      };
    case "DELETE_MEMBER":
      return {
        ...state,
        loading: false,
        memberDeleted: true,
      };
    default:
      return state;
  }
};

export default memberReducer;
