var template = require('./gameboard.html');

function GameBoard() {
  return {
    scope: {
      board: '=',
      isActive: '=',
      isChosen: '=',
      addLetter: '='
    },
    template: template
  };
}

module.exports = GameBoard;
