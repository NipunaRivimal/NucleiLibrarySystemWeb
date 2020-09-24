const initialState = {
  books: [],
  loading: false,
  errors: "",
};

const booksReducer = (state = initialState, Action) => {
  switch (Action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "GET_ALL_BOOKS":
      return {
        ...state,
        books: Action.payload,
        loading: false,
      };
    case "GET_SELECTED_BOOKS":
      return {
        ...state,
        books: Action.payload,
        loading: false,
      };
    case "ADD_BOOK":
      return {
        ...state,
        books: Action.payload,
        loading: false,
      };
    case "DELETE_BOOK":
      return {
        ...state,
        news: Action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default booksReducer;
