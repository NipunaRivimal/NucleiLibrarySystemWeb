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

export const deleteBookAction = (id) => {
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

export const addBookAction = (book) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .post("http://localhost:8081/books/addbook", book)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: "ADD_BOOK", payload: response.data.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateBookAction = (id, book) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .put(`http://localhost:8081/books/updatebooks/${id}`, book)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: "GET_BOOKS", payload: response.data.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
