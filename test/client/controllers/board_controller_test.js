var angular = require('angular');
var boardCtrl = require('../../../app/js/controllers/board-controller.js');
require('angular-mocks')
require('../../../app/js/client')

describe('BoardController', function() {
  var boardCtrl

  beforeEach(function() {
    angular.mock.module('app')
    angular.mock.inject(function(_$controller_) {
      boardCtrl = _$controller_('boardController', {})
    });
  });

  it('should add a letter to selected word', function() {
  });
});
