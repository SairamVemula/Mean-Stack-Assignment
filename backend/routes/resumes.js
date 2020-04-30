const express = require("express");
const auth = require("../middleware/auth");

const _ = require("lodash");
const {
  Resume,
  validateResume,
  validateResumeUpdate,
} = require("../models/resume");
const { User } = require("../models/user");
const router = express.Router();

//GETTING RESUME
router.get("/getResume/:id", async (req, res) => {
  const resume = await Resume.findById(req.params.id);
  if (!resume)
    return res
      .status(400)
      .send({ success: false, message: "Resume Not Found" });

  res.send({ success: true, data: resume });
});

//GET RESUMES FOR DASHBOARD
router.get("/users", auth, async (req, res) => {
  // router.get("/users/:id", async (req, res) => {
  // console.log("req came");
  const resumes = await Resume.find({ user_id: req.user._id });
  // console.log(req.params.id);
  // const resumes = await Resume.find({ user_id: req.params.id });
  if (!resumes)
    return res
      .status(400)
      .send({ success: false, message: "Resumes Not Found" });
  res.send({ success: true, data: resumes });
});
//inserting resumes
router.post("/add", auth, async (req, res) => {
  if (!req.body) return res.status(400).send({ message: "No Body" });
  const { error } = validateResume(req.body);

  if (error)
    return res
      .status(400)
      .send({ success: false, message: "some Error", error: error });

  const user = await User.findById(req.user._id);
  if (!user)
    return res.status(400).send({ success: false, message: "Your Not a User" });

  let resume = new Resume({
    user_id: req.user._id,
    name: req.body.name,
    email: req.body.email,
    website: req.body.website,
    contact_no: req.body.contact_no,
    profile_heading: req.body.profile_heading,
    profile_description: req.body.profile_description,
    skills: req.body.skills,
    education: req.body.education,
  });
  await resume.save();
  res.send({ success: true, data: resume });
});

//UPDATING RESUME
router.put("/resumeUpdate", auth, async (req, res) => {
  if (!req.body) return res.status(400).send({ message: "No Body" });
  const { error } = validateResumeUpdate(req.body);

  if (error)
    return res
      .status(400)
      .send({ success: false, message: "some Error", error: error });

  const user = await User.findById(req.user._id);
  if (!user)
    return res.status(400).send({ success: false, message: "Your Not a User" });

  let resume = await Resume.findByIdAndUpdate(
    req.body._id,
    {
      name: req.body.name,
      email: req.body.email,
      website: req.body.website,
      contact_no: req.body.contact_no,
      profile_heading: req.body.profile_heading,
      profile_description: req.body.profile_description,
      skills: req.body.skills,
      education: req.body.education,
    },
    { new: true }
  );

  if (!resume)
    return res
      .status(404)
      .send({ success: false, message: "Resumes Not Found" });
  // console.log(resume);

  res.send({ success: true, data: resume });
});

module.exports = router;
