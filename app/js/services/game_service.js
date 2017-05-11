function GameService($http) {
  var service = {};
  var wordList = [];
  var allWords;
  var board;
  var score;

  if (!localStorage.allWords) {
    $http.get('/words').then(function(data) {
      localStorage.allWords = JSON.stringify(data.data);
      allWords = data.data;
    });
  } else {
    allWords = JSON.parse(localStorage.allWords);
  }

  service.hasBeenPicked = function(word) {
    return wordList.indexOf(word) !== -1;
  };

  service.isWord = function(word) {
    return allWords[word.toUpperCase()];
  };

  service.getWordList = function() {
    return wordList;
  };

  service.newGame = function() {
    return $http.get('/new-game').then(function(data) {
      data = data.data;
      board = data.board;

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
      return a + (c.length <= 8 ? c.length - 2 : 11);
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
