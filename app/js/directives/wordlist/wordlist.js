var template = require('./wordlist.html');

function WordList() {
  return {
    restrict: 'E',
    controller: function(GameService, $scope) {
      var ctrl = this;
      $scope.$watch(function() {
        return GameService.getWordList()
      }, function() {
        ctrl.words = GameService.getWordList();
      }, true);

      this.words = GameService.getWordList();
    },
    controllerAs: 'ctrl',
    template
  };
}

module.exports = WordList;