var ActiveTree = require('../../lib/graph');

function BoardController(gameService) {

  var vm = this;

  gameService.newGame.then(function(data) {
    vm.board = data.board;
    vm.answers = data.solutions;
    vm.tree = new ActiveTree(data.board);
  });

  //display word and object map for its letter locations
  vm.selectedWord = '';
  vm.selectedWordObj = {};

  vm.alreadyPicked = false;
  vm.notAWord = false;
  vm.score = 0;

  vm.wordList = [];

  vm.addLetter = function(letter) {
    var loc = letter.location;
    var wordObj = vm.selectedWordObj;
    var activeLetter = vm.isActive(letter);
    var newBoard = !vm.selectedWordObj.anyPicked;
    var notChosen = !vm.isChosen(letter);

    if ((activeLetter || newBoard) && notChosen) {
      vm.selectedWordObj.anyPicked = true;
      vm.selectedWord += letter.letter;
      //clear warnings
      vm.alreadyPicked = false;
      vm.notAWord = false;

      if (!wordObj[loc[0]]) wordObj[loc[0]] = {};
      wordObj[loc[0]][loc[1]] = true;

      vm.tree.deactivateAll(vm.board);
      vm.tree.activateNode(letter.location);
    }
  };

  vm.isActive = function(letter) {
    var loc = letter.location;
    return vm.tree.map[loc[0]][loc[1]];
  };

  //checks picked letters for passed in letter
  vm.isChosen = function(letter) {
    var loc = letter.location;
    var word = vm.selectedWordObj;

    return (word[loc[0]] && word[loc[0]][loc[1]]);
  };

  vm.clearBoard = function() {
    vm.tree.deactivateAll(vm.board);
    vm.selectedWord = '';
    vm.selectedWordObj = {};
    vm.notAWord = false;
    vm.alreadyPicked = false;
  };

  vm.resetBoard = function() {
    vm.wordList = [];
    vm.score = 0;
    vm.clearBoard();
  };

  vm.newGame = function() {
    vm.resetBoard();
    gameService.newGame.then(function(data) {
      vm.board = data.board;
      vm.answers = data.solutions;
      vm.tree = new ActiveTree(data.board);
    });
  };

  vm.submitWord = function() {
    var picked = vm.wordList.indexOf(vm.selectedWord) !== -1;
    var isWord = vm.answers[vm.selectedWord];

    //Only allows word submit if word longer than 2 characters in length,
    //not in either of the word lists and in the solution list.

    if (vm.selectedWord.length > 2 && !picked && isWord) {
      vm.wordList.push(vm.selectedWord);
    } else if (picked) {
      vm.alreadyPicked = true;
    } else {
      vm.notAWord = true;
    }
    vm.clearBoard();
  };

  vm.scoreBoard = function() {
    vm.score = 0;
    var list = vm.wordList;
    vm.clearBoard();

    for (var i = 0; i < list.length; i++) {
      if (list[i].length < 8) {
        vm.score += list[i].length - 2;
      } else {
        vm.score += 11;
      }
    }
  };
}

BoardController.$inject = ['GameService'];

module.exports = BoardController;