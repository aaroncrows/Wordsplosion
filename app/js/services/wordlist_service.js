function WordlistService($http) {
  var service = {};
  var allWords;

  service.init = function() {
    if (!localStorage.allWords) {
      $http.get('/words').then(function(data) {
        localStorage.allWords = JSON.stringify(data.data);
        allWords = data.data;
      });
    } else {
      allWords = JSON.parse(localStorage.allWords);
    }
  };

  service.getWords = function() {
    return allWords;
  };

  service.init();

  return service;
}

WordlistService.$inject = ['$http'];

module.exports = WordlistService;
