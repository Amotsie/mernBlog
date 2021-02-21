const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const BlogPost = require("./models/plogPost");
const routes = require("./routes/api");
const cors = require("cors");
const { json } = require("body-parser");
//connect to DB
require("./connection")();

const app = express();
const PORT = process.env.PORT || 8080;

//Middlewares
app.use(cors());
app.use(json());
app.use(express.urlencoded({ extended: false }));

//Deployment options
if (process.env.NODE_ENV == "production") {
  app.use(express.static("./client/build"));
}

//HTTP request logger
app.use(morgan("tiny"));
app.use("/api", routes);

app.listen(PORT, () => console.log("server started"));
