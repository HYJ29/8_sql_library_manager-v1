
//when creating new book, make the data all lower case
const makeAllLowerCase = (book) =>{
  const lowerCasedObject ={
    title:book.title.toLowerCase(),
    author:book.author.toLowerCase(),
    genre:book.genre.toLowerCase()
  };
  return Object.assign(book,lowerCasedObject);
};

//when Listing all the books, make the data shown first-letter-uppercased
const firstLetterUpper = (arrayOfBookObject) => {
  function firstUp(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return arrayOfBookObject.map(bookObject =>{
    const firstLetterUpperObject ={
      title:firstUp(bookObject.title),
      author:firstUp(bookObject.author),
      genre:firstUp(bookObject.genre)
    };
    return Object.assign(bookObject,firstLetterUpperObject);
  });

}

module.exports.makeAllLowerCase = makeAllLowerCase;
module.exports.firstLetterUpper = firstLetterUpper;
