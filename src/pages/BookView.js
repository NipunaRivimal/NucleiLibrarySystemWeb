import React, { useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getSingleBookAction, deleteBookAction } from "./BookStore/action";

const BookView = (props) => {
  const books = useSelector((state) => state.books.books);
  const deleteStatus = useSelector((state) => state.books.bookdeleted);
  const dispatch = useDispatch();
  const history = useHistory();
  const getSingleBook = (id) => dispatch(getSingleBookAction(id));
  const deleteBook = (id, path) => dispatch(deleteBookAction(id, path));

  useEffect(() => {
    getSingleBook(props.match.params.id);
  }, []);

  if (deleteStatus) {
    return <Redirect to="/allbooks" />;
  }

  return (
    <div className="container">
      <Link
        to={{
          pathname: `/${props.match.params.pagecategory}`,
        }}
      >
        <Button variant="outline-secondary">Back</Button>
      </Link>
      <h3>{props.match.params.id}</h3>
      {books.map((book) => (
        <div>
          <h3>{book.name}</h3>
          <h5>{book.author}</h5>
          <h5>{book.description}</h5>
          <h5>{book.addeddate}</h5>
          <Button
            variant="outline-danger"
            onClick={(e) => deleteBook(props.match.params.id, "/allbooks")}
          >
            Delete Book
          </Button>
          <Button variant="outline-info">Update Book</Button>
          <Button variant="outline-success">Issue Book</Button>
        </div>
      ))}
    </div>
  );
};

export default BookView;
