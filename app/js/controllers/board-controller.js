'use strict';

var ActiveTree = require('../../lib/graph');

module.exports = function(app) {
  app.controller('boardController', ['$scope', '$http', function($scope, $http) {

    $http.get('/new-game').success(function(data) {
      $scope.board = data.board;
      $scope.answers = data.solutions;
      $scope.tree = new ActiveTree(data.board);
    });

    //display word and object map for its letter locations
    $scope.selectedWord = '';
    $scope.selectedWordObj = {};

    $scope.alreadyPicked = false;
    $scope.notAWord = false;
    $scope.score = 0;

    $scope.wordList = [];

    $scope.addLetter = function(letter) {
      var loc = letter.location;
      var wordObj = $scope.selectedWordObj;
      var activeLetter = $scope.isActive(letter);
      var newBoard = !$scope.selectedWordObj.anyPicked;
      var notChosen = !$scope.isChosen(letter);

      if ((activeLetter || newBoard) && notChosen) {
        $scope.selectedWordObj.anyPicked = true;
        $scope.selectedWord += letter.letter;
        //clear warnings
        $scope.alreadyPicked = false;
        $scope.notAWord = false;

        if (!wordObj[loc[0]]) wordObj[loc[0]] = {};
        wordObj[loc[0]][loc[1]] = true;

        $scope.tree.deactivateAll($scope.board);
        $scope.tree.activateNode(letter.location);
      }
    };

    $scope.isActive = function(letter) {
      var loc = letter.location;
      return $scope.tree.map[loc[0]][loc[1]];
    };

    //checks picked letters for passed in letter
    $scope.isChosen = function(letter) {
      var loc = letter.location;
      var word = $scope.selectedWordObj;

      return (word[loc[0]] && word[loc[0]][loc[1]]);
    };

    $scope.clearBoard = function() {

      $scope.tree.deactivateAll($scope.board);
      $scope.selectedWord = '';
      $scope.selectedWordObj = {};
      $scope.notAWord = false;
      $scope.alreadyPicked = false;
    };

    $scope.resetBoard = function() {
      $scope.wordList = [];
      $scope.score = 0;
      $scope.clearBoard();
    };

    $scope.newGame = function() {
      $scope.resetBoard();
      $http.get('/new-game').success(function(data) {
        $scope.board = data.board;
        $scope.answers = data.solutions;
        $scope.tree = new ActiveTree(data.board);
      });
    };

    $scope.submitWord = function() {
      var picked = $scope.wordList.indexOf($scope.selectedWord) !== -1;
      var isWord = $scope.answers[$scope.selectedWord];

      //Only allows word submit if word longer than 2 characters in length,
      //not in either of the word lists and in the solution list.

      if ($scope.selectedWord.length > 2  && !picked && isWord) {
        $scope.wordList.push($scope.selectedWord);
      } else if (picked) {
        $scope.alreadyPicked = true;
      } else {
        $scope.notAWord = true;
      }
      $scope.clearBoard();
    };

    $scope.scoreBoard = function() {
      $scope.score = 0;
      var list = $scope.wordList;
      $scope.clearBoard();

      for (var i = 0; i < list.length; i++) {
        if (list[i].length < 8) {
          $scope.score += list[i].length - 2;
        } else {
          $scope.score += 11;
        }
      }

    };

  }]);
};
