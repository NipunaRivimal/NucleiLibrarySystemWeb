import axios from "axios";

export const getAllMembersAction = () => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .get("http://localhost:8081/user/getallusers")
      .then((respose) => {
        dispatch({ type: "GET_MEMBERS", payload: respose.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// export const getSelectedMembersAction = (status) => {
//   return (dispatch) => {
//     dispatch({ type: "LOADING" });
//     axios
//       .get(`http://localhost:8081/books/getselectedbooks/${status}`)
//       .then((respose) => {
//         dispatch({ type: "GET_BOOKS", payload: respose.data.data });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// };

export const getSingleMemberAction = (id) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .get(`http://localhost:8081/user/getsingleuser/${id}`)
      .then((respose) => {
        dispatch({ type: "GET_MEMBERS", payload: respose.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

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
        console.log(error);
      });
  };
};

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
        console.log(error);
      });
  };
};

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
        console.log(error);
      });
  };
};
