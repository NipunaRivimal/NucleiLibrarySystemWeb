import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import "./BookCard.css";

const { Meta } = Card;

const BookCard = ({ book, from, path }) => {
  return (
    <div className="content">
      <Link
        to={{
          pathname: `/${path}/${book._id}/${from}`,
        }}
      >
        <Card
          hoverable
          style={{ width: 200 }}
          size="small"
          cover={
            <img
              alt="example"
              src="https://www.rachelneumeier.com/wp-content/uploads/2013/05/GameOfThrones1.jpg"
            />
          }
        >
          <Meta title={book.name} description={"by " + book.author} />
        </Card>
      </Link>
    </div>
  );
};

export default BookCard;
