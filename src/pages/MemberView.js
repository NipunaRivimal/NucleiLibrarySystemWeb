import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Loader from "../components/Loader";
import {
  Container,
  Button,
  Modal,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";
import { Descriptions } from "antd";
import { useSelector, useDispatch } from "react-redux";
import useMemberForm from "../customHooks/useMemberForm";
import validateAddMember from "../customFunctions/validateAddMember";
import {
  getSingleMemberAction,
  deleteMemberAction,
  updateMemberAction,
} from "./UserStore/action";

const MemberView = (props) => {
  const {
    handleChange,
    handleSubmit,
    handleShowSetValues,
    values,
    errors,
  } = useMemberForm(submit, validateAddMember);
  const [show, setShow] = useState(false);
  const members = useSelector((state) => state.members.members);
  const loading = useSelector((state) => state.members.loading);
  const deleteStatus = useSelector((state) => state.members.memberDeleted);
  const dispatch = useDispatch();
  const getSingleMember = (id) => dispatch(getSingleMemberAction(id));
  const deleteMember = (id) => dispatch(deleteMemberAction(id));
  const updateMember = (id, member) => dispatch(updateMemberAction(id, member));
  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = (member) => {
    handleShowSetValues(member);
    setShow(true);
  };

  function submit() {
    updateMember(props.match.params.id, {
      userid: values.userId,
      firstname: values.fName,
      lastname: values.lName,
      mobilenumber: values.mobNo,
      homeaddress: values.homeAddr,
      email: values.email,
      password: values.password,
    });

    setShow(false);
  }

  useEffect(() => {
    getSingleMember(props.match.params.id);
  }, []);

  if (deleteStatus) {
    return <Redirect to="/allmembers" />;
  }

  return (
    <div style={{ marginTop: "30px" }}>
      <Container>
        <Button
          variant="outline-secondary"
          style={{ width: "15%" }}
          onClick={(e) => history.goBack()}
        >
          Back
        </Button>

        <Modal
          size="lg"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Member</Modal.Title>
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
                onChange={handleChange}
              />
            </InputGroup>
            {errors.mobNo && <Alert variant="danger">{errors.mobNo}</Alert>}
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">Email</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="basic-url"
                aria-describedby="basic-addon3"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </InputGroup>
            {errors.email && <Alert variant="danger">{errors.email}</Alert>}
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Home Address</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                as="textarea"
                aria-label="With textarea"
                name="homeAddr"
                value={values.homeAddr}
                onChange={handleChange}
              />
            </InputGroup>
            {errors.homeAddr && (
              <Alert variant="danger">{errors.homeAddr}</Alert>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
        {loading ? (
          <Loader />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              border: "2px solid rgb(68, 62, 62)",
              borderRadius: "10px",
              backgroundColor: "#f2f2f2",
              marginTop: "30px",
            }}
          >
            {members.map((member) => (
              <div>
                {/* <h3>{"Member ID: " + member.userid}</h3>
                <h3>{"First Name: " + member.firstname}</h3>
                <h5>{"Last Name: " + member.lastname}</h5>
                <h5>{"Mobile Number: " + member.mobilenumber}</h5>
                <h5>{"Home Address: " + member.homeaddress}</h5>
                <h5>{"Email: " + member.email}</h5>
                <h5>{"Joined Date: " + member.joindate}</h5> */}
                <Descriptions title="Member Info">
                  <Descriptions.Item label="Member ID">
                    {member.userid}
                  </Descriptions.Item>
                  <Descriptions.Item label="First name">
                    {member.firstname}
                  </Descriptions.Item>
                  <Descriptions.Item label="Last name">
                    {member.lastname}
                  </Descriptions.Item>
                  <Descriptions.Item label="Mobile number">
                    {member.mobilenumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="Home address">
                    {member.homeaddress}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {member.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Joined date">
                    {member.joindate}
                  </Descriptions.Item>
                </Descriptions>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ margin: "5px" }}>
                    <Button
                      variant="outline-danger"
                      onClick={(e) => deleteMember(props.match.params.id)}
                    >
                      Delete
                    </Button>
                  </div>
                  <div style={{ margin: "5px" }}>
                    <Button
                      variant="outline-info"
                      onClick={(e) => handleShow(member)}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default MemberView;
