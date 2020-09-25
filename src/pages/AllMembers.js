import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import {
  Container,
  Table,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
  Modal,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllMembersAction, addMemberAction } from "./UserStore/action";
import "./AllMembers.css";

const AllMembers = () => {
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [mobNo, setMobNo] = useState("");
  const [homeAddr, setHomeAddr] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const members = useSelector((state) => state.members.members);
  const loading = useSelector((state) => state.members.loading);
  const dispatch = useDispatch();
  const getAllMembers = () => dispatch(getAllMembersAction());
  const addMember = (member) => dispatch(addMemberAction(member));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + "." + dd + "." + yyyy;

    addMember({
      userid: userId,
      firstname: fName,
      lastname: lName,
      mobilenumber: mobNo,
      homeaddress: homeAddr,
      username: username,
      password: password,
      joindate: today,
    });

    setUserId("");
    setFName("");
    setLName("");
    setMobNo("");
    setHomeAddr("");
    setUsername("");
    setPassword("");
    setShow(false);
  };
  useEffect(() => {
    getAllMembers();
  }, []);

  return (
    <div className="page-content">
      <Container>
        <Modal
          size="lg"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">User ID</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="basic-url"
                aria-describedby="basic-addon3"
                onChange={(event) => setUserId(event.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">First Name</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="basic-url"
                aria-describedby="basic-addon3"
                onChange={(event) => setFName(event.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">Last Name</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="basic-url"
                aria-describedby="basic-addon3"
                onChange={(event) => setLName(event.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">
                  Mobile Number
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="basic-url"
                aria-describedby="basic-addon3"
                onChange={(event) => setMobNo(event.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Home Address</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                as="textarea"
                aria-label="With textarea"
                onChange={(event) => setHomeAddr(event.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">Username</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="basic-url"
                aria-describedby="basic-addon3"
                onChange={(event) => setUsername(event.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">Password</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="basic-url"
                aria-describedby="basic-addon3"
                onChange={(event) => setPassword(event.target.value)}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
        <Row>
          <Col lg={4}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search by user ID..."
                aria-label="Amount (to the nearest dollar)"
              />
            </InputGroup>
          </Col>
          <Col lg={4}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search by first name..."
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
            <Button
              variant="outline-dark"
              style={{ width: "100%" }}
              onClick={handleShow}
            >
              Add new member
            </Button>
          </Col>
        </Row>
        {loading ? (
          <Loader />
        ) : (
          <Table bordered hover>
            <thead>
              <tr>
                <th>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Mobile No</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr>
                  <td>{member.userid}</td>
                  <td>{member.firstname}</td>
                  <td>{member.lastname}</td>
                  <td>{member.mobilenumber}</td>
                  <td>
                    <Link
                      to={{
                        pathname: `/viewmember/${member._id}`,
                      }}
                    >
                      <Button variant="outline-dark" style={{ width: "100%" }}>
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};

export default AllMembers;
