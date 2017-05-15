function BoardController(gameService, boardService) {
  var vm = this;

  vm.alreadyPicked = false;
  vm.notAWord = false;
  vm.tooShort = false;
  vm.selectedWord = '';

  vm.addLetter = function(letter) {
    if (!vm.selectedWord) vm.clearBoard();
    var validLetter = boardService.addLetter(letter);
    if (validLetter) vm.selectedWord += letter.letter;
  };

  vm.clearBoard = function() {
    boardService.resetBoard();
    vm.selectedWord = '';
    vm.notAWord = false;
    vm.alreadyPicked = false;
    vm.tooShort = false;
  };

  vm.newGame = function() {
    boardService.newGame()
      .then(function() {
        vm.clearBoard();
      });
  };

  vm.submitWord = function() {
    var word = vm.selectedWord;

    vm.clearBoard();
    if (word.length <= 2) return vm.tooShort = true;
    if (!gameService.isWord(word)) return vm.notAWord = true;
    if (gameService.hasBeenPicked(word)) return vm.alreadyPicked = true;

    gameService.verifyWord(word);
  };

  vm.scoreBoard = function() {
    vm.clearBoard();
    vm.score = gameService.scoreBoard();
  };

  vm.newGame();
}

BoardController.$inject = ['GameService', 'BoardService'];

module.exports = BoardController;
