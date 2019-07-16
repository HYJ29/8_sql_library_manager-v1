const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

//routers for bookList page
router.get('/', (req,res) =>{
  Book.findAll({order:[['title','ASC']]}).then(function(books){
    res.render('index',{books});
  }).catch(function(err){
    res.sendStatus(500);
  });
});

module.exports = router;
