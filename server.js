if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const db = config.DB[process.env.NODE_ENV] || process.env.DB;
const PORT = config.PORT[process.env.NODE_ENV] || process.env.PORT;
const apiRouter = require('./routes/api');

mongoose.connect(db, function (err) {
  if (!err) {
    console.log(`connected to the Database: ${db}`);
  } else {
    console.log(`error connecting to the Database ${err}`);
  }
});

app.use(bodyParser.json());

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api', apiRouter);

app.use('/*', function (req, res) {
    res.status(404).send({reason: 'ROUTE NOT FOUND'});
});

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});

app.use(function (error, req, res, next) {
    if (error.name === 'CastError') {
        return res.status(400).send({
            reason: `INVALID PATH, ${error.value} NOT FOUND`,
            stack_trace: error
        });
    }
    return next(error);
});

app.use(function (error, req, res) {
    return res.status(500).send({error: error});
});

