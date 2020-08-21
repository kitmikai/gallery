const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const config = require("./_config");

// Initializing the app
const app = express();

// Define routes
let index = require("./routes/index");
let image = require("./routes/image");

// connecting the database
// let mongodb_url = 'mongodb://localhost:27017/';
// let dbName = 'darkroom';
// mongoose.connect(`${mongodb_url}${dbName}`,{ useNewUrlParser: true , useUnifiedTopology: true }, (err)=>{
//     if (err) console.log(err)
// });

const MONGODB_URI =
  process.env.MONGODB_URI || config.MONGODB_URI[app.settings.env];
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

// test if the database has connected successfully
let db = mongoose.connection;
db.once("open", () => {
  console.log("Database connected successfully");
});

// View Engine
app.set("view engine", "ejs");

// Set up the public folder;
app.use(express.static(path.join(__dirname, "./public")));

// body parser middleware
app.use(express.json());

app.use("/", index);
app.use("/image", image);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
