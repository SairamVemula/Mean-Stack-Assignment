const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const schemaUser = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 255,
    required: true,
  },
  email: {
    type: String,
    maxlength: 255,
    required: true,
  },
  password: {
    type: String,
    maxlength: 255,
    required: true,
  },
  contact_no: {
    type: String,
    minlength: 10,
    maxlength: 10,
    required: true,
    unique: true,
  },
});

schemaUser.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("User", schemaUser);

function validateRegister(user) {
  const schema = {
    name: Joi.string().required().min(5).max(255),
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(5).max(255),
    contact_no: Joi.string().required().min(10).max(13),
  };
  return Joi.validate(user, schema);
}
function validateLogin(user) {
  const schema = {
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(5).max(255),
  };
  return Joi.validate(user, schema);
}

exports.schemaUser = schemaUser;
exports.User = User;
exports.validateRegister = validateRegister;
exports.validateLogin = validateLogin;
