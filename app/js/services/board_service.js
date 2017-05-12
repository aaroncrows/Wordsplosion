var ActiveSquareMap = require('../../lib/active_square_map');

function BoardService($http, gameService) {
  var service = {};
  var selectedWord = '';
  var selectedCoordinates = {};
  var lastPicked;
  var board;
  var tree;

  service.newGame = function() {
    return $http.get('/new-game').then(function(data) {
      data = data.data;
      board = data.board;
      gameService.resetGame();

      return data;
    });
  };

  service.isChosen = function(letter) {
    var loc = letter.location;
    var word = selectedCoordinates;

    return (word[loc[0]] && word[loc[0]][loc[1]]);
  };

  service.initializeBoard = function(height, width) {
    tree = new ActiveSquareMap(height, width);
  };

  service.getBoard = function() {
    return board;
  };

  service.isActive = function(letter) {
    var loc = letter.location;
    return tree.map[loc[0]] && tree.map[loc[0]][loc[1]];
  };

  service.addLetter = function(letter) {
    var loc = letter.location;
    var selectedCoords = selectedCoordinates;
    var activeLetter = selectedWord.length ? service.isActive(letter) : true;
    var notChosen = !service.isChosen(letter);
    var isAdjacent =  lastPicked ? tree.isAdjacent(loc, lastPicked) : true;

    if (activeLetter && notChosen && isAdjacent) {
      if (!selectedCoords[loc[0]]) selectedCoords[loc[0]] = {};
      selectedCoords[loc[0]][loc[1]] = true;
      lastPicked = loc;

      tree.deactivateAll();
      tree.activateNode(letter.location);
      return true;
    }

    return false;
  };

  service.deactivateAll = function(board) {
    selectedCoordinates = {};
    lastPicked = null;

    tree.deactivateAll(board);
  };

  service.activateNode = function(location) {
    tree.activateNode(location);
  };


  return service;
}

BoardService.$inject = ['$http', 'GameService'];

module.exports = BoardService;
