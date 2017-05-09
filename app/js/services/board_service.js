var ActiveTree = require('../../lib/graph');

function BoardService(gameService) {
  var service = {};
  var tree;
  var selectedWord = '';
  var selectedCoordinates = {};

  var wordList = [];

  service.isChosen = function(letter) {
    var loc = letter.location;
    var word = selectedCoordinates;

    return (word[loc[0]] && word[loc[0]][loc[1]]);
  };

  service.initializeBoard = function(height, width) {
    tree = new ActiveTree(height, width);
  };

  service.isActive = function(letter) {
    var loc = letter.location;
    return tree.map[loc[0]] && tree.map[loc[0]][loc[1]];
  };

  service.addLetter = function(letter) {
    var loc = letter.location;
    var selectedCoords = selectedCoordinates;
    var activeLetter = service.isActive(letter);
    var notChosen = !service.isChosen(letter);

    if ((activeLetter || !selectedWord.length) && notChosen) {
      if (!selectedCoords[loc[0]]) selectedCoords[loc[0]] = {};
      selectedCoords[loc[0]][loc[1]] = true;

      tree.deactivateAll();
      tree.activateNode(letter.location);
      return true;
    }
    return false;
  };

  service.verifyLetter = function(letter) {
    var loc = letter.location;
    var selectedCoords = selectedCoordinates;
    var activeLetter = service.isActive(letter);
    var notChosen = !service.isChosen(letter);

    if ((activeLetter || !selectedWord.length) && notChosen) {
      if (!selectedCoords[loc[0]]) selectedCoords[loc[0]] = {};
      selectedCoords[loc[0]][loc[1]] = true;

      tree.deactivateAll();
      tree.activateNode(letter.location);
      return true;
    }

    return false;
  };

  service.deactivateAll = function(board) {
    selectedCoordinates = {};
    selectedWord = '';
    tree.deactivateAll(board);
  };

  service.activateNode = function(location) {
    tree.activateNode(location);
  };

  return service;
}

BoardService.$inject = ['GameService'];

module.exports = BoardService;
