function ActiveSquareMap(height, width) {
  this.map = {};
  this.boardHeight = height;
  this.boardWidth = width;

  for (var i = 0; i < height; i++) {
    this.map[i] = {};
    for (var j = 0; j < width; j++) {
      this.map[i][j] = false;
    }
  }
};

ActiveSquareMap.ADJACENT_COORDS = [[1, 0], [0, 1], [1, 1], [-1, 0], [0, -1],
    [-1, -1], [-1, 1], [1, -1]];

ActiveSquareMap.prototype.isAdjacent = function(lastActive, selected) {
  var possible = ActiveSquareMap.ADJACENT_COORDS.map(function(m) {
    return [lastActive[0] + m[0], lastActive[1] + m[1]];
  });

  return possible.some(function(coords) {
    var inGrid = this.map[coords[0]] && this.map[coords[0]][coords[1]];
    var inSet = coords[0] === selected[0] && coords[1] === selected[1];

    return inGrid && inSet;
  }.bind(this));
};

ActiveSquareMap.prototype.activateNode = function(location) {
  var modifiers = ActiveSquareMap.ADJACENT_COORDS;
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
};

ActiveSquareMap.prototype.deactivateAll = function() {
  for (var i = 0; i < this.boardHeight; i++) {
    this.map[i] = {};
    for (var j = 0; j < this.boardWidth; j++) {
      this.map[i][j] = false;
    }
  }
};

module.exports = ActiveSquareMap;
