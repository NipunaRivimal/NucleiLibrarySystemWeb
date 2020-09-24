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
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooksAction } from "./BookStore/action";
const AllBooks = () => {
  const books = useSelector((state) => state.books.books);
  const dispatch = useDispatch();
  const getAllBooks = () => dispatch(getAllBooksAction());

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div className="page-content">
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
            <Button variant="outline-dark" style={{ width: "100%" }}>
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
