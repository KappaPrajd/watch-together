const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRoomInput(data) {
  let errors = {};

  data.id = !isEmpty(data.id) ? data.id : "";

  if (Validator.isEmpty(data.id)) {
    errors.id = "Id is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
