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
    $scope.board = board;
    $scope.tree = new ActiveTree(board);


    $scope.selectedWord = '';
    $scope.canSubmit = true;
    $scope.score;

    $scope.wordList = [];
    $scope.overflowList = [];

    $scope.addLetter = function(letter) {
      $scope.selectedWord += letter.letter;
      $scope.tree.activateNode(letter.location);
      console.log($scope.isActive(letter));
    }

    $scope.isActive = function(letter) {
      var loc = letter.location;
      return $scope.tree.map[loc[0]][loc[1]];
    }

    $scope.clearWord = function() {
      $scope.selectedWord = '';
    }

    $scope.backspace = function() {
      $scope.selectedWord = $scope.selectedWord.slice(0, -1);
      console.log($scope.canSubmit);
    }

    $scope.submitWord = function(word) {
      if ($scope.selectedWord.length > 2) {
        var list = $scope.wordList.length <= 7 ? $scope.wordList : $scope.overflowList;
        list.push($scope.selectedWord);
        $scope.selectedWord = '';
      }
    }

    $scope.scoreBoard = function() {
      var wordList = $scope.wordList.concat($scope.overflowList);
      $scope.wordList = [];
      $scope.overflowList = [];
      $scope.score = 0;

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