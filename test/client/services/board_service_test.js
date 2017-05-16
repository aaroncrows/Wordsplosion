var testGameService = {
  resetGame: function() {}
};

var testWordlistService = {
  init: function() {}
};

describe('BoardService', function() {
  var boardService;
  var $httpBackend;

  beforeEach(function() {
    angular.mock.module('app', {
      WordlistService: testWordlistService,
      GameService: testGameService
    });

    angular.mock.inject(function(_BoardService_, _$httpBackend_) {
      boardService = _BoardService_;
      $httpBackend = _$httpBackend_;
    });
  });

  it('initializeBoard: should initialize a map of active squares', function() {
    boardService.initializeBoard(1, 1);

    expect(boardService.activeSquares[0][0]).toBe(false);
  });

  it('initializeBoard: should set board height and width', function() {
    boardService.initializeBoard(1, 1);

    expect(boardService.boardHeight).toBe(1);
    expect(boardService.boardWidth).toBe(1);
  });

  it('isChosen: should return true if a letters coordinates are selected', function() {
    boardService.selected = { 0: { 0: true } };

    var results = boardService.isChosen({ location: [0, 0]});

    expect(results).toBe(true);
  });

  it('isActive: should return true if a square has been activated', function() {
    boardService.activeSquares = { 0: {0: true} };

    var results = boardService.isActive({ location: [0,0] });

    expect(results).toBe(true);
  });

  it('deactivateAll: should reset all active squares', function() {
    boardService.activeSquares = { 0: { 0: true } };
    boardService.boardHeight = 1;
    boardService.boardWidth = 1;

    boardService.deactivateAll();

    expect(boardService.activeSquares[0][0]).toBe(false);
  });

  it('resetBoard: should reset word values', function() {
    var deactivateAll = spyOn(boardService, 'deactivateAll');
    boardService.selected = null;
    boardService.lastPicked = 'test';

    boardService.resetBoard();

    expect(boardService.selected).toEqual({});
    expect(boardService.lastPicked).toBe(null);
    expect(deactivateAll).toHaveBeenCalled();
  });

  it('getBoard: should return the board', function() {
    boardService.board = 'test';

    expect(boardService.getBoard()).toBe('test');
  });

  it('addLetter: should return false if letter is chosen', function() {
    spyOn(boardService, 'isChosen').and.returnValue(true);
    spyOn(boardService, 'isActive').and.returnValue(true);

    expect(boardService.addLetter({ location: null })).toBe(false);
  });

  it('addLetter: should return false if letter is not active', function() {
    boardService.lastPicked = true;

    spyOn(boardService, 'isChosen').and.returnValue(false);
    spyOn(boardService, 'isActive').and.returnValue(false);

    expect(boardService.addLetter({ location: null })).toBe(false);
  });

  it('addLetter: should return true and add the letter to selected', function() {
    boardService.selected = {};

    spyOn(boardService, 'isChosen').and.returnValue(false);
    spyOn(boardService, 'activateNode');
    spyOn(boardService, 'deactivateAll');

    var result = boardService.addLetter({ location: [0, 0]});

    expect(boardService.lastPicked).toEqual([0, 0]);
    expect(boardService.selected[0][0]).toBe(true);
    expect(result).toBe(true);
  });

  it('activateNode: should set active square and adjacent to true', function() {
    boardService.activeSquares = [
      [false, false, false],
      [false, false, false],
      [false, false, false]
    ];

    boardService.activateNode([1, 1]);

    var result = boardService.activeSquares.every(function(row) {
      return row.every(function(square) {
        return square;
      });
    });

    expect(result).toBe(true);
  });

  it('newGame: should fetch board data', function() {
    var testBoard = [[null]];
    var testResponse = {
      board: testBoard
    };
    var resetGame = spyOn(testGameService, 'resetGame');
    var initializeBoard = spyOn(boardService, 'initializeBoard');

    $httpBackend.expectGET('/new-game').respond(200, testResponse);
    boardService.newGame();
    $httpBackend.flush();
    expect(boardService.board).toEqual(testBoard);
    expect(resetGame).toHaveBeenCalled();
    expect(initializeBoard).toHaveBeenCalled();
  });
});
