'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:"Title is requierd"
        }
      }
    },
    author: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:"Autor is requierd"
        }
      }
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};
