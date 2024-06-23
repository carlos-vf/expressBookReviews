const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if username or password is missing
  if (!username || !password) {
    return res.status(404).json({ message: "Error registering. No user or password" });
  }

  // Check if both username and password are provided
  if (username && password) {
      // Check if the user does not already exist
      if (isValid(username)) {
          // Add the new user to the users array
          users.push({"username": username, "password": password});
          return res.status(200).json({message: "User successfully registered. Now you can login"});
      } else {
          return res.status(404).json({message: "User already exists!"});
      }
  }
  // Return error if username or password is missing
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {

  // Synchronous
  // resolve(res.send(JSON.stringify(books,null,4)));

  // Promises
  let promise = new Promise((resolve,reject) => {
    resolve(JSON.stringify(books,null,4));
  })
  promise.then((result) => {
    res.status(200).send(result);
  })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  // Synchronous  
  //const isbn = req.params.isbn;
  //res.send(books[isbn]);

  // Promises
  let promise = new Promise((resolve,reject) => {
    const isbn = req.params.isbn;
    resolve(books[isbn]);
  })
  promise.then((result) => {
    res.status(200).send(result);
  })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  // Synchronous
/*   const author = req.params.author;
  let books_from_author = [];
  for (var key in books){
    if(books[key].author == author) {
      books_from_author.push(books[key]);
    };
  };
  res.send(books_from_author); */

  //Promises
  let promise = new Promise((resolve,reject) => {
    const author = req.params.author;
    let books_from_author = [];
    for (var key in books){
      if(books[key].author == author) {
        books_from_author.push(books[key]);
      };
    };
    resolve(books_from_author);
  })
  promise.then((result) => {
    res.status(200).send(result);
  })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  // Synchronous
/*   const title = req.params.title;
  let books_with_title = [];
  for (var key in books){
    if(books[key].title == title) {
      books_with_title.push(books[key]);
    };
  };
  res.send(books_with_title); */

  //Promises
  let promise = new Promise((resolve,reject) => {
    const title = req.params.title;
    let books_with_title = [];
    for (var key in books){
      if(books[key].title == title) {
        books_with_title.push(books[key]);
      };
    };
    resolve(books_with_title);
  })
  promise.then((result) => {
    res.status(200).send(result);
  })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  // Retrieve the review parameter from the request URL and send the corresponding book's details
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
