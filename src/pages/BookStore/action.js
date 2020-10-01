import axios from "axios";

//get all books
export const getAllBooksAction = () => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .get("http://localhost:8081/books/getallbooks")
      .then((respose) => {
        dispatch({ type: "GET_BOOKS", payload: respose.data.data });
      })
      .catch((error) => {
        dispatch({ type: "GET_BOOKS_ERROR" });
      });
  };
};

//get books according to issue status
export const getSelectedBooksAction = (status) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .get(`http://localhost:8081/books/getselectedbooks/${status}`)
      .then((respose) => {
        dispatch({ type: "GET_BOOKS", payload: respose.data.data });
      })
      .catch((error) => {
        dispatch({ type: "GET_BOOKS_ERROR" });
      });
  };
};

//get books according to member id
export const getSelectedBooksByUserAction = (id) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .get(`http://localhost:8081/books/getselectedbooksbyuser/${id}`)
      .then((respose) => {
        dispatch({ type: "GET_BOOKS", payload: respose.data.data });
      })
      .catch((error) => {
        dispatch({ type: "GET_BOOKS_ERROR" });
      });
  };
};

//get single book according to book id
export const getSingleBookAction = (id) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .get(`http://localhost:8081/books/getsinglebook/${id}`)
      .then((respose) => {
        dispatch({ type: "GET_BOOKS", payload: respose.data.data });
      })
      .catch((error) => {
        dispatch({ type: "GET_BOOKS_ERROR" });
      });
  };
};

//get books according to book name
export const getFilteredBooksNameAction = (name) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .get(`http://localhost:8081/books/getfilteredbooksname/${name}`)
      .then((respose) => {
        dispatch({ type: "GET_BOOKS", payload: respose.data.data });
      })
      .catch((error) => {
        dispatch({ type: "GET_BOOKS_ERROR" });
      });
  };
};

//get books according to author
export const getFilteredBooksAuthorAction = (author) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .get(`http://localhost:8081/books/getfilteredbooksauthor/${author}`)
      .then((respose) => {
        dispatch({ type: "GET_BOOKS", payload: respose.data.data });
      })
      .catch((error) => {
        dispatch({ type: "GET_BOOKS_ERROR" });
      });
  };
};

//delete book
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
        dispatch({ type: "GET_BOOKS_ERROR" });
      });
  };
};

//add new book
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
        dispatch({ type: "GET_BOOKS_ERROR" });
      });
  };
};

//update book details
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
        dispatch({ type: "GET_BOOKS_ERROR" });
      });
  };
};
