"use strict";
const modelSchema = require("./bookModel");

// // http://localhost:3001/getAllBooks
// function getAllBooksHandler(req, res) {
//   modelSchema.BookModel.find({}, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.status(200).send(result);
//     }
//   });
// }


// http://localhost:3001/getUserBooks
function getUserBooksHandler(req, res) {
  const {email}= req.params
  modelSchema.BookModel.find({email}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(result);
    }
  });
}

// http://localhost:3001/addBooks
async function addBooksHandler(req, res) {
  const { title, description, status, image,email } = req.body; //Destructuring assignment
  await modelSchema.BookModel.create({
    title: title,
    description: description,
    status: status,
    image: image,
    email: email
  });

  modelSchema.BookModel.find({email}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(result);
      res.status(200).send(result);
    }
  });
}

function deleteBooksHandler(req, res) {
  const { id,email } = req.params;
  modelSchema.BookModel.deleteOne({ _id: id,email }, (err, result) => {
    modelSchema.BookModel.find({email}, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(result);
      }
    });
  });
}

function updateBooksHandler(req, res) {
  const { id,email } = req.params;
  const { title, description, status, image } = req.body;
  modelSchema.BookModel.findByIdAndUpdate(
    { _id: id,email },
    { title, description, status, image },
    (err, result) => {
      modelSchema.BookModel.find({email}, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          //   console.log(result);
          res.status(200).send(result);
        }
      });
    }
  );
}
module.exports = {
  getUserBooksHandler,
  addBooksHandler,
  deleteBooksHandler,
  updateBooksHandler,
};
