'use strict';

var expect = require('chai').expect;

var game = require('../lib/game');

describe('Game tests', function() {
  var board = [];
  before(function() {
    var letters = [
      ['T', 'O', 'P'],
      ['S', 'E', 'Z'],
      ['A', 'T', 'D']
    ];

    var row;
    var newLetter;
    for (var i = 0; i < letters.length; i++) {
      board.push([])
      for (var j = 0; j < letters[i].length; j++) {
        newLetter = new game.LetterObject([i, j], letters[i][j]);
        board[i].push(newLetter);
      };
    };

  });

  it('should find a word that goes straight across', function() {
    var results = game.findWords(board);

    expect(results['TOP']).to.eql(true);
  });
  it('should find a word that goes around a corner', function() {
    var results = game.findWords(board);

    expect(results['STOP']).to.eql(true);
  })
  it('should find a word that crosses over itself', function() {
    var results = game.findWords(board);

    expect(results['POSTED']).to.eql(true);
  })
})