describe('WordList', function() {
  var $rootScope;
  var $compile;

  beforeEach(function() {
    angular.mock.module('app', {
      WordlistService: {
        init: function() {}
      },
      GameService: {
        getWordList: function() {
          return ['test'];
        }
      }
    });

    angular.mock.inject(function(_$rootScope_, _$compile_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
    });
  });

  it('should render the wordList', function() {
    var scope = $rootScope.$new();

    var element = angular.element('<word-list></word-list>');

    var compiled = $compile(element)(scope);

    scope.$apply();
    expect(compiled.find('li').length).toBe(1);
  });
});
