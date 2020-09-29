import React, { useState, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import Loader from "../components/Loader";
import {
  Button,
  Modal,
  InputGroup,
  FormControl,
  Alert,
  Table,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import useBookForm from "../customHooks/useBookForm";
import validateAddBook from "../customFunctions/validateAddBook";
import {
  getSingleBookAction,
  deleteBookAction,
  updateBookAction,
} from "./BookStore/action";

const BookView = (props) => {
  const {
    handleChange,
    handleSubmit,
    handleShowSetValues,
    values,
    errors,
  } = useBookForm(submit, validateAddBook);
  const [show, setShow] = useState(false);
  const [membersVisibility, setMembersVisibility] = useState(false);
  // const [bookID, setBookId] = useState("");
  // const [name, setName] = useState("");
  // const [author, setAuthor] = useState("");
  // const [description, setDescription] = useState("");
  const books = useSelector((state) => state.books.books);
  const loading = useSelector((state) => state.books.loading);
  const deleteStatus = useSelector((state) => state.books.bookdeleted);
  const dispatch = useDispatch();
  const history = useHistory();
  const getSingleBook = (id) => dispatch(getSingleBookAction(id));
  const deleteBook = (id) => dispatch(deleteBookAction(id));
  const updateBook = (id, book) => dispatch(updateBookAction(id, book));

  useEffect(() => {
    getSingleBook(props.match.params.id);
  }, []);

  const handleClose = () => setShow(false);
  function handleShow(book) {
    // setBookId(book.bookcode);
    // setName(book.name);
    // setAuthor(book.author);
    // setDescription(book.description);
    handleShowSetValues(book);
    setShow(true);
  }

  function submit() {
    updateBook(props.match.params.id, {
      bookcode: values.bookID,
      name: values.name,
      author: values.author,
      description: values.description,
    });
    setShow(false);
  }

  // const handleIssueUpdate = () => {
  //   updateBook(props.match.params.id, {
  //     issuestatus: "true",
  //     borrower: "qwerty",
  //     issueddate: "2020.09.27",
  //     returndate: "2020.09.30",
  //   });
  // };

  const handleReturnUpdate = () => {
    updateBook(props.match.params.id, {
      issuestatus: "false",
      borrower: "",
      issueddate: "",
      returndate: "",
    });
  };

  const visibleMemberSearch = () => {
    setMembersVisibility(true);
  };
  // const handleSubmit = () => {
  //   updateBook(props.match.params.id, {
  //     bookcode: bookID,
  //     name: name,
  //     author: author,
  //     description: description,
  //   });
  //   setBookId("");
  //   setName("");
  //   setAuthor("");
  //   setDescription("");
  //   setShow(false);
  // };

  if (deleteStatus) {
    return <Redirect to={"/" + props.match.params.pagecategory} />;
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
              name="bookID"
              value={values.bookID}
              // onChange={(event) => setBookId(event.target.value)}
              onChange={handleChange}
            />
          </InputGroup>
          {errors.bookID && <Alert variant="danger">{errors.bookID}</Alert>}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3">Name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="basic-url"
              aria-describedby="basic-addon3"
              name="name"
              value={values.name}
              // onChange={(event) => setName(event.target.value)}
              onChange={handleChange}
            />
          </InputGroup>
          {errors.name && <Alert variant="danger">{errors.name}</Alert>}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3">Author</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="basic-url"
              aria-describedby="basic-addon3"
              name="author"
              value={values.author}
              // onChange={(event) => setAuthor(event.target.value)}
              onChange={handleChange}
            />
          </InputGroup>
          {errors.author && <Alert variant="danger">{errors.author}</Alert>}
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Description</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              as="textarea"
              aria-label="With textarea"
              name="description"
              value={values.description}
              // onChange={(event) => setDescription(event.target.value)}
              onChange={handleChange}
            />
          </InputGroup>
          {errors.description && (
            <Alert variant="danger">{errors.description}</Alert>
          )}
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
          {books.map((book) => {
            return book.issuestatus ? (
              <div>
                <h3>{book.bookcode}</h3>
                <h3>{book.name}</h3>
                <h5>{book.author}</h5>
                <h5>{book.description}</h5>
                <h5>{book.addeddate}</h5>
                <Button
                  variant="outline-danger"
                  onClick={(e) => deleteBook(props.match.params.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="outline-info"
                  onClick={(e) => handleShow(book)}
                >
                  Update
                </Button>
                <Button variant="outline-info" onClick={handleReturnUpdate}>
                  Return
                </Button>
              </div>
            ) : (
              <div>
                <h3>{book.bookcode}</h3>
                <h3>{book.name}</h3>
                <h5>{book.author}</h5>
                <h5>{book.description}</h5>
                <h5>{book.addeddate}</h5>
                <Button
                  variant="outline-danger"
                  onClick={(e) => deleteBook(props.match.params.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="outline-info"
                  onClick={(e) => handleShow(book)}
                >
                  Update
                </Button>

                <Link
                  to={{
                    pathname: `/issuebook/${props.match.params.id}`,
                  }}
                >
                  <Button variant="outline-success">Issue</Button>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BookView;
