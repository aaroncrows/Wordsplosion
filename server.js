var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/build'));

app.get('/', function(req, res) {
  res.json({test: 'test'});
});

require('./router/game-routes')(app);

app.listen(3000, function() {
  console.log('listening on 3000');
});
