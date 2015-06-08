'use strict';
var exports = module.exports = {};

var fs = require('fs');
var Trie = require('./trie.js');
var _ = require('lodash');
//creates trie from wordlist

var text = fs.readFileSync(__dirname + '/wordlist.txt', 'utf8').replace(/\r/g, '').split('\n');
var trie = new Trie(text);

function LetterObject(location, letter) {
  var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var rand = Math.floor(Math.random() * 26);

  this.letter = letter || alpha[rand];
  this.location = location;
}

//game
exports.makeBoard = function(size){
  var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var board = [];
  var row;

  for (var i = 0; i < size; i++) {
    row = [];
    for (var j = 0; j < size; j++) {
      row[j] = new LetterObject([i, j])
    }
    board.push(row);
  }
    return board;
};

exports.findWords = function(board) {
    var wordsFound = [];
    var workQueue = [];
    var modArray = [[1, 0], [0, 1], [-1, 0], [0, -1],
      [-1, -1], [1, -1], [-1, 1], [1, 1]];
    var answerMap = {};
    var x;
    var y;
    var lastLocation;
    var currentPre;
    var newPre;
    var unseenLocation;
    var current;

    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        newPre = {
          prefix: board[i][j].letter,
          lastLocation: [i, j],
          locations:{}
        };
        newPre.locations[i] = {};
        newPre.locations[i][j] = true;
        workQueue.push(newPre);
      };
    };

  while (workQueue.length) {
    current = workQueue.shift();
    currentPre = current.prefix;

    if (currentPre.length > 2 && trie.isWord(currentPre)) {
      wordsFound.push(currentPre);
    }

    //loops through letters in all directions if current is prefix
    for (i = 0; i < modArray.length; i++) {
      x = current.lastLocation[0] + modArray[i][0];
      y = current.lastLocation[1] + modArray[i][1];
      unseenLocation = !(current.locations[x] && current.locations[x][y]);

      if (board[x] && board[x][y] && unseenLocation && trie.isPrefix(currentPre + board[x][y].letter)) {
        //creates new object for prefix plus neighbor

        newPre = {
          prefix: currentPre + board[x][y].letter,
          lastLocation: [x, y],
          locations: _.clone(current.locations)
        };
        if (!newPre.locations[x]) newPre.locations[x] = {};
        newPre.locations[x][y] = true;
        workQueue.push(newPre);
      }
    }
  }

  for (var i = 0; i < wordsFound.length; i++) {
    answerMap[wordsFound[i]] = true;
  };

  return answerMap;
}
