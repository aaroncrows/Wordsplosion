var angular = require('angular');

require('../stylesheets/main.scss');

var BoardController = require('./controllers/board-controller');

var GameService = require('./services/game_service');

var GameBoard = require('./directives/gameboard/gameboard');
var WordList = require('./directives/wordlist/wordlist');

angular
  .module('app', [])
  .factory('GameService', GameService)
  .controller('boardController', BoardController)
  .directive('gameBoard', GameBoard)
  .directive('wordList', WordList);
