function GameService($http) {
  var service = {};

  service.newGame = $http.get('/new-game').then(function(data) {
    console.log('whaat')
    return data.data;
  });

  return service;
}

GameService.$inject = ['$http'];

module.exports = GameService;
