const express = require('express');
const router = express.Router();
const {makeAllLowerCase} = require('../customModules/dataBeautify');
const Book = require('../models').Book;

//routers for create-new-book page
router.get('/new', (req,res) =>{
  res.render('new-book',{book:Book.build()});
});

//router for post now book
router.post('/new', (req,res,next) =>{
  Book.create(makeAllLowerCase(req.body)).then(function(book){
    res.redirect('/');
  }).catch(function(err){
    if(err.name==="SequelizeValidationError"){
      res.render('new-book',{
        book:req.body, //when errors, remain the input fields value
        errors:err.errors
      });
    } else {
      throw err;
    }
  }).catch(function(err){
    next(err);
  });
});

//router for update-book page
router.get('/:id', (req,res,next) =>{
  Book.findByPk(req.params.id).then(function(book){
    res.render('update-book',{book});
  }).catch(function(err){
    next(err);
  }); // render server error page
});

//router for post updated-book
router.put('/:id', (req,res,next) =>{
  Book.findByPk(req.params.id).then(function(book){
    book.update(req.body).then(function(book){
      res.redirect(`/`);
    });
  }).catch(function(err){
    next(err);
  });
});

//router for delete
router.post('/:id/delete', (req,res,next) =>{
  Book.findByPk(req.params.id).then(function(book){
    book.destroy();
  }).then(function(){
    res.redirect('/')
  }).catch(function(err){
    next(err);
  });
});

module.exports = router;
