
//when creating new book, make the data all lower case
const makeAllLowerCase = (book) =>{
  return lowerCasedObject ={
    title:book.title.toLowerCase(),
    author:book.author.toLowerCase(),
    genre:book.genre.toLowerCase(),
    year:book.year
  };
};

//when Listing all the books, make the data shown first-letter-uppercased
const firstLetterUpper = (arrayOfBookObject) => {
  function firstUp(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return arrayOfBookObject.map(bookObject =>{
    return firstLetterUpperObject ={
      title:firstUp(bookObject.title),
      author:firstUp(bookObject.author),
      genre:firstUp(bookObject.genre),
      year:bookObject.year
    }
  });

}

module.exports.makeAllLowerCase = makeAllLowerCase;
module.exports.firstLetterUpper = firstLetterUpper;
