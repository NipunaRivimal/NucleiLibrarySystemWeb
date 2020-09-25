import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Loader from "../components/Loader";
import { Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getSingleMemberAction,
  deleteMemberAction,
  // updateBookAction,
} from "./UserStore/action";

const MemberView = (props) => {
  const members = useSelector((state) => state.members.members);
  const loading = useSelector((state) => state.members.loading);
  const deleteStatus = useSelector((state) => state.members.memberDeleted);
  const dispatch = useDispatch();
  const getSingleMember = (id) => dispatch(getSingleMemberAction(id));
  const deleteMember = (id) => dispatch(deleteMemberAction(id));

  useEffect(() => {
    getSingleMember(props.match.params.id);
  }, []);

  if (deleteStatus) {
    return <Redirect to="/allmembers" />;
  }

  return (
    <div>
      <Container>
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
                  // onClick={(e) => handleShow(book)}
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
