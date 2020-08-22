const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const config = require("./_config");

// Define routes
let index = require("./routes/index");
let image = require("./routes/image");

// Initializing the app
const app = express();

const MONGODB_URI =
  process.env.MONGODB_URI || config.mongoURI[app.settings.env];
mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Connected to database: ${MONGODB_URI}`);
    }
  }
);

// View Engine
app.set("view engine", "ejs");

// Set up the public folder;
app.use(express.static(path.join(__dirname, "./public")));

// body parser middleware
app.use(express.json());

app.use("/", index);
app.use("/image", image);

//const port = process.env.PORT || 5000;
app.listen(process.env.PORT || 5000, function () {
  console.log("Server is listening at http://localhost:5000");
});
