const express = require("express");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const users = require("./routes/users");
const resumes = require("./routes/resumes");
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");
const bearerToken = require("express-bearer-token");
const app = express();

if (!config.get("mongodbSeverLink")) {
  console.error("FATAL ERROR: mongodbSeverLink is not defined");
  process.exit(1);
}
const mongoURI = config.get("mongodbSeverLink");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("mongoDB connected..."))
  .catch((err) => console.log("Could not connect to MongoDB...  :" + err));

app.use(cors());
app.use(express.json());
app.use(bearerToken());

app.use("/api/users", users);
app.use("/api/resumes", resumes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
