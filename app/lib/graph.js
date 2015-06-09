'use strict';

var BoardActiveTree = function(board) {
  this.map = {};
  for (var i = 0; i < board.length; i++) {
    this.map[i] = {};
    for (var j = 0; j < board[i].length; j++) {
      this.map[i][j] = false;
    }
  }
}

BoardActiveTree.prototype.activateNode = function(location) {
  var modifiers = [[1, 0], [0, 1], [1, 1], [-1, 0], [0, -1],
    [-1, -1], [-1, 1], [1, -1]];
  var x;
  var y;
  for (var i = 0; i < modifiers.length; i++) {
    x = location[0] + modifiers[i][0];
    y = location[1] + modifiers[i][1];

    if (this.map.hasOwnProperty(x) && this.map[x].hasOwnProperty(y)) {
      this.map[x][y] = true;
    }
  };
  this.map[location[0]][location[1]] = true;
}

BoardActiveTree.prototype.deactivateAll = function(board) {
  for (var i = 0; i < board.length; i++) {
    this.map[i] = {};
    for (var j = 0; j < board[i].length; j++) {
      this.map[i][j] = false;
    }
  }
}
module.exports = BoardActiveTree;
