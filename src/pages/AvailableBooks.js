import React, { useState, useEffect } from "react";
import "./BookPage.css";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getSelectedBooksAction } from "./BookStore/action";

const AvailableBooks = () => {
  const books = useSelector((state) => state.books.books);
  const dispatch = useDispatch();
  const getAvailableBooks = (status) =>
    dispatch(getSelectedBooksAction(status));

  useEffect(() => {
    getAvailableBooks("false");
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

export default AvailableBooks;
