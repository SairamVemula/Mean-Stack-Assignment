const mongoose = require("mongoose");
const Joi = require("joi");

const schemaResume = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
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
  website: {
    type: String,
    maxlength: 255,
    required: true,
  },
  contact_no: {
    type: String,
    minlength: 10,
    maxlength: 10,
    required: true,
  },
  profile_heading: {
    type: String,
  },
  profile_description: {
    type: String,
  },
  skills: {
    type: [String],
  },
  education: {
    type: [String],
  },
});

const Resume = mongoose.model("resume", schemaResume);

function validateResume(data) {
  const schema = {
    name: Joi.string().required().min(5).max(255),
    email: Joi.string().required().min(5).max(255),
    website: Joi.string().required().min(5).max(255),
    contact_no: Joi.string().required().min(10).max(13),
    profile_heading: Joi.string().required().min(5).max(255),
    profile_description: Joi.string().required().min(30),
    skills: Joi.array(),
    education: Joi.array(),
  };
  return Joi.validate(data, schema);
}
function validateResumeUpdate(data) {
  const schema = {
    _id: Joi.string().required().min(5).max(255),
    user_id: Joi.string().required().min(5).max(255),
    name: Joi.string().required().min(5).max(255),
    email: Joi.string().required().min(5).max(255),
    website: Joi.string().required().min(5).max(255),
    contact_no: Joi.string().required().min(10).max(13),
    profile_heading: Joi.string().required().min(5).max(255),
    profile_description: Joi.string().required().min(30),
    skills: Joi.array(),
    education: Joi.array(),
  };
  return Joi.validate(data, schema);
}

exports.schemaResume = schemaResume;
exports.Resume = Resume;
exports.validateResume = validateResume;
exports.validateResumeUpdate = validateResumeUpdate;
