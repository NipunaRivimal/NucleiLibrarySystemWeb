import axios from "axios";

//get all members
export const getAllMembersAction = () => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .get("http://localhost:8081/user/getallusers")
      .then((respose) => {
        dispatch({ type: "GET_MEMBERS", payload: respose.data.data });
      })
      .catch((error) => {
        dispatch({ type: "GET_MEMBERS_ERRORS" });
      });
  };
};

//get members according to first name
export const getFilteredMembersNameAction = (name) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .get(`http://localhost:8081/user/getfiltereduserfname/${name}`)
      .then((respose) => {
        dispatch({ type: "GET_MEMBERS", payload: respose.data.data });
      })
      .catch((error) => {
        dispatch({ type: "GET_MEMBERS_ERRORS" });
      });
  };
};

//get members according to member id
export const getFilteredMembersIdAction = (id) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .get(`http://localhost:8081/user/getfiltereduserid/${id}`)
      .then((respose) => {
        dispatch({ type: "GET_MEMBERS", payload: respose.data.data });
      })
      .catch((error) => {
        dispatch({ type: "GET_MEMBERS_ERRORS" });
      });
  };
};

//get single member
export const getSingleMemberAction = (id) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .get(`http://localhost:8081/user/getsingleuser/${id}`)
      .then((respose) => {
        dispatch({ type: "GET_MEMBERS", payload: respose.data.data });
      })
      .catch((error) => {
        dispatch({ type: "GET_MEMBERS_ERRORS" });
      });
  };
};

//delete member
export const deleteMemberAction = (id) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .delete(`http://localhost:8081/user/deleteuser/${id}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: "DELETE_MEMBER" });
        }
      })
      .catch((error) => {
        dispatch({ type: "GET_MEMBERS_ERRORS" });
      });
  };
};

//add new member
export const addMemberAction = (member) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .post("http://localhost:8081/user/adduser", member)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: "ADD_MEMBER", payload: response.data.data });
        }
      })
      .catch((error) => {
        dispatch({ type: "GET_MEMBERS_ERRORS" });
      });
  };
};

//update memeber
export const updateMemberAction = (id, member) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .put(`http://localhost:8081/user/updateuser/${id}`, member)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: "GET_MEMBERS", payload: response.data.data });
        }
      })
      .catch((error) => {
        dispatch({ type: "GET_MEMBERS_ERRORS" });
      });
  };
};
