'use strict';
var fs = require('fs');
var game = require('../lib/game.js');
var currentBoard;

var wordMap = fs.readFileSync(__dirname + '/../lib/wordlist.txt', 'utf8')
  .replace(/\r/g, '').split('\n')
  .reduce(function(a, c) {
    a[c] = true;
    return a;
  }, {});

module.exports = function(app) {
  app.get('/new-game', function(req, res) {
    currentBoard = game.makeBoard();

    res.json({
      board: currentBoard
    });
  });

  app.get('/words', function(req, res) {
    res.json(wordMap);
  });

  app.get('/solutions', function(req, res) {
    var solutions = game.findWords(currentBoard);

    res.json({
      solutions: solutions
    });
  });
};
