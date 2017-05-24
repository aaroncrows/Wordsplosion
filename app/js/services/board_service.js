function boardService($http, gameService) {
  var ADJACENT_COORDS = [
    [1, 0], [0, 1], [1, 1], [-1, 0],
    [0, -1], [-1, -1], [-1, 1], [1, -1]
  ];

  var svc = {};

  svc.initializeBoard = function(height, width) {
    svc.activeSquares = {};
    svc.boardHeight = height;
    svc.boardWidth = width;

    for (var i = 0; i < height; i++) {
      svc.activeSquares[i] = {};
      for (var j = 0; j < width; j++) {
        svc.activeSquares[i][j] = false;
      }
    }
  };

  svc.newGame = function() {
    return $http.get('/new-game').then(function(response) {
      var data = response.data;
      svc.board = data.board;
      gameService.resetGame();
      svc.initializeBoard(data.board.length, data.board[0].length);

      return data;
    });
  };

  svc.addLetter = function(letter) {
    var loc = letter.location;
    var isAdjacent = svc.lastPicked ? svc.isActive(letter) : true;
    var chosen = svc.isChosen(letter);

    if (chosen || !isAdjacent) return false;

    if (!svc.selected[loc[0]]) svc.selected[loc[0]] = {};
    svc.selected[loc[0]][loc[1]] = true;
    svc.lastPicked = loc;

    svc.deactivateAll();
    svc.activateNode(letter.location);

    return true;
  };

  svc.activateNode = function(location) {
    var x;
    var y;

    for (var i = 0; i < ADJACENT_COORDS.length; i++) {
      x = location[0] + ADJACENT_COORDS[i][0];
      y = location[1] + ADJACENT_COORDS[i][1];

      if (svc.activeSquares.hasOwnProperty(x) && svc.activeSquares[x].hasOwnProperty(y)) {
        svc.activeSquares[x][y] = true;
      }
    };

    svc.activeSquares[location[0]][location[1]] = true;
  };

  svc.getBoard = function() {
    return svc.board;
  };

  svc.isChosen = function(letter) {
    var loc = letter.location;
    return svc.selected[loc[0]] && svc.selected[loc[0]][loc[1]];
  };

  svc.isActive = function(letter) {
    var loc = letter.location;
    return svc.activeSquares[loc[0]] && svc.activeSquares[loc[0]][loc[1]];
  };

  svc.deactivateAll = function() {
    for (var i = 0; i < svc.boardHeight; i++) {
      svc.activeSquares[i] = {};
      for (var j = 0; j < svc.boardWidth; j++) {
        svc.activeSquares[i][j] = false;
      }
    }
  };

  svc.resetBoard = function() {
    svc.lastPicked = null;
    svc.selected = {};

    svc.deactivateAll();
  };

  return svc;
}

boardService.$inject = ['$http', 'gameService'];

module.exports = boardService;
