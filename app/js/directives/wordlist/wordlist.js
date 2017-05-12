var template = require('./wordlist.html');

function WordList() {
  return {
    restrict: 'E',
    controller: ctrl,
    controllerAs: 'ctrl',
    template
  };
}

function ctrl(GameService, $scope) {
  var ctrl = this;
  $scope.$watch(function() {
    return GameService.getWordList()
  }, function() {
    ctrl.words = GameService.getWordList();
  }, true);

  this.words = GameService.getWordList();
}

ctrl.$inject = ['GameService', '$scope'];

module.exports = WordList;