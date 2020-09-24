import React from "react";
import "./Navbar.css";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="header">
        <h3>Luck's Library</h3>
      </div>
      <Nav fill variant="tabs" defaultActiveKey="/allbooks">
        <Nav.Item>
          {/* <Nav.Link href="/allbooks">Books</Nav.Link> */}
          <Link to="/allbooks">Books</Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/avabooks">Users</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Navbar;
