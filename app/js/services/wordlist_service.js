function WordlistService($http) {
  var svc = {};

  svc.allWords = [];

  svc.init = function() {
    if (!localStorage.getItem('allWords')) {
      $http.get('/words').then(function(data) {
        localStorage.setItem('allWords', JSON.stringify(data.data));
        svc.allWords = data.data;
      });
    } else {
      svc.allWords = JSON.parse(localStorage.getItem('allWords'));
    }
  };

  svc.getWords = function() {
    return svc.allWords;
  };

  svc.init();

  return svc;
}

WordlistService.$inject = ['$http'];

module.exports = WordlistService;
