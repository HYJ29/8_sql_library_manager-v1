# general
1. npm install, npm start would launch the server on localhost:3000 

2.Pagination & searching function on routes/index/js 

3.Put 'total books' to see how many books are in the database or searched result

# issues 
1. about seeder file 

I think in the library.db, It has some seed datas in it. But before I realized it, 
I thought I had to implement some seed data. 
So I excuted just like below(deleted original seed and applied my seed file) and had some error, It’s is not needed to accomplish this assignment, 
but I’m curious why it doesn’t work well. 

————define data-----------------
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};

——————seeder file------------------
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Books',[{
     title:"A Brief History of Time",
     author:"Stephen Hqwking",
     genre:"Non Fiction",
     year:1988,
     createdAt:Date.now(),
     updatedAT:Date.now()
   },{
     title:"Armada",
     author:"Ernest Cline",
     genre:"Science Fiction",
     year:2015,
     createdAt:Date.now(),
     updatedAT:Date.now()
   },{
     title:"Emma",
     author:"Jane Austen",
     genre:"Classic",
     year:1815,
     createdAt:Date.now(),
     updatedAT:Date.now()
   }],{});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Books',null,{});
  }
};

——————error———————
Executing (default): SELECT `id`, `title`, `author`, `genre`, `year`, `createdAt`, `updatedAt` FROM `Books` AS `Book` ORDER BY `Book`.`title` DESC;
Unhandled rejection TypeError: date.includes is not a function
    at parse (/Users/hyj/Documents/GitHub/8/sql_library_manager-v1/node_modules/sequelize/lib/dialects/sqlite/data-types.js:54:17)
    at Query.applyParsers (/Users/hyj/Documents/GitHub/8/sql_library_manager-v1/node_modules/sequelize/lib/dialects/sqlite/query.js:360:14)
    at _.mapValues (/Users/hyj/Documents/GitHub/8/sql_library_manager-v1/node_modules/sequelize/lib/dialects/sqlite/query.js:144:20)
    at /Users/hyj/Documents/GitHub/8/sql_library_manager-v1/node_modules/lodash/lodash.js:13401:38
    at /Users/hyj/Documents/GitHub/8/sql_library_manager-v1/node_modules/lodash/lodash.js:4905:15
    at baseForOwn (/Users/hyj/Documents/GitHub/8/sql_library_manager-v1/node_modules/lodash/lodash.js:2990:24)
    at Function.mapValues (/Users/hyj/Documents/GitHub/8/sql_library_manager-v1/node_modules/lodash/lodash.js:13400:7)
    at results.map.result (/Users/hyj/Documents/GitHub/8/sql_library_manager-v1/node_modules/sequelize/lib/dialects/sqlite/query.js:118:18)
    at Array.map (<anonymous>)
    at Query._handleQueryResponse (/Users/hyj/Documents/GitHub/8/sql_library_manager-v1/node_modules/sequelize/lib/dialects/sqlite/query.js:117:25)
    at Statement.afterExecute (/Users/hyj/Documents/GitHub/8/sql_library_manager-v1/node_modules/sequelize/lib/dialects/sqlite/query.js:247:31)
    at Statement.replacement (/Users/hyj/Documents/GitHub/8/sql_library_manager-v1/node_modules/sqlite3/lib/trace.js:19:31)
    at Statement.replacement (/Users/hyj/Documents/GitHub/8/sql_library_manager-v1/node_modules/sqlite3/lib/trace.js:19:31)




2. endless logging error 

I’m trying to make error handler which render error page and log the error on the console.
But when I put the code “console.log(err.message);” on the error handler, it keeps logging “Not Found” which is err message defined just previous module. The  logging never end… and I don’t know what’s happening here

below is the code concerned 

//catch 404 and forward to error handler
app.use((req,res,next)=>{
 const error = new Error(“Page Not Found”)
 error.status = 404;
 next(error);
});

//err handler module
app.use((err,req,res,next)=>{
 if(err.status === 404){
   console.log(err.message);
   res.render(‘page-not-found’);
 } else {
   res.render(‘error’);
 }
 next();
});
