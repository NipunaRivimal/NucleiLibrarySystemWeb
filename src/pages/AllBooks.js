import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BookPage.css";
import {
  Card,
  Button,
  Row,
  Col,
  Container,
  InputGroup,
  FormControl,
  Modal,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooksAction, addBookAction } from "./BookStore/action";
const AllBooks = () => {
  const [show, setShow] = useState(false);
  const [bookID, setBookId] = useState("");
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const books = useSelector((state) => state.books.books);
  const dispatch = useDispatch();
  const getAllBooks = () => dispatch(getAllBooksAction());
  const addBook = (book) => dispatch(addBookAction(book));

  useEffect(() => {
    getAllBooks();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    addBook({
      bookcode: bookID,
      name: name,
      author: author,
      description: description,
      addeddate: "2020-09-24",
      issuestatus: "false",
    });

    setBookId("");
    setName("");
    setAuthor("");
    setDescription("");
    setShow(false);
  };

  return (
    <div className="page-content">
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3">Book ID</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="basic-url"
              aria-describedby="basic-addon3"
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
              onChange={(event) => setDescription(event.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <Row>
          <Col lg={4}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search by name..."
                aria-label="Amount (to the nearest dollar)"
              />
            </InputGroup>
          </Col>
          <Col lg={4}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search by author..."
                aria-label="Amount (to the nearest dollar)"
              />
            </InputGroup>
          </Col>
          <Col lg={2}>
            <Button variant="outline-success" style={{ width: "100%" }}>
              Search
            </Button>
          </Col>
          <Col lg={2}>
            <Button
              variant="outline-dark"
              style={{ width: "100%" }}
              onClick={handleShow}
            >
              Add new book
            </Button>
          </Col>
        </Row>
        <Row>
          {books.map((book) => (
            <Col lg={3} md={4} xs={12}>
              <div className="bookCard">
                <Card>
                  <Card.Img
                    variant="top"
                    src="https://thewritelife.com/wp-content/uploads/2019/08/How-to-format-a-book.jpg"
                  />
                  <Card.Body>
                    <Card.Title>{book.name}</Card.Title>
                    <Link
                      to={{
                        pathname: `/viewbook/${book._id}/${"allbooks"}`,
                      }}
                    >
                      <Button
                        variant="outline-primary"
                        className="view-book-button"
                      >
                        View
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AllBooks;
