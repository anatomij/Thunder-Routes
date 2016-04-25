var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var parser = require('body-parser');
var userController = require('./users/userController.js');
var journeyController = require('./journey/journeyController.js');
var yelp = require('./utils/yelp');
var cors = require('cors');
var app = express();

app.use(express.static(__dirname + '/../client/webapp'));
app.use(parser.json({limit: '50mb'}));
app.use(morgan('dev'));
app.use(cors());

app.use(userController.addUserToReq);

var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/roadtrippin';
mongoose.connect(mongoUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose is connected');
});

app.post('/api/yelp', yelp.getDestData);
app.post('/api/journey', journeyController.saveJourney);
app.get('/api/journey', journeyController.getAll);
app.post('/signin', userController.signin);
app.post('/signup', userController.signup);
app.use(userController.errorHandler);


var port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log('Listening to: ' + port);
});

module.exports = app;
