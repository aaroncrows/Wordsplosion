'use strict';

var expect = require('chai').expect;

var game = require('../lib/game');

describe('Game tests', function() {
  var board;
  before(function() {
    var letters = [
      ['T', 'O', 'P'],
      ['S', 'Z', 'Z'],
      ['A', 'T', 'E']
    ];
    for (var i = 0; i < letters.length; i++) {
      for (var i = 0; i < letters[i].length; i++) {
        board(letters[i][j]
      };
    };

  });

  it('should find a word that goes straight across', function() {
    var results = game.findWords(board);

    expect(results['top']).to.eql(true);
  })
})