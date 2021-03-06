function gameService($http, WordListService) {
  var svc = {};
  svc.wordList = [];
  svc.score = 0;

  svc.hasBeenPicked = function(word) {
    return svc.wordList.indexOf(word) !== -1;
  };

  svc.isWord = function(word) {
    // Qu square has a lower case letter and everything in the wordlist is
    // upper case.
    return WordListService.getWords()[word.toUpperCase()];
  };

  svc.getWordList = function() {
    return svc.wordList;
  };

  svc.resetGame = function() {
    svc.wordList = [];
    svc.score = 0;
  };

  svc.verifyWord = function(word) {
    var picked = svc.hasBeenPicked(word);
    var isWord = svc.isWord(word);
    //Only allows word submit if word longer than 2 characters in length,
    //not in either of the word lists and in the solution list.
    if (word.length > 2 && !picked && isWord) {
      svc.wordList.push(word);
      return true;
    }

    return false;
  };

  svc.scoreBoard = function() {
    svc.score = svc.wordList.reduce(function(a, c) {
      return a + (c.length <= 8 ? c.length - 2 : 11);
    }, 0);

    return svc.score;
  };

  return svc;
}

gameService.$inject = ['$http', 'wordlistService'];

module.exports = gameService;
