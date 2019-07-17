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
