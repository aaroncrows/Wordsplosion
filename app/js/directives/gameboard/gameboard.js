var template = require('./gameboard.html');

function GameBoard() {
  return {
    scope: {
      addLetter: '='
    },
    controller: ctrl,
    bindToController: true,
    controllerAs: 'ctrl',
    template: template
  };
}

function ctrl(boardService, $scope) {
  var vm = this;

  vm.isActive = boardService.isActive;
  vm.isChosen = boardService.isChosen;

  $scope.$watch(function() {
    return boardService.getBoard();
  }, function() {
    vm.board = boardService.getBoard();
  }, true);
}

ctrl.$inject = ['boardService', '$scope'];

module.exports = GameBoard;
