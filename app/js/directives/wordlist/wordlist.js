var template = require('./wordlist.html');

function WordList() {
  return {
    restrict: 'E',
    controller: ctrl,
    controllerAs: 'ctrl',
    replace: true,
    template: template
  };
}

function ctrl(gameService, $scope) {
  var ctrl = this;
  $scope.$watch(function() {
    return gameService.getWordList()
  }, function() {
    ctrl.words = gameService.getWordList();
  }, true);

  this.words = gameService.getWordList();
}

ctrl.$inject = ['gameService', '$scope'];

module.exports = WordList;