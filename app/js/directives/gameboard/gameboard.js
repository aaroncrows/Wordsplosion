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

function ctrl(BoardService, $scope) {
  var vm = this;

  vm.isActive = BoardService.isActive;
  vm.isChosen = BoardService.isChosen;

  $scope.$watch(function() {
    return BoardService.getBoard();
  }, function() {
    vm.board = BoardService.getBoard();
  }, true);
}

ctrl.$inject = ['BoardService', '$scope'];

module.exports = GameBoard;
