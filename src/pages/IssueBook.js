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
import { DatePicker, Space, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import useIsMount from "../customHooks/useIsMount";
import {
  getAllMembersAction,
  getFilteredMembersNameAction,
  getFilteredMembersIdAction,
} from "./UserStore/action";
import { updateBookAction } from "./BookStore/action";

const { Text } = Typography;

const IssueBook = (props) => {
  const isMount = useIsMount();
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

  //if first render call only getAllMembers(), other get methods calls only name or id change on search
  useEffect(() => {
    if (!isMount) {
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
    } else {
      getAllMembers();
    }
  }, [searchName, searchId]);

  //if search by member name reset id input and set name
  const searchByNameHandler = (event) => {
    setSearchName(event.target.value);
    setSearchId("");
  };

  //if search by member id reset name input and set id
  const searchByIdHandler = (event) => {
    setSearchName("");
    setSearchId(event.target.value);
  };

  //set issue date
  function onChangeI(date, dateString) {
    console.log(dateString);
    setIDate(dateString);
  }

  //set due date
  function onChangeD(date, dateString) {
    console.log(dateString);
    setDDate(dateString);
  }

  //update book details according to selected user, issue date and due date
  const handleIssueUpdate = () => {
    updateBook(props.match.params.id, {
      issuestatus: "true",
      borrower: id,
      issueddate: iDate,
      returndate: dDate,
    });
    //return back to book view page
    return <Redirect to={history.goBack()} />;
  };

  return (
    <div className="page-content">
      <Container>
        <Button
          variant="outline-secondary"
          onClick={(e) => history.goBack()}
          style={{ width: "15%" }}
        >
          Back
        </Button>
        <div className="issue-form">
          <Text>Member</Text>
          <Text type="secondary">{name}</Text>
          <div style={{ marginTop: "20px" }}>
            <Text>Issue Date</Text>
          </div>
          <DatePicker style={{ width: "50%" }} onChange={onChangeI} />

          <div style={{ marginTop: "20px" }}>
            <Text>Return Date</Text>
          </div>
          <DatePicker style={{ width: "50%" }} onChange={onChangeD} />

          <Button
            variant="outline-success"
            style={{ width: "50%", marginTop: "20px" }}
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
