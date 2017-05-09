function GameService($http) {
  var service = {};
  var wordList = [];
  var answers;
  var board;

  service.hasBeenPicked = function(word) {
    return wordList.indexOf(word) !== -1;
  };

  service.isWord = function(word) {
    return answers[word];
  };

  service.newGame = function() {
    return $http.get('/new-game').then(function(data) {
      data = data.data;
      board = data.board;
      answers = data.solutions;

      wordList = [];
      return data;
    });
  };

  service.verifyWord = function(word) {
    var picked = service.hasBeenPicked(word);
    var isWord = service.isWord(word);
    //Only allows word submit if word longer than 2 characters in length,
    //not in either of the word lists and in the solution list.

    if (word.length > 2 && !picked && isWord) {
      vm.wordList.push(word);
    }
  };

  service.getBoard = function() {
    return board;
  };

  return service;
}

GameService.$inject = ['$http'];

module.exports = GameService;
