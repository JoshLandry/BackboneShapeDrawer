var engines = require('consolidate');
var express = require('express');
// var routes = require('./routes');
var bodyparser = require('body-parser');

// var mongoose = require('mongoose');

var app = express();

// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/shapearranger_development');

app.set('build', __dirname + '/build');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.use(express.static('build'));

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.use(bodyparser.json());

app.get('/', function(request, response) {
  response.render('./Index.html')
  console.log("loaded");
});