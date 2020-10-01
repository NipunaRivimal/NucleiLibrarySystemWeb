import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import BookCard from "../components/BookCard";
import NavBarSub from "../components/NavbarSub";
import { Link } from "react-router-dom";
import "./BookPage.css";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { Empty } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getSelectedBooksAction } from "./BookStore/action";

const AvailableBooks = () => {
  const books = useSelector((state) => state.books.books);
  const loading = useSelector((state) => state.books.loading);
  const dispatch = useDispatch();
  const getAvailableBooks = (status) =>
    dispatch(getSelectedBooksAction(status));

  //call get available book action
  useEffect(() => {
    getAvailableBooks("false");
  }, []);

  return (
    <>
      <NavBarSub />
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
                      <BookCard
                        book={book}
                        from="availablebooks"
                        path="viewbook"
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            )}
          </Container>
        )}
      </div>
    </>
  );
};

export default AvailableBooks;
