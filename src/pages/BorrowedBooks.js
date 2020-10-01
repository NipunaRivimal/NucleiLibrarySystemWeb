import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Loader from "../components/Loader";
import BookCard from "../components/BookCard";
import "./BookPage.css";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { Empty, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getSelectedBooksByUserAction } from "./BookStore/action";
const { Title } = Typography;

const BorrowedBooks = (props) => {
  const userlogin = useSelector((state) => state.auth.loginStatus);
  const books = useSelector((state) => state.books.books);
  const loading = useSelector((state) => state.books.loading);
  const dispatch = useDispatch();
  const getBorrowedBooks = (id) => dispatch(getSelectedBooksByUserAction(id));

  //call borrowed books action with specific user id
  useEffect(() => {
    getBorrowedBooks(props.match.params.id);
  }, []);

  return (
    <div className="page-content">
      {books.length === 0 ? (
        <Empty />
      ) : (
        <Container>
          {loading ? (
            <Loader />
          ) : (
            <div>
              <Title level={2} style={{ textAlign: "center" }}>
                Borrowed Books
              </Title>
              <Row>
                {books.map((book) => (
                  <Col lg={3} md={4} xs={12}>
                    <div className="bookCard">
                      <BookCard
                        book={book}
                        from="borrowedbooks"
                        path="memberviewbook"
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Container>
      )}
    </div>
  );
};

export default BorrowedBooks;
