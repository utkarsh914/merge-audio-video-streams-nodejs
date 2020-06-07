// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3333;
require('dotenv').config();

//load express
const express = require('express');
// const bodyparser = require('body-parser');
var ejs = require("ejs");

var app = express();

//display these files statically as they are
app.use('/public', express.static(__dirname+'/public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended: false}));



//use routes
app.use('/', require('./routes/index'));
app.use('/video', require('./routes/video'));

app.listen(port, ()=>{
  console.log(`Server up on port ${port}`);
});