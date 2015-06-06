'use strict';
var ActiveTree = require('../../lib/graph');

function LetterObject(location) {
  var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var rand = Math.floor(Math.random() * 26);

  this.letter = alpha[rand];
  this.location = location;
}

var board = (function() {
  var board = [];
  var row;
  var rand;

  for (var i = 0; i < 4; i++) {
    row = [];
    for (var j = 0;  j < 4; j++) {
      
      row.push(new LetterObject([i, j]));
    };
    board.push(row)
  };
  return board;
})();


module.exports = function(app) {
  app.controller('boardController', ['$scope', function($scope){

    //game board and map of active nodes
    $scope.board = board;
    $scope.tree = new ActiveTree(board);

    //display word and object map for its letter locations
    $scope.selectedWord = '';
    $scope.selectedWordObj = {};

    $scope.canSubmit = true;
    $scope.score;

    $scope.wordList = [];
    $scope.overflowList = [];

    $scope.addLetter = function(letter) {
      var loc = letter.location;
      var wordObj = $scope.selectedWordObj;

      if(($scope.isActive(letter) || !$scope.selectedWordObj.anyPicked)
          && !$scope.isChosen(letter)){
        $scope.selectedWordObj.anyPicked = true;
        $scope.selectedWord += letter.letter;

        if (!wordObj[loc[0]]) wordObj[loc[0]] = {};
        wordObj[loc[0]][loc[1]] = true;

        $scope.tree.deactivateAll($scope.board);
        $scope.tree.activateNode(letter.location);
      }
    }

    $scope.isActive = function(letter) {
      var loc = letter.location;
      return $scope.tree.map[loc[0]][loc[1]];
    }

    //checks picked letters for passed in letter
    $scope.isChosen = function(letter) {
      var loc = letter.location;
      var word = $scope.selectedWordObj;

      return (word[loc[0]] && word[loc[0]][loc[1]]);
    }

    $scope.clearBoard = function() {
      $scope.tree.deactivateAll($scope.board);
      $scope.selectedWord = '';
      $scope.selectedWordObj = {};
    }

    $scope.backspace = function() {
      $scope.selectedWord = $scope.selectedWord.slice(0, -1);
      console.log($scope.canSubmit);
    }

    $scope.submitWord = function(word) {
      if ($scope.selectedWord.length > 2) {
        var list = $scope.wordList.length <= 7 ? $scope.wordList : $scope.overflowList;
        list.push($scope.selectedWord);
        $scope.clearBoard();
      }
    }

    $scope.scoreBoard = function() {
      var wordList = $scope.wordList.concat($scope.overflowList);
      $scope.wordList = [];
      $scope.overflowList = [];
      $scope.score = 0;
      $scope.clearBoard();

      for (var i = 0; i < wordList.length; i++) {
        if(wordList[i].length < 8) {
          $scope.score += wordList[i].length - 2;
        } else {
          $scope.score += 11;
        }
      };
    }

  }])
}