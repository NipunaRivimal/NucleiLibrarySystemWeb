import React from "react";
import "./Navbar.css";
import { Nav } from "react-bootstrap";

const Navbar = () => {
  return (
    <div>
      <div className="header">
        <h3>Luck's Library</h3>
      </div>
      <Nav fill variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/home">Books</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Users</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Navbar;
