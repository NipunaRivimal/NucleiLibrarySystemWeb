import { useState, useEffect } from "react";

const useBookForm = (callback, validateAddBook) => {
  const [values, setValues] = useState({
    bookID: "",
    name: "",
    author: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeDefault = () => {
    setValues({
      ...values,
      bookID: "",
      name: "",
      author: "",
      description: "",
    });
  };

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

  const handleSubmit = (event) => {
    setErrors(validateAddBook(values));
    setIsSubmitting(true);
  };

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
