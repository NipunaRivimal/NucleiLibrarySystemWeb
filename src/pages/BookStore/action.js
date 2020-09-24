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

export const getSelectedBooksAction = (status) => {
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

export const getSingleBookAction = (id) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .get(`http://localhost:8081/books/getsinglebook/${id}`)
      .then((respose) => {
        dispatch({ type: "GET_BOOKS", payload: respose.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteBookAction = (id, path) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .delete(`http://localhost:8081/books/deletebook/${id}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: "DELETE_BOOK" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
