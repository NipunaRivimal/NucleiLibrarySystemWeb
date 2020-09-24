import axios from "axios";

export const getAllBooksAction = () => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .get("http://localhost:8081/books/getallbooks")
      .then((respose) => {
        dispatch({ type: "GET_BOOKS", payload: respose.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getBorrowedBooksAction = (status) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .get(`http://localhost:8081/books/getselectedbooks/${status}`)
      .then((respose) => {
        dispatch({ type: "GET_BOOKS", payload: respose.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
