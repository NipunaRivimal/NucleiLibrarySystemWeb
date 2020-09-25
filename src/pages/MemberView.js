import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Loader from "../components/Loader";
import {
  Container,
  Button,
  Modal,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";
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
  // const [userId, setUserId] = useState("");
  // const [fName, setFName] = useState("");
  // const [lName, setLName] = useState("");
  // const [mobNo, setMobNo] = useState("");
  // const [homeAddr, setHomeAddr] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const members = useSelector((state) => state.members.members);
  const loading = useSelector((state) => state.members.loading);
  const deleteStatus = useSelector((state) => state.members.memberDeleted);
  const dispatch = useDispatch();
  const getSingleMember = (id) => dispatch(getSingleMemberAction(id));
  const deleteMember = (id) => dispatch(deleteMemberAction(id));
  const updateMember = (id, member) => dispatch(updateMemberAction(id, member));

  const handleClose = () => setShow(false);
  const handleShow = (member) => {
    // setUserId(member.userid);
    // setFName(member.firstname);
    // setLName(member.lastname);
    // setMobNo(member.mobilenumber);
    // setHomeAddr(member.homeaddress);
    // setUsername(member.username);
    // setPassword(member.password);
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
      username: values.username,
      password: values.password,
    });

    setShow(false);
  }
  // const handleSubmit = () => {
  //   updateMember(props.match.params.id, {
  //     userid: userId,
  //     firstname: fName,
  //     lastname: lName,
  //     mobilenumber: mobNo,
  //     homeaddress: homeAddr,
  //     username: username,
  //     password: password,
  //   });
  //   setUserId("");
  //   setFName("");
  //   setLName("");
  //   setMobNo("");
  //   setHomeAddr("");
  //   setUsername("");
  //   setPassword("");
  //   setShow(false);
  // };

  useEffect(() => {
    getSingleMember(props.match.params.id);
  }, []);

  if (deleteStatus) {
    return <Redirect to="/allmembers" />;
  }

  return (
    <div>
      <Container>
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
              Update
            </Button>
          </Modal.Footer>
        </Modal>
        <Link
          to={{
            pathname: "/allmembers",
          }}
        >
          <Button variant="outline-secondary">Back</Button>
        </Link>
        {loading ? (
          <Loader />
        ) : (
          <div>
            <h3>{props.match.params.id}</h3>
            {members.map((member) => (
              <div>
                <h3>{member.userid}</h3>
                <h3>{member.firstname}</h3>
                <h5>{member.lastname}</h5>
                <h5>{member.mobilenumber}</h5>
                <h5>{member.homeaddress}</h5>
                <h5>{member.username}</h5>
                <h5>{member.joindate}</h5>
                <Button
                  variant="outline-danger"
                  onClick={(e) => deleteMember(props.match.params.id)}
                >
                  Delete Member
                </Button>
                <Button
                  variant="outline-info"
                  onClick={(e) => handleShow(member)}
                >
                  Update Member
                </Button>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default MemberView;
