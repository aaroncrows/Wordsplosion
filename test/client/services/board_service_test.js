require('../../../app/js/app')(angular);

describe('BoardService', function() {
  var boardService;
  beforeEach(function() {
    angular.mock.module('app');

    angular.mock.inject(function(_BoardService_) {
      boardService = _BoardService_;
    });
  });

  it('should initialize a map of active squares', function() {
    var tree = boardService.initializeBoard(1, 1);

    expect
  });
});

