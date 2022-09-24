"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const handlers= require("./handlers")


const app = express();
// app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors()); //make my server open for any request
require("dotenv").config();
const mongoose = require("mongoose"); // 0 - import mongoose

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGOOSE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); // 1 - connect mongoose with DB (301-books)

app.get("/", homeHandler);
app.get("/test", testHandler);
app.get("/getUserBooks/:email", handlers.getUserBooksHandler);
app.post("/addBooks", handlers.addBooksHandler)
app.delete("/deleteBooks/:id/:email",handlers.deleteBooksHandler)
app.put("/updateBooks/:id/:email", handlers.updateBooksHandler)
app.get("*", defaultHandler);


// http://localhost:3001/
function homeHandler(req, res) {
  res.send("home request received");
}

// http://localhost:3001/test
function testHandler(req, res) {
  res.send("test request received");
}

// http://localhost:3001/*
function defaultHandler(req, res) {
  res.send("page not found");
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
