import { useState, useEffect } from "react";

const useLoginForm = (callback, validateAddBook) => {
  //set initial values
  const [values, setValues] = useState({
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  //set errors and set issubmitting true when login button click
  const handleSubmit = (event) => {
    setErrors(validateAddBook(values));
    setIsSubmitting(true);
  };

  //if no errors call callback function(login function on login page)
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useLoginForm;
