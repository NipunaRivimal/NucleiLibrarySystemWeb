import { useState, useEffect } from "react";

const useMemberForm = (callback, validateAddMember) => {
  //set initial values
  const [values, setValues] = useState({
    userId: "",
    fName: "",
    lName: "",
    mobNo: "",
    homeAddr: "",
    email: "",
    password: "",
  });

  //set initial errors
  const [errors, setErrors] = useState({});

  //set values when input fields change
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  //set values to default after form submit
  const handleChangeDefault = () => {
    setValues({
      ...values,
      userId: "",
      fName: "",
      lName: "",
      mobNo: "",
      homeAddr: "",
      email: "",
      password: "",
    });
  };

  //set values to form when update button click
  const handleShowSetValues = (member) => {
    setValues({
      ...values,
      userId: member.userid,
      fName: member.firstname,
      lName: member.lastname,
      mobNo: member.mobilenumber,
      homeAddr: member.homeaddress,
      email: member.email,
      password: member.password,
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  //set errors and set is submitting true when add member button click
  const handleSubmit = (event) => {
    setErrors(validateAddMember(values));
    setIsSubmitting(true);
  };

  //if no errors call callback function(submit function on allmembers page)
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return {
    handleChange,
    handleChangeDefault,
    handleSubmit,
    handleShowSetValues,
    values,
    errors,
  };
};

export default useMemberForm;
