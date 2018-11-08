const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//To create an app
var app = express();


hbs.registerPartials(__dirname+'/views/partials');
//for dynamic template
app.set('view engine','hbs');



app.use( (req , res , next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
//  console.log(log);
  fs.appendFile('server.log',log +'\n' , (err) => {
    if(err)
    {
      console.log('Unable to Append');
    }
  });
  next();
});

// app.use( (req , res , next) => {
//   res.render('maintainence.hbs' , {
//     title : 'Currently Under Maintainence',
//     WelcomeMess : 'Will be back within few hours'
//   });
// });

//for static web rendering
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('currentyear',() => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamit',(text) => {
  return text.toUpperCase();
});


//takes 2 argument 1st one is url/path and second one is a function that tells express what to return when someone visits the app
//e.g. in our arrow function we will use 2 params req and res
//res has all info regarding request send to it and res will store response from our end
app.get('/',(req , res) => {
  //res.send('<h1>Hey There!!</h1>');
  // res.send({
  //   name : 'Abhinav',
  //   likes : [
  //     'Anime',
  //     'Games'
  //   ]
  // });
  res.render('home.hbs',{
    title : 'Home Page',
    WelcomeMess : 'Welcome to LocalHost '
  });
});

app.get('/about',(req , res) => {
  //res.send('<h1>Hey There!!</h1>');
  res.render('about.hbs',{
    title : 'About Page',
    });
});

app.get('/bad',(req , res) => {
  //res.send('<h1>Hey There!!</h1>');
  res.send({
    Messgae : 'Error',
    Request : 'Invalid request'
  });
});



//To bind the server to our port with a port number
//Also you need to stop it manually since it will continue to listen always until you stop it explicitely
app.listen(3000);
//takes 2 argument , 2nd can be an arrow function
//since we have created it on local server we will use localhost:port no. to view our app
