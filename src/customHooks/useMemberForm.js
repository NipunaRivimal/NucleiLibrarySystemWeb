import { useState, useEffect } from "react";

const useMemberForm = (callback, validateAddMember) => {
  const [values, setValues] = useState({
    userId: "",
    fName: "",
    lName: "",
    mobNo: "",
    homeAddr: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

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

  const handleSubmit = (event) => {
    setErrors(validateAddMember(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return {
    handleChange,
    handleSubmit,
    handleShowSetValues,
    values,
    errors,
  };
};

export default useMemberForm;
