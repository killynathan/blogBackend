import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import flash from 'connect-flash';
const app = express();

import apiRouter from './api/index';
mongoose.connect('mongodb://test:test@ds133321.mlab.com:33321/lifebook');

import './config/passport';

app.use(function(err, req, res, next) {
    console.log(err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//passport
app.use(session({
	secret: 'test',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  next();
});

app.use('/', apiRouter);

app.set('port', (process.env.PORT || 8000));

app.listen(app.get('port'), () => {
	console.log('Express listening on port ', app.get('port'));
});

