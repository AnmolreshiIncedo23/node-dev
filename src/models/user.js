const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var validator = require("validator");
const jwt = require("jsonwebtoken");

// validator.isEmail('foo@bar.com'); //=> true
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowecase: true,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value))
          throw new Error("Invalid email address" + value);
      },
    },
    password: {
      type: String,
    },
    age: {
      type: Number,
      default:23
    },
    photoUrl: {
      type: String,
      default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqb7c78mM7c4DxqkgODYmlIpCdtmQE7unikQ&s",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("INAVLID PHOTO URL" + value);
        }
      },
    },
    gender: {
      type: String,
      enum:{
        values:["male","female","others"],
        message:`{VALUE} is not a valid gender type`
      }
    },
    skills: {
      type: [String],
    },
    about: {
      type: String,
      default: "this is default about",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEVTINDER", {
    expiresIn: "2d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;

  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
