var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
if (process.env.DEVELOPMENT_MODE) app.use(require('morgan')('dev'));

app.get('/*.js', function(req, res, next) {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'test/javascript');
  next();
});

app.use(express.static(__dirname + '/build'));

require('./router/game-routes')(app);

app.listen(port, function() {
  console.log('listening on ' + port);
});
