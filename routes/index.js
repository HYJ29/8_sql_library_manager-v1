const express = require('express');
const router = express.Router();
const {firstLetterUpper} = require('../customModules/dataBeautify');
const Book = require('../models').Book;

//routers for bookList page
router.get('/', (req,res) =>{
  Book.findAll({order:[['createdAt','ASC']]}).then(function(books){
    const firstLetterUpArrayOfBooks = firstLetterUpper(books);
    res.render('index',{books:firstLetterUpArrayOfBooks});
  }).catch(function(err){
    res.sendStatus(500);
  });
});

module.exports = router;
