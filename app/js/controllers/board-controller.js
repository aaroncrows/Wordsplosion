'use strict';

module.exports = function(app) {
  app.controller('boardController', ['$scope', function($scope){
    $scope.test = 'TEST';
    $scope.board = [
      ['A', 'B', 'C'],
      ['D', 'E', 'F'],
      ['G', 'H', 'I']
    ]



  }])
}