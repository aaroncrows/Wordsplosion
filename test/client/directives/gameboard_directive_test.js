describe('GameBoard', function() {
  var $rootScope;
  var $compile;

  beforeEach(function() {
    angular.mock.module('app', {
      wordlistService: {
        init: function() {}
      },

      boardService: {
        isActive: function() {
          return true;
        },
        isChosen: function() {
          return true;
        },
        getBoard: function() {
          return [[{ letter: 'test' }]];
        }
      }
    });

    angular.mock.inject(function(_$rootScope_, _$compile_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
    });
  });

  it('should render the <game-board>', function() {
    var scope = $rootScope.$new();
    var element  = $compile('<game-board></game-board>')(scope);

    scope.$digest();

    expect(element.find('p').text()).toBe('test');
  });
});
