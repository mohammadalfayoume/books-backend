"use strict";
const mongoose = require("mongoose"); // 0 - import mongoose

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  image: { type: String, required: true },
});

const BookModel = mongoose.model("Book", BookSchema); //compile the schem into a model

//seed data (insert initial data)
async function seedData() {
  const firstBook = new BookModel({
    title: "Book1",
    description: "dummy description",
    status: "Avaliable",
    image:
      "https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010__340.jpg",
  });
  const secondBook = new BookModel({
    title: "Book2",
    description: "dummy description",
    status: "not avaliable",
    image:
      "https://cdn.pixabay.com/photo/2015/07/27/20/16/book-863418__340.jpg",
  });
  const thirdBook = new BookModel({
    title: "Book3",
    description: "dummy description",
    status: "Avaliable",
    image:
      "https://cdn.pixabay.com/photo/2014/02/01/17/28/apple-256261__340.jpg",
  });
  await firstBook.save();
  await secondBook.save();
  await thirdBook.save();
}

//   seedData() //call seedData function

module.exports = { BookModel };
