'use strict';

var game = require('../lib/game.js');

module.exports = function(app) {
  app.get('/new-game', function(req, res) {
    var board = game.makeBoard();
    var solutions = game.findWords(board);
    res.json({
      board: board,
      solutions: solutions
    });
  });
};
