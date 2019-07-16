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
          msg:"Author is requierd"
        }
      }
    },
    genre: DataTypes.STRING,
    year: {
      type:DataTypes.INTEGER,
      validate:{
        len:{
          args:4,
          msg:"Year should be 4-length integer. ex)2010, 1984 ..."
        }
      }
    }
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};
