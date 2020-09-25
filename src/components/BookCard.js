import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const BookCard = ({ book, from }) => {
  return (
    <Card>
      <Card.Img
        variant="top"
        src="https://thewritelife.com/wp-content/uploads/2019/08/How-to-format-a-book.jpg"
      />
      <Card.Body>
        <Card.Title>{book.name}</Card.Title>
        <h6>By {book.author}</h6>
        <Link
          to={{
            pathname: `/viewbook/${book._id}/${from}`,
          }}
        >
          <Button variant="outline-primary" className="view-book-button">
            View
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
