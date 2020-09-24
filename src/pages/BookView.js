import React, { useState, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import Loader from "../components/Loader";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getSingleBookAction,
  deleteBookAction,
  updateBookAction,
} from "./BookStore/action";

const BookView = (props) => {
  const [show, setShow] = useState(false);
  const [bookID, setBookId] = useState("");
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const books = useSelector((state) => state.books.books);
  const loading = useSelector((state) => state.books.loading);
  const deleteStatus = useSelector((state) => state.books.bookdeleted);
  const dispatch = useDispatch();
  const history = useHistory();
  const getSingleBook = (id) => dispatch(getSingleBookAction(id));
  const deleteBook = (id, path) => dispatch(deleteBookAction(id, path));
  const updateBook = (id, book) => dispatch(updateBookAction(id, book));

  useEffect(() => {
    getSingleBook(props.match.params.id);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (book) => {
    setShow(true);
    setBookId(book.bookcode);
    setName(book.name);
    setAuthor(book.author);
    setDescription(book.description);
  };

  const handleSubmit = () => {
    updateBook(props.match.params.id, {
      bookcode: bookID,
      name: name,
      author: author,
      description: description,
    });
    setBookId("");
    setName("");
    setAuthor("");
    setDescription("");
    setShow(false);
  };

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
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3">Book ID</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="basic-url"
              aria-describedby="basic-addon3"
              value={bookID}
              onChange={(event) => setBookId(event.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3">Name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="basic-url"
              aria-describedby="basic-addon3"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3">Author</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="basic-url"
              aria-describedby="basic-addon3"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Description</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              as="textarea"
              aria-label="With textarea"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h3>{props.match.params.id}</h3>
          {books.map((book) => (
            <div>
              <h3>{book.bookcode}</h3>
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
              <Button variant="outline-info" onClick={(e) => handleShow(book)}>
                Update Book
              </Button>
              <Button variant="outline-success">Issue Book</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookView;
