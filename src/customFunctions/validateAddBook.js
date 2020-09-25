export default function validateAddBook(values) {
  let errors = {};

  if (!values.bookID) {
    errors.bookID = "Book ID is required!";
  }
  if (!values.name) {
    errors.name = "Name is required!";
  }
  if (!values.author) {
    errors.author = "Author is required!";
  }
  if (!values.description) {
    errors.description = "Description is required!";
  }
  return errors;
}
