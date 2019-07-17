const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');
const {firstLetterUpper} = require('../customModules/dataBeautify');
const Book = require('../models').Book;

const contentPerPage = 10;
//routers for bookList page
router.get('/', (req,res) =>{
  const {searchTerm, searchOn } = req.query;
  let searchScope ={
    order:[['createdAt','ASC']]
  };
  if(searchTerm){
    searchScope['where']=
    (searchOn ==="all")
    ?
      {[Op.or]:[
          {title:{[Op.like]: `%${searchTerm}%`}},
          {author:{[Op.like]: `%${searchTerm}%`}},
          {genre:{[Op.like]: `%${searchTerm}%`}},
          {year:{[Op.like]: `%${searchTerm}%`}}
      ]}
    :
      {[searchOn]: {
          [Op.like]: `%${searchTerm}%`
      }}
  }
  Book.findAll(searchScope).then(function(books){
    const firstLetterUpArrayOfBooks = firstLetterUpper(books);
    res.render('index',{books:firstLetterUpArrayOfBooks,n:1,maxPage:3});
  }).catch(function(err){
    res.sendStatus(500);
  });
});

module.exports = router;
