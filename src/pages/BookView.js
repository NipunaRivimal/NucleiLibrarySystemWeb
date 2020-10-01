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
import { Typography, Space } from "antd";
import "./BookView.css";
import { useSelector, useDispatch } from "react-redux";
import useBookForm from "../customHooks/useBookForm";
import validateAddBook from "../customFunctions/validateAddBook";
import {
  getSingleBookAction,
  deleteBookAction,
  updateBookAction,
} from "./BookStore/action";

const { Text, Title } = Typography;
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
  const books = useSelector((state) => state.books.books);
  const loading = useSelector((state) => state.books.loading);
  const deleteStatus = useSelector((state) => state.books.bookdeleted);
  const members = useSelector((state) => state.auth.members);
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

  if (deleteStatus) {
    return <Redirect to={"/" + props.match.params.pagecategory} />;
  }

  return (
    <div className="container" style={{ marginTop: "30px" }}>
      <Button
        variant="outline-secondary"
        onClick={(e) => history.goBack()}
        style={{ width: "15%" }}
      >
        Back
      </Button>
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
          {books.map((book) => {
            return book.issuestatus ? (
              <div
                style={{
                  display: "flex",
                  border: "2px solid rgb(68, 62, 62)",
                  borderRadius: "10px",
                  backgroundColor: "#f2f2f2",
                  marginTop: "30px",
                }}
              >
                <div className="book-image">
                  <img
                    src="https://www.rachelneumeier.com/wp-content/uploads/2013/05/GameOfThrones1.jpg"
                    alt="Book Image"
                    width="250"
                    height="400"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    // alignItems: "center",
                    flexGrow: "1",
                  }}
                >
                  <h3>{"BOOK ID: " + book.bookcode}</h3>
                  <Title>{"NAME: " + book.name}</Title>
                  <Text type="secondary">{"by " + book.author}</Text>
                  <p>{"DESCRIPTION: " + book.description}</p>
                  <h5>{"ADDED DATE: " + book.addeddate}</h5>
                  <Text type="secondary">
                    {"ISSUED DATE: " + book.issueddate}
                  </Text>
                  <Text type="secondary">{"DUE DATE: " + book.returndate}</Text>
                  {members.usertype == "admin" ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ margin: "5px" }}>
                        <Button
                          variant="outline-danger"
                          onClick={(e) => deleteBook(props.match.params.id)}
                        >
                          Delete
                        </Button>
                      </div>
                      <div style={{ margin: "5px" }}>
                        <Button
                          variant="outline-info"
                          onClick={(e) => handleShow(book)}
                        >
                          Update
                        </Button>
                      </div>
                      <div style={{ margin: "5px" }}>
                        <Button
                          variant="outline-info"
                          onClick={handleReturnUpdate}
                        >
                          Return
                        </Button>
                      </div>
                      <div style={{ margin: "5px" }}>
                        <Link
                          to={{
                            pathname: `/viewmember/${book.borrower}`,
                          }}
                        >
                          <Button variant="outline-info">Borrower</Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  border: "2px solid rgb(68, 62, 62)",
                  borderRadius: "10px",
                  backgroundColor: "#f2f2f2",
                  marginTop: "30px",
                }}
              >
                <div className="book-image">
                  <img
                    src="https://www.rachelneumeier.com/wp-content/uploads/2013/05/GameOfThrones1.jpg"
                    alt="Book Image"
                    width="250"
                    height="400"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    // alignItems: "center",
                    flexGrow: "1",
                  }}
                >
                  <h3>{"BOOK ID: " + book.bookcode}</h3>
                  <Title>{"NAME: " + book.name}</Title>
                  <Text type="secondary">{"by " + book.author}</Text>
                  <p>{"DESCRIPTION: " + book.description}</p>
                  <h5>{"ADDED DATE: " + book.addeddate}</h5>

                  {members.usertype == "admin" ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ margin: "5px" }}>
                        <Button
                          variant="outline-danger"
                          onClick={(e) => deleteBook(props.match.params.id)}
                        >
                          Delete
                        </Button>
                      </div>
                      <div style={{ margin: "5px" }}>
                        <Button
                          variant="outline-info"
                          onClick={(e) => handleShow(book)}
                        >
                          Update
                        </Button>
                      </div>
                      <div style={{ margin: "5px" }}>
                        <Link
                          to={{
                            pathname: `/issuebook/${props.match.params.id}`,
                          }}
                        >
                          <Button variant="outline-success">Issue</Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              // <div>
              //   <h3>{book.bookcode}</h3>
              //   <h3>{book.name}</h3>
              //   <h5>{book.author}</h5>
              //   <h5>{book.description}</h5>
              //   <h5>{book.addeddate}</h5>
              //   {members.usertype == "admin" ? (
              //     <>
              //       <Button
              //         variant="outline-danger"
              //         onClick={(e) => deleteBook(props.match.params.id)}
              //       >
              //         Delete
              //       </Button>
              //       <Button
              //         variant="outline-info"
              //         onClick={(e) => handleShow(book)}
              //       >
              //         Update
              //       </Button>

              //       <Link
              //         to={{
              //           pathname: `/issuebook/${props.match.params.id}`,
              //         }}
              //       >
              //         <Button variant="outline-success">Issue</Button>
              //       </Link>
              //     </>
              //   ) : (
              //     ""
              //   )}
              // </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BookView;
