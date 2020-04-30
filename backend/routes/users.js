const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validateRegister, validateLogin } = require("../models/user");
const router = express.Router();

//REGISTER
router.post("/register", async (req, res) => {
  if (!req.body) return res.status(400).send({ message: "No Body" });
  const { error } = validateRegister(req.body);

  if (error) return res.status(400).send(error);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send({success:false, message:"Email is already registered..."});

  user = await User.findOne({ mobile: req.body.contact_no });
  if (user) return res.status(400).send({success:false, message:"Mobile no is already registered..."});

  // console.log(req.body);

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    contact_no: req.body.contact_no,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send({success: true,data:_.pick(user, ["_id", "name", "email", "contact_no"])});
});

//LOGIN
router.post("/login", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({success:false, message:"Invalid Email or Password"});

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send({success:false, message:"Invalid Email or Password"});
  // console.log(req.body);

  const token = user.generateAuthToken();
  res.send({success:true, message: "Login Successful", sessionToken: token });
});

module.exports = router;
