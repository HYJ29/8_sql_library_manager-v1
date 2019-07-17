const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');
const {firstLetterUpper} = require('../customModules/dataBeautify');
const Book = require('../models').Book;

//routers for bookList page containing search function & pagination
router.get('/', (req,res) =>{
  //page initalize
  //set contents per page to be 10
  //page Num is 1 as default if there is no query
  const contentPerPage = 10;
  let pageNum =1;

  //get searchTerm, searchOn(from drop down), and pageNum
  //it there is no pageNum on query, it remain as 1 (default)
  const {searchTerm, searchOn } = req.query;
  pageNum = (req.query.pageNum)? req.query.pageNum : pageNum;

  //get current Url
  //This is for pagination link, not to lose the searched term
  const currentUrl = (searchTerm)
  ? `/?searchTerm=${searchTerm}&searchOn=${searchOn}&`
  : '/?';

  //set searchScope with query if it exists
  //default: order by createdAt with ASC
  //if there is searchTerm, add 'where' term on default setting
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


  Book.findAndCountAll({
    ...searchScope,
    limit: contentPerPage,
    offset: contentPerPage*(pageNum-1)
  })
  .then(function(books){
    //make its first letter uppercase
    const firstLetterUpArrayOfBooks = firstLetterUpper(books.rows);
    //get maxPage number for the pagination
    const maxPage = Math.ceil(books.count/contentPerPage);
    //render it
    res.render('index',{
      books:firstLetterUpArrayOfBooks,
      n:1,
      maxPage,
      currentUrl,
      totalBook:books.count,
      searchTerm
    });
  })
  .catch(function(err){
    res.sendStatus(500);
  });
});

module.exports = router;
