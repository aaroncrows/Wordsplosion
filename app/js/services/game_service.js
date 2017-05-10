function GameService($http) {
  var service = {};
  var wordList = [];
  var answers;
  var board;
  var score;

  service.hasBeenPicked = function(word) {
    return wordList.indexOf(word) !== -1;
  };

  service.isWord = function(word) {
    return answers[word];
  };

  service.getWordList = function() {
    return wordList;
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
      wordList.push(word);
    }
  };

  service.scoreBoard = function() {
    score = wordList.reduce(function(a, c) {
      return a + (c.length >= 8 ? c.length - 2 : 11);
    }, 0);

    return score;
  };

  service.getBoard = function() {
    return board;
  };

  return service;
}

GameService.$inject = ['$http'];

module.exports = GameService;
