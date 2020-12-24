const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateMovieInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.url = !isEmpty(data.file) ? data.file : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  } else if (!Validator.isLength(data.title, { min: 4, max: 24 })) {
    errors.title = "Title must be 4-24 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
