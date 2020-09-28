import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import "./IssueBook.css";
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
import { DatePicker, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import {
  getAllMembersAction,
  getFilteredMembersNameAction,
  getFilteredMembersIdAction,
} from "./UserStore/action";
import { updateBookAction } from "./BookStore/action";

const IssueBook = (props) => {
  const [timeout, setTimeout] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const [name, setName] = useState("No Member Selected!");
  const [id, setId] = useState("");
  const [iDate, setIDate] = useState("");
  const [dDate, setDDate] = useState("");
  const members = useSelector((state) => state.members.members);
  const loading = useSelector((state) => state.members.loading);
  const dispatch = useDispatch();
  const getAllMembers = () => dispatch(getAllMembersAction());
  const filterMembersName = (name) =>
    dispatch(getFilteredMembersNameAction(name));
  const filterMembersId = (id) => dispatch(getFilteredMembersIdAction(id));
  const updateBook = (id, book) => dispatch(updateBookAction(id, book));

  let history = useHistory();

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

  function onChangeI(date, dateString) {
    console.log(dateString);
    setIDate(dateString);
  }

  function onChangeD(date, dateString) {
    console.log(dateString);
    setDDate(dateString);
  }

  const handleIssueUpdate = () => {
    updateBook(props.match.params.id, {
      issuestatus: "true",
      borrower: id,
      issueddate: iDate,
      returndate: dDate,
    });
    return <Redirect to={history.goBack()} />;
  };

  return (
    <div className="page-content">
      <Container>
        <Button variant="outline-secondary" onClick={(e) => history.goBack()}>
          Back
        </Button>
        <div className="issue-form">
          <h4>Member</h4>
          <h4>{name}</h4>
          <h4>Issue Date</h4>
          <DatePicker style={{ width: "50%" }} onChange={onChangeI} />
          <h4>Return Date</h4>
          <DatePicker
            style={{ width: "50%", marginTop: "20px" }}
            onChange={onChangeD}
          />
          <Button
            variant="outline-success"
            style={{ width: "50%" }}
            onClick={handleIssueUpdate}
            disabled={
              id.length > 0 && iDate.length > 0 && dDate.length > 0
                ? false
                : true
            }
          >
            Done
          </Button>
        </div>
        <Row>
          <Col lg={6}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search by user ID..."
                aria-label="Amount (to the nearest dollar)"
                value={searchId}
                onChange={(e) => searchByIdHandler(e)}
              />
            </InputGroup>
          </Col>
          <Col lg={6}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search by first name..."
                aria-label="Amount (to the nearest dollar)"
                value={searchName}
                onChange={(e) => searchByNameHandler(e)}
              />
            </InputGroup>
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
                    <Button
                      variant="outline-dark"
                      style={{ width: "100%" }}
                      onClick={(event) => {
                        setName(member.userid);
                        setId(member._id);
                      }}
                    >
                      Select
                    </Button>
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

export default IssueBook;
