import { useState, useEffect } from "react";

const useBookForm = (callback, validateAddBook) => {
  //set initial values
  const [values, setValues] = useState({
    bookID: "",
    name: "",
    author: "",
    description: "",
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
      bookID: "",
      name: "",
      author: "",
      description: "",
    });
  };

  //set values to form when update button click
  const handleShowSetValues = (book) => {
    setValues({
      ...values,
      bookID: book.bookcode,
      name: book.name,
      author: book.author,
      description: book.description,
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  //set errors and set is submitting true when add book button click
  const handleSubmit = (event) => {
    setErrors(validateAddBook(values));
    setIsSubmitting(true);
  };

  //if no errors call callback function(submit function on allbook page)
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

export default useBookForm;
