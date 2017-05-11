var fs = require('fs');
var Trie = require('./trie.js');
var _ = require('lodash');
var dice = require('./dice_config');
var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var BOARD_SIZE = 4;
//creates trie from wordlist

var text = fs.readFileSync(__dirname + '/wordlist.txt', 'utf8').replace(/\r/g, '').split('\n');
var trie = new Trie(text);

exports.LetterObject = function(location, letter) {
  var rand = Math.floor(Math.random() * 26);

  this.letter = letter || ALPHABET[rand];
  this.location = location;
};

exports.rollDice = function() {
  var diceCopy = dice.slice(0);
  var rolls = [];
  var randomDie;
  var randomSide;

  while (diceCopy.length) {
    randomDie = Math.floor(Math.random() * diceCopy.length);
    randomSide = Math.floor(Math.random() * 6);
    rolls.push(diceCopy[randomDie][randomSide]);
    diceCopy.splice(randomDie, 1);
  }

  return rolls;
};

//game
exports.makeBoard = function(){
  var board = [];
  var letters = exports.rollDice();
  var row;
  for (var i = 0; i < BOARD_SIZE; i++) {
    row = [];
    for (var j = 0; j < BOARD_SIZE; j++) {
      row[j] = new exports.LetterObject([i, j], letters[i * BOARD_SIZE + j]);
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
  var currentPre;
  var newPre;
  var unseenLocation;
  var current;
  var locationCopy;

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
        locationCopy = _.cloneDeep(current.locations);
        newPre = {
          prefix: currentPre + board[x][y].letter,
          lastLocation: [x, y],
          locations: locationCopy
        };
        if (!newPre.locations[x]) newPre.locations[x] = {};
        newPre.locations[x][y] = true;
        workQueue.push(newPre);
      }
    }
  }

  for (i = 0; i < wordsFound.length; i++) {
    answerMap[wordsFound[i]] = true;
  };
  return answerMap;
};
