'use strict';

module.exports = function(app) {
  app.controller('boardController', ['$scope', function($scope){
    $scope.board = [
      ['A', 'B', 'C'],
      ['D', 'E', 'F'],
      ['G', 'H', 'I']
    ]

    $scope.selectedWord = '';

    $scope.wordList = [];
    $scope.overflowList = [];

    $scope.addLetter = function(letter) {
      $scope.selectedWord += letter;
    }

    $scope.clearWord = function() {
      $scope.selectedWord = '';
    }

    $scope.backspace = function() {
      $scope.selectedWord = $scope.selectedWord.slice(0, -1);
    }

    $scope.submitWord = function(word) {
      var list = $scope.wordList.length <= 7 ? $scope.wordList : $scope.overflowList;
      list.push($scope.selectedWord);
      $scope.selectedWord = '';
    }

    $scope.scoreBoard = function() {
      $scope.wordList = [];
      $scope.overflowList = [];
    }

  }])
}