const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateMovieInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.url = !isEmpty(data.url) ? data.url : "";

  //title checks
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  } else if (!Validator.isLength(data.title, { min: 4, max: 24 })) {
    errors.title = "Title must be 4-24 characters";
  }
  //url checks
  if (Validator.isEmpty(data.url)) {
    errors.url = "URL field is required";
  } else if (!Validator.isURL(data.url)) {
    errors.url = "Invalid URL";
  } else if (data.url.slice(-4) != ".mp4") {
    errors.url = "File must be MP4 format";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
