module.exports = function(angular) {
  var BoardController = require('./controllers/board_controller');

  var gameService = require('./services/game_service');
  var boardService = require('./services/board_service');
  var wordlistService = require('./services/wordlist_service');

  var GameBoard = require('./directives/gameboard/gameboard');
  var WordList = require('./directives/wordlist/wordlist');

  angular
    .module('app', [])
    .controller('boardController', BoardController)
    .factory('gameService', gameService)
    .factory('boardService', boardService)
    .factory('wordlistService', wordlistService)
    .directive('gameBoard', GameBoard)
    .directive('wordList', WordList);
};

