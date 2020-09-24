import React, { useState, useEffect } from "react";
import "./BookPage.css";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
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
                    <Button variant="primary" className="view-book-button">
                      View
                    </Button>
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
