const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const mongodb = require('./configs/mongodb');
const app = express();

const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));
// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});


MongoClient.connect(mongodb.url, (err, database) => {
  if (err) {
    return console.log(err);
  }
  require('./app/routes')(app, database);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
});
