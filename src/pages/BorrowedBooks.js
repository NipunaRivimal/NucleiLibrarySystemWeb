import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Loader from "../components/Loader";
import BookCard from "../components/BookCard";
import "./BookPage.css";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { Empty } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getSelectedBooksByUserAction } from "./BookStore/action";

const BorrowedBooks = (props) => {
  const userlogin = useSelector((state) => state.auth.loginStatus);
  const books = useSelector((state) => state.books.books);
  const loading = useSelector((state) => state.books.loading);
  const dispatch = useDispatch();
  const getBorrowedBooks = (id) => dispatch(getSelectedBooksByUserAction(id));

  useEffect(() => {
    getBorrowedBooks(props.match.params.id);
  }, []);

  // if (!userlogin) {
  //   return <Redirect to={"/login"} />;
  // }

  return (
    <div className="page-content">
      {books.length === 0 ? (
        <Empty />
      ) : (
        <Container>
          {loading ? (
            <Loader />
          ) : (
            <Row>
              {books.map((book) => (
                <Col lg={3} md={4} xs={12}>
                  <div className="bookCard">
                    <BookCard book={book} from="borrowedbooks" />
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      )}
    </div>
  );
};

export default BorrowedBooks;
