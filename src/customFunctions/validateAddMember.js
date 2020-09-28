export default function validateAddMember(values) {
  let errors = {};

  if (!values.userId) {
    errors.userId = "User ID is required!";
  }
  if (!values.fName) {
    errors.fName = "First name is required!";
  }
  if (!values.lName) {
    errors.lName = "Last name is required!";
  }
  if (!values.mobNo) {
    errors.mobNo = "Mobile number is required!";
  }
  if (!values.homeAddr) {
    errors.homeAddr = "Home address is required!";
  }
  if (!values.email) {
    errors.email = "Email address is required!";
  }
  if (!values.password) {
    errors.password = "Password is required!";
  }
  return errors;
}
