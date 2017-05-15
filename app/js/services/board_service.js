function BoardService($http, gameService) {
  var ADJACENT_COORDS = [
    [1, 0], [0, 1], [1, 1], [-1, 0],
    [0, -1], [-1, -1], [-1, 1], [1, -1]
  ];

  var service = {};

  var selected = {};
  var boardHeight;
  var boardWidth;
  var lastPicked;
  var board;
  var activeSquares;

  service.isChosen = function(letter) {
    var loc = letter.location;
    return selected[loc[0]] && selected[loc[0]][loc[1]];
  };

  service.initializeBoard = function(height, width) {
    activeSquares = {};
    boardHeight = height;
    boardWidth = width;

    for (var i = 0; i < height; i++) {
      activeSquares[i] = {};
      for (var j = 0; j < width; j++) {
        activeSquares[i][j] = false;
      }
    }

    return activeSquares;
  };

  service.newGame = function() {
    return $http.get('/new-game').then(function(data) {
      data = data.data;
      board = data.board;
      gameService.resetGame();
      service.initializeBoard(data.board.length, data.board[0].length);

      return data;
    });
  };

  service.getBoard = function() {
    return board;
  };

  service.isActive = function(letter) {
    var loc = letter.location;
    return activeSquares[loc[0]] && activeSquares[loc[0]][loc[1]];
  };

  service.addLetter = function(letter) {
    var loc = letter.location;
    var isAdjacent = lastPicked ? service.isActive(letter) : true;
    var chosen = service.isChosen(letter);
    if (chosen || !isAdjacent) return false;

    if (!selected[loc[0]]) selected[loc[0]] = {};
    selected[loc[0]][loc[1]] = true;
    lastPicked = loc;

    service.deactivateAll();
    service.activateNode(letter.location);

    return true;
  };

  service.resetBoard = function() {
    lastPicked = null;
    selected = {};

    service.deactivateAll();
  };

  service.deactivateAll = function() {
    for (var i = 0; i < boardHeight; i++) {
      activeSquares[i] = {};
      for (var j = 0; j < boardWidth; j++) {
        activeSquares[i][j] = false;
      }
    }
  };

  service.activateNode = function(location) {
    var x;
    var y;

    for (var i = 0; i < ADJACENT_COORDS.length; i++) {
      x = location[0] + ADJACENT_COORDS[i][0];
      y = location[1] + ADJACENT_COORDS[i][1];

      if (activeSquares.hasOwnProperty(x) && activeSquares[x].hasOwnProperty(y)) {
        activeSquares[x][y] = true;
      }
    };

    activeSquares[location[0]][location[1]] = true;
  };

  return service;
}

BoardService.$inject = ['$http', 'GameService'];

module.exports = BoardService;
