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
    },
    bindToController: true,
    controllerAs: 'boardCtrl',
    template: template
  };
}

module.exports = GameBoard;
