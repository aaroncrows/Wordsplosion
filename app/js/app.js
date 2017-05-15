module.exports = function(angular) {
  var BoardController = require('./controllers/board-controller');

  var GameService = require('./services/game_service');
  var BoardService = require('./services/board_service');
  var WordlistService = require('./services/wordlist_service');

  var GameBoard = require('./directives/gameboard/gameboard');
  var WordList = require('./directives/wordlist/wordlist');

  angular
    .module('app', [])
    .controller('boardController', BoardController)
    .factory('GameService', GameService)
    .factory('BoardService', BoardService)
    .factory('WordlistService', WordlistService)
    .directive('gameBoard', GameBoard)
    .directive('wordList', WordList);
};

