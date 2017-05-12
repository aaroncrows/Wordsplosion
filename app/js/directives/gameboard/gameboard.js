var template = require('./gameboard.html');

function GameBoard() {
  return {
    scope: {
      board: '=',
      addLetter: '='
    },
    controller: function(BoardService) {
      this.isActive = BoardService.isActive;
      this.isChosen = BoardService.isChosen;
      // this.board = BoardService.getBoard();
    },
    bindToController: true,
    controllerAs: 'boardCtrl',
    template: template
  };
}

module.exports = GameBoard;
