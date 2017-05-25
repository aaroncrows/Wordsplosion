var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
if (process.env.DEVELOPMENT_MODE) app.use(require('morgan')('dev'));
app.use(express.static(__dirname + '/build'));

require('./router/game-routes')(app);

app.listen(port, function() {
  console.log('listening on ' + port);
});
