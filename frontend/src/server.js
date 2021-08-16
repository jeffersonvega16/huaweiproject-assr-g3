const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const session = require('express-session');

//Inicializations
const app = express();
require('./database');
require('./passport/pass-auth');

app.engine('ejs',engine);
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));   //se puede editar con el formato JSON
app.use(session({
	secret: 'secretsesion',
	resave: false,
	saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
	app.locals.signupMessage = req.flash('signupMessage');
	app.locals.signinMessage = req.flash('signinMessage');
	app.locals.user = req.user;
	next();
  });
  
// routes
app.use('/', require('./routes/routes'));

//start the server API
app.listen(app.get('port'), () => {
	console.log('SERVER ON PORT', app.get('port'));
});