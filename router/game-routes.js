'use strict';

var game = require('../lib/game.js');
var BOARD_SIZE = 4;

module.exports = function(app) {
  app.get('/new-game', function(req, res) {
    var board = game.makeBoard(BOARD_SIZE);
    var solutions = game.findWords(board);

    res.json({
      board: board,
      solutions: solutions
    })
  })
}
