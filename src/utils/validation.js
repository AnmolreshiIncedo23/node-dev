var validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("ENTER VALID NAME !!!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("ENTER VALID EMAIL !!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("ENTER VALID PASSWORD ");
  }
};

const validateEditProfileData = (req) => {
  console.log("entere");
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "about",
    "skills",
    "age",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;

};
module.exports = { validateSignUpData, validateEditProfileData };
