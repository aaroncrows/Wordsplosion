var testWordlistService = {
  init: function() {},
  getWords: function () {
    return { TEST: true };
  }
};

describe('GameService', function() {
  var gameService;

  beforeEach(function() {
    angular.mock.module('app', {
      WordlistService: testWordlistService
    });

    angular.mock.inject(function(_GameService_) {
      gameService = _GameService_;
    });
  });

  it('hasBeenPicked: should verify if the wordlist contains a word', function() {
    gameService.wordList = ['test'];

    var result = gameService.hasBeenPicked('test');

    expect(result).toBe(true);
  });

  it('isWord: should check the word against the list of all words in WordlistService', function() {
    var result = gameService.isWord('test');

    expect(result).toBe(true);
  });

  it('getWordList: should return the wordList', function() {
    gameService.wordList = ['test'];

    var result = gameService.getWordList();

    expect(result).toEqual(['test']);
  });

  it('resetGame: should clear the list and score', function() {
    gameService.wordList = ['test'];
    gameService.score = 42;

    gameService.resetGame();

    expect(gameService.wordList).toEqual([]);
    expect(gameService.score).toBe(0);
  });

  it('scoreBoard: should add the scores for the words in the list', function() {
    gameService.wordList = ['short', 'loooooooooooong'];
    var result = gameService.scoreBoard();

    expect(result).toBe(14);
  });

  it('verifyWord: should not add to list if word has been picked', function() {
    spyOn(gameService, 'hasBeenPicked').and.returnValue(true);
    spyOn(gameService, 'isWord').and.returnValue(true);

    gameService.verifyWord('test');

    expect(gameService.wordList.length).toBe(0);
  });

  it('verifyWord: should not add to list if word is invalid', function() {
    spyOn(gameService, 'hasBeenPicked').and.returnValue(false);
    spyOn(gameService, 'isWord').and.returnValue(false);

    gameService.verifyWord('test');

    expect(gameService.wordList.length).toBe(0);
  });

  it('verifyWord: should not add to list if word is too short', function() {
    spyOn(gameService, 'hasBeenPicked').and.returnValue(false);
    spyOn(gameService, 'isWord').and.returnValue(true);

    gameService.verifyWord('te');

    expect(gameService.wordList.length).toBe(0);
  });

  it('verifyWord: should add to list if word passes checks', function() {
    spyOn(gameService, 'hasBeenPicked').and.returnValue(false);
    spyOn(gameService, 'isWord').and.returnValue(true);

    gameService.verifyWord('test');

    expect(gameService.wordList.length).toBe(1);
  });
});