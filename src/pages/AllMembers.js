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
  Alert,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import useMemberForm from "../customHooks/useMemberForm";
import validateAddMember from "../customFunctions/validateAddMember";
import {
  getAllMembersAction,
  addMemberAction,
  getFilteredMembersNameAction,
  getFilteredMembersIdAction,
} from "./UserStore/action";
import "./AllMembers.css";

const AllMembers = () => {
  const { handleChange, handleSubmit, values, errors } = useMemberForm(
    submit,
    validateAddMember
  );
  const [show, setShow] = useState(false);
  const [timeout, setTimeout] = useState(0);
  //   const [userId, setUserId] = useState("");
  //   const [fName, setFName] = useState("");
  //   const [lName, setLName] = useState("");
  //   const [mobNo, setMobNo] = useState("");
  //   const [homeAddr, setHomeAddr] = useState("");
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const members = useSelector((state) => state.members.members);
  const loading = useSelector((state) => state.members.loading);
  const dispatch = useDispatch();
  const getAllMembers = () => dispatch(getAllMembersAction());
  const addMember = (member) => dispatch(addMemberAction(member));
  const filterMembersName = (name) =>
    dispatch(getFilteredMembersNameAction(name));
  const filterMembersId = (id) => dispatch(getFilteredMembersIdAction(id));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function submit() {
    console.log("user add success");
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + "." + dd + "." + yyyy;

    addMember({
      userid: values.userId,
      firstname: values.fName,
      lastname: values.lName,
      mobilenumber: values.mobNo,
      homeaddress: values.homeAddr,
      username: values.username,
      password: values.password,
      joindate: today,
    });

    setShow(false);
  }
  //   const handleSubmit = () => {
  //     var today = new Date();
  //     var dd = String(today.getDate()).padStart(2, "0");
  //     var mm = String(today.getMonth() + 1).padStart(2, "0");
  //     var yyyy = today.getFullYear();

  //     today = mm + "." + dd + "." + yyyy;

  //     addMember({
  //       userid: userId,
  //       firstname: fName,
  //       lastname: lName,
  //       mobilenumber: mobNo,
  //       homeaddress: homeAddr,
  //       username: username,
  //       password: password,
  //       joindate: today,
  //     });

  //     setUserId("");
  //     setFName("");
  //     setLName("");
  //     setMobNo("");
  //     setHomeAddr("");
  //     setUsername("");
  //     setPassword("");
  //     setShow(false);
  //   };

  //   const handleSearch = () => {
  //     filterMembers(searchName);
  //   };

  //   useEffect(() => {
  //     getAllMembers();
  //   }, []);

  useEffect(() => {
    const debouncer = window.setTimeout(() => {
      if (searchName.length > 0) {
        filterMembersName(searchName);
      } else if (searchId.length > 0) {
        filterMembersId(searchId);
      } else {
        getAllMembers();
      }
    }, 1000);
    return () => {
      window.clearTimeout(debouncer);
    };
  }, [searchName, searchId]);

  const searchByNameHandler = (event) => {
    setSearchName(event.target.value);
    setSearchId("");
  };

  const searchByIdHandler = (event) => {
    setSearchName("");
    setSearchId(event.target.value);
  };

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
                name="userId"
                value={values.userId}
                // onChange={(event) => setUserId(event.target.value)}
                onChange={handleChange}
              />
            </InputGroup>
            {errors.userId && <Alert variant="danger">{errors.userId}</Alert>}
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">First Name</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="basic-url"
                aria-describedby="basic-addon3"
                name="fName"
                value={values.fName}
                // onChange={(event) => setFName(event.target.value)}
                onChange={handleChange}
              />
            </InputGroup>
            {errors.fName && <Alert variant="danger">{errors.fName}</Alert>}
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">Last Name</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="basic-url"
                aria-describedby="basic-addon3"
                name="lName"
                value={values.lName}
                // onChange={(event) => setLName(event.target.value)}
                onChange={handleChange}
              />
            </InputGroup>
            {errors.lName && <Alert variant="danger">{errors.lName}</Alert>}
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">
                  Mobile Number
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="basic-url"
                aria-describedby="basic-addon3"
                name="mobNo"
                value={values.mobNo}
                // onChange={(event) => setMobNo(event.target.value)}
                onChange={handleChange}
              />
            </InputGroup>
            {errors.mobNo && <Alert variant="danger">{errors.mobNo}</Alert>}
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Home Address</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                as="textarea"
                aria-label="With textarea"
                name="homeAddr"
                value={values.homeAddr}
                // onChange={(event) => setHomeAddr(event.target.value)}
                onChange={handleChange}
              />
            </InputGroup>
            {errors.homeAddr && (
              <Alert variant="danger">{errors.homeAddr}</Alert>
            )}
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">Username</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="basic-url"
                aria-describedby="basic-addon3"
                name="username"
                value={values.username}
                // onChange={(event) => setUsername(event.target.value)}
                onChange={handleChange}
              />
            </InputGroup>
            {errors.username && (
              <Alert variant="danger">{errors.username}</Alert>
            )}
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">Password</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="password"
                id="basic-url"
                aria-describedby="basic-addon3"
                name="password"
                value={values.password}
                // onChange={(event) => setPassword(event.target.value)}
                onChange={handleChange}
              />
            </InputGroup>
            {errors.password && (
              <Alert variant="danger">{errors.password}</Alert>
            )}
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
                value={searchId}
                onChange={(e) => searchByIdHandler(e)}
              />
            </InputGroup>
          </Col>
          <Col lg={4}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search by first name..."
                aria-label="Amount (to the nearest dollar)"
                value={searchName}
                onChange={(e) => searchByNameHandler(e)}
              />
            </InputGroup>
          </Col>
          <Col lg={2}>
            <Button
              variant="outline-success"
              style={{ width: "100%" }}
              //   onClick={handleSearch}
            >
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
