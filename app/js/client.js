var angular = require('angular');

require('../stylesheets/main.scss');

var BoardController = require('./controllers/board-controller');

var GameService = require('./services/game_service');

var WordList = require('./directives/wordlist');

angular
  .module('app', [])
  .factory('GameService', GameService)
  .controller('boardController', BoardController)
  .directive('wordList', WordList);
