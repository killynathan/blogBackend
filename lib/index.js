import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
const server = express();

import apiRouter from './api/index';
mongoose.connect('mongodb://test:test@ds133321.mlab.com:33321/lifebook');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  next();
});

server.use('/', apiRouter);

server.listen(8000, () => {
	console.log('Express listening on port ', 8000);
});

