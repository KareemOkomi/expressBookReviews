const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,7))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const ISBN = req.params.isbn;
  res.send(books[ISBN])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //get the author name from the params
  const reqAuthor = req.params.author;
  const booksKeys = Object.keys(books);
  let booksfilteredAuthor = [];

  for(let i = 1; i < booksKeys.length; i++){
    if(books[0,i].author === reqAuthor){
        booksfilteredAuthor.push(books[0,i]);
    }
  }

  res.send(booksfilteredAuthor);

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    //get the book title from the params
    const bookTitle = req.params.title;
    const bookKeys = Object.keys(books);
    for(let i = 1; i < bookKeys.lengh; i++){
        if(books[0,i].title === bookTitle){
            res.send(books[0,i]);
            }
        }


});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
