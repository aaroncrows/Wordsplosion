var ActiveTree = require('../../lib/graph');

module.exports = function(app) {
  app.controller('boardController', ['$http', function($http) {
    var vc = this;

    $http.get('/new-game').then(function(data) {
      data = data.data;
      vc.board = data.board;
      vc.answers = data.solutions;
      vc.tree = new ActiveTree(data.board);
    });

    //display word and object map for its letter locations
    vc.selectedWord = '';
    vc.selectedWordObj = {};

    vc.alreadyPicked = false;
    vc.notAWord = false;
    vc.score = 0;

    vc.wordList = [];

    vc.addLetter = function(letter) {
      var loc = letter.location;
      var wordObj = vc.selectedWordObj;
      var activeLetter = vc.isActive(letter);
      var newBoard = !vc.selectedWordObj.anyPicked;
      var notChosen = !vc.isChosen(letter);

      if ((activeLetter || newBoard) && notChosen) {
        vc.selectedWordObj.anyPicked = true;
        vc.selectedWord += letter.letter;
        //clear warnings
        vc.alreadyPicked = false;
        vc.notAWord = false;

        if (!wordObj[loc[0]]) wordObj[loc[0]] = {};
        wordObj[loc[0]][loc[1]] = true;

        vc.tree.deactivateAll(vc.board);
        vc.tree.activateNode(letter.location);
      }
    };

    vc.isActive = function(letter) {
      var loc = letter.location;
      return vc.tree.map[loc[0]][loc[1]];
    };

    //checks picked letters for passed in letter
    vc.isChosen = function(letter) {
      var loc = letter.location;
      var word = vc.selectedWordObj;

      return (word[loc[0]] && word[loc[0]][loc[1]]);
    };

    vc.clearBoard = function() {
      vc.tree.deactivateAll(vc.board);
      vc.selectedWord = '';
      vc.selectedWordObj = {};
      vc.notAWord = false;
      vc.alreadyPicked = false;
    };

    vc.resetBoard = function() {
      vc.wordList = [];
      vc.score = 0;
      vc.clearBoard();
    };

    vc.newGame = function() {
      vc.resetBoard();
      $http.get('/new-game').then(function(data) {
        data = data.data;
        vc.board = data.board;
        vc.answers = data.solutions;
        vc.tree = new ActiveTree(data.board);
      });
    };

    vc.submitWord = function() {
      var picked = vc.wordList.indexOf(vc.selectedWord) !== -1;
      var isWord = vc.answers[vc.selectedWord];

      //Only allows word submit if word longer than 2 characters in length,
      //not in either of the word lists and in the solution list.

      if (vc.selectedWord.length > 2 && !picked && isWord) {
        vc.wordList.push(vc.selectedWord);
      } else if (picked) {
        vc.alreadyPicked = true;
      } else {
        vc.notAWord = true;
      }
      vc.clearBoard();
    };

    vc.scoreBoard = function() {
      vc.score = 0;
      var list = vc.wordList;
      vc.clearBoard();

      for (var i = 0; i < list.length; i++) {
        if (list[i].length < 8) {
          vc.score += list[i].length - 2;
        } else {
          vc.score += 11;
        }
      }

    };

  }]);
};
