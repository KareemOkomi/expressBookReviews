const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


const doesExist =(username)=>{
    let usersWithSame = users.filter((user)=>{
        return user.username === username
    });
    if (usersWithSame.length > 0){
        return true;
    } else {
        return false;
    }
}

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if(username && password){
    if(!doesExist(username)){
        users.push({"username":username,"password":password});
        return res.status(200).json({message:"User registered successfully, you can now login"});
    } else{
        return res.status(400).json({message:"User already exists"});
    }
  }
  return res.status(400).json({message:"Cannot register user!"});
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
    let matchedBook = [];
    const isbnNumbs = Object.keys(books);

    //res.send(books[(isbnNumbs[0])]);
    
     //Use the forEach method to iterate through each isbn
    isbnNumbs.forEach((isbn)=>{
        if(books[(isbn)].title === bookTitle){
            matchedBook.push(books[(isbn)]);
        }
    })

    res.send(JSON.stringify(matchedBook,null,4));

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //get isbn from parameters
  const reqIsbn = req.params.isbn;
  const isbns = Object.keys(books);

  isbns.forEach((isbn)=>{
    if(isbn == reqIsbn){
        //theReview.push(JSON.stringify(books[isbn].reviews));
        res.send(books[isbn].reviews);
    }
  });

});

module.exports.general = public_users;
