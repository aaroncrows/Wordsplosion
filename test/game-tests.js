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

    var newLetter;
    for (var i = 0; i < letters.length; i++) {
      board.push([]);
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
  });

  it('should find a word that crosses over itself', function() {
    var results = game.findWords(board);

    expect(results['POSTED']).to.eql(true);
  });

  it('should not reuse letters', function() {
    var results = game.findWords(board);

    expect(results['STATE']).to.eql(undefined); // eslint-disable-line
  });

  it('should make a board of the correct size', function() {
    var board = game.makeBoard(4);

    expect(board).to.have.length(4);
    expect(board[0]).to.have.length(4);
  });

  it('should contain letter objects', function() {
    var board = game.makeBoard(2);

    expect(board[0][0]).to.be.an('object');
  });

  it('should take a passed in letter with letter object constructor', function() {
    var letter = new game.LetterObject([0, 0], 'A');

    expect(letter.letter).to.eql('A');
  });

  it('should put in a letter if one is not passed in', function() {
    var letter = new game.LetterObject([0, 0]);

    expect(letter.letter).to.be.a('string');
  });
});
