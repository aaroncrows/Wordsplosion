function BoardController(gameService, boardService) {
  var vm = this;

  vm.alreadyPicked = false;
  vm.notAWord = false;

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

  vm.newGame = function() {
    gameService.newGame()
      .then(function(data) {
        vm.board = gameService.getBoard();
        vm.answers = data.solutions;
        boardService.initializeBoard(data.board.length, data.board[0].length);
        vm.clearBoard();
      });
  };

  vm.submitWord = function() {
    var word = vm.selectedWord;
    var picked = gameService.hasBeenPicked(word);
    var isWord = gameService.isWord(word);

    vm.clearBoard();

    if (!isWord) return vm.notAWord = true;
    if (picked) return vm.alreadyPicked = true;

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