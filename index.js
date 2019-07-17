const express = require('express') ;
const pug = require('pug') ;
const path = require('path');
const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const Book = require('./models').Book;

const routes = require('./routes/index');
const books = require('./routes/books');

// make express app
const app = express();

// set express view engine
app.set('view engine','pug');

// set static files
app.use('/static', express.static(path.join(__dirname,'public')));

//parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//method overide
app.use(methodOverride('_method'));


//routing
app.use('/',routes);
app.use('/books',books);

//catch 404 and forward to error handler
app.use((req,res,next)=>{
  const error = new Error("Page Not Found")
  error.status = 404;
  next(error);
});

//err handler module
app.use((err,req,res,next)=>{
  if(err.status === 404){
    //console.log(err.message);
    res.render('page-not-found');
  } else {
    res.render('error');
  }
  next();
});

//sync database before launching server
sequelize.sync().then(function(){
  const port = process.env.PORT || 3000;
  app.listen(port ,() => {
    console.log("Server is running on port:", port);
  });
});
