var template = require('./wordlist.html');

function WordList() {
  return {
    restrict: 'E',
    scope: {
      words: '='
    },
    template
  };
}

module.exports = WordList;