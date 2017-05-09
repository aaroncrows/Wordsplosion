var ActiveTree = require('../../lib/graph');

function BoardController(gameService, boardService) {
  var vm = this;

  gameService.newGame().then(function(data) {
    vm.board = gameService.getBoard();
    vm.answers = data.solutions;
    boardService.initializeBoard(data.board.length, data.board[0].length);
  });

  //display word and object map for its letter locations
  vm.selectedWord = '';
  vm.selectedCoordinates = {};

  vm.alreadyPicked = false;
  vm.notAWord = false;
  vm.score = 0;

  vm.addLetter = function(letter) {
    var validLetter = boardService.addLetter(letter);
    if (validLetter) vm.selectedWord += letter.letter;
  };


  vm.clearBoard = function() {
    boardService.deactivateAll();
    vm.selectedWord = '';
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
    gameService.newGame().then(function(data) {
      vm.board = gameService.getBoard();
      vm.answers = data.solutions;
      boardService.initializeBoard(gameService.getBoard());
      vm.tree = new ActiveTree(gameService.getBoard());
    });
  };

  vm.submitWord = function() {
    var picked = gameService.hasBeenPicked(vm.selectedWord);
    var isWord = gameService.isWord(vm.selectedWord);

    vm.clearBoard();

    if (!isWord) return vm.notAWord = true;
    if (picked) return vm.picked = true;

    gameService.verifyWord(vm.selectedWord);
  };

  // vm.submitWord = function() {
  //   var picked = vm.wordList.indexOf(vm.selectedWord) !== -1;
  //   var isWord = vm.answers[vm.selectedWord];
  //   //Only allows word submit if word longer than 2 characters in length,
  //   //not in either of the word lists and in the solution list.

  //   if (vm.selectedWord.length > 2 && !picked && isWord) {
  //     vm.wordList.push(vm.selectedWord);
  //   } else if (picked) {
  //     vm.alreadyPicked = true;
  //   } else {
  //     vm.notAWord = true;
  //   }
  //   vm.clearBoard();
  // };

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

BoardController.$inject = ['GameService', 'BoardService'];

module.exports = BoardController;