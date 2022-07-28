/*
* @auther durgesh
*/
const express = require('express'),
  fileSystem = require('fs'),
  mongoose = require('mongoose'),
  session = require('express-session'),
  session_store = require('connect-mongo');

const auth = require('./middleware/auth');

// ENVIRONMENT VARIABLES..
const {
  PORT, // PORT
  DB_URI, //MONGO DB URI
  SESSION_SECRET, //SESSION SECRET KEY GENERTE BY SELF
} = process.env;

// Catching Uncaught Errors 
process.on('uncaughtException', (error) => {
  console.log('Exception: ' + error);
});
process.on('unhandledRejection', (error) => {
  console.log('Unhandled: ' + error);
});

//Creating web application..
const web_App = express();

//application listening to port
web_App.listen(PORT || 4040, () => {
  console.log('Express web_App listing..');
});

//generating session store
store = new session_store.create({
  mongoUrl: DB_URI + 'session',
  dbName: 'store'
});

//using express sessions
web_App.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
  store,
}));

//using auth middleware..
web_App.use(auth);

//Handling functions....
fileSystem.readdirSync('./handlers').forEach((file) => {
  var _function;
  if(typeof(_function = require('./handlers/' + file)) == 'function') {
    _function({
      express,
      web_App,
      DB_URI,
      mongoose,
      fileSystem
    });
  }
});
