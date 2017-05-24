var testboardService = {
  addLetter: function() {},
  resetBoard: function() {},
  newGame: function() { return { then: function() {} }; }
};

var testgameService = {
  isWord: function() {},
  verifyWord: function() {},
  hasBeenPicked: function() {},
  scoreBoard: function() {}
};

describe('BoardController', function() {
  var boardCtrl;

  beforeEach(function() {
    angular.mock.module('app');
    angular.mock.inject(function(_$controller_) {
      boardCtrl = _$controller_('boardController', {
        boardService: testboardService,
        gameService: testgameService
      });
    });
  });

  it('should initialize with the correct values', function() {
    expect(boardCtrl.alreadyPicked).toBe(false);
    expect(boardCtrl.notAWord).toBe(false);
    expect(boardCtrl.selectedWord).toBe('');
  });

  it('addLetter: should add a letter to selected word', function() {
    var addLetter = spyOn(testboardService, 'addLetter').and.returnValue(true);
    boardCtrl.addLetter({letter: 't'});

    expect(addLetter).toHaveBeenCalled();
    expect(boardCtrl.selectedWord).toBe('t');
  });

  it('clearBoard: should reset defaults', function() {
    var resetBoard = spyOn(testboardService, 'resetBoard');

    boardCtrl.alreadyPicked = true;
    boardCtrl.notAWord = true;
    boardCtrl.selectedWord = 'test';

    boardCtrl.clearBoard();

    expect(resetBoard).toHaveBeenCalled();
    expect(boardCtrl.alreadyPicked).toBe(false);
    expect(boardCtrl.notAWord).toBe(false);
    expect(boardCtrl.selectedWord).toBe('');
  });

  it('newGame: should reset', function() {
    var fakePromise = { then: function(fn) { fn(); } };
    var newGame = spyOn(testboardService, 'newGame').and.returnValue(fakePromise);
    var clearBoard = spyOn(boardCtrl, 'clearBoard');

    boardCtrl.newGame();

    expect(newGame).toHaveBeenCalled();
    expect(clearBoard).toHaveBeenCalled();
  });

  it('submitWord: should set notAWord to true on invalid word', function() {
    var verifyWord = spyOn(testgameService, 'verifyWord');
    var isWord = spyOn(testgameService, 'isWord').and.returnValue(false);

    boardCtrl.selectedWord = 'xxxx';
    boardCtrl.submitWord();

    expect(isWord).toHaveBeenCalled();
    expect(verifyWord).not.toHaveBeenCalled();

    expect(boardCtrl.notAWord).toBe(true);
  });

  it('submitWord: should set alreadyPick to true on picked letter', function() {
    var verifyWord = spyOn(testgameService, 'verifyWord');

    var hasBeenPicked = spyOn(testgameService, 'hasBeenPicked').and.returnValue(true);
    spyOn(testgameService, 'isWord').and.returnValue(true);

    boardCtrl.selectedWord = 'test';
    boardCtrl.submitWord();

    expect(hasBeenPicked).toHaveBeenCalled();
    expect(verifyWord).not.toHaveBeenCalled();

    expect(boardCtrl.alreadyPicked).toBe(true);
  });

  it('submitWord: should set tooShort to true for length less than 3', function() {
    var verifyWord = spyOn(testgameService, 'verifyWord');

    boardCtrl.selectedWord = '';
    boardCtrl.submitWord();

    expect(verifyWord).not.toHaveBeenCalled();

    expect(boardCtrl.tooShort).toBe(true);
  });

  it('submitWord: should verify word if it passes both checks', function() {
    var isWord = spyOn(testgameService, 'isWord').and.returnValue(true);
    var hasBeenPicked = spyOn(testgameService, 'hasBeenPicked').and.returnValue(false);
    var verifyWord = spyOn(testgameService, 'verifyWord');
    var clearBoard = spyOn(boardCtrl, 'clearBoard');

    boardCtrl.selectedWord = 'test';

    boardCtrl.submitWord();

    expect(isWord).toHaveBeenCalled();
    expect(hasBeenPicked).toHaveBeenCalled();
    expect(clearBoard).toHaveBeenCalled();
    expect(verifyWord).toHaveBeenCalled();
  });

  it('scoreBoard: should score the board', function() {
    var clearBoard = spyOn(boardCtrl, 'clearBoard');
    var scoreBoard = spyOn(testgameService, 'scoreBoard').and.returnValue(42);

    boardCtrl.scoreBoard();

    expect(clearBoard).toHaveBeenCalled();
    expect(scoreBoard).toHaveBeenCalled();

    expect(boardCtrl.score).toBe(42);
  });
});
