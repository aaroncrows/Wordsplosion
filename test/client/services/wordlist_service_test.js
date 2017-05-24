describe('wordlistService', function() {
  var wordlistService;
  var tempStorage;
  var $httpBackend;

  beforeEach(function() {
    tempStorage = localStorage;
    angular.mock.module('app');

    angular.mock.inject(function(_wordlistService_, _$httpBackend_) {
      wordlistService = _wordlistService_;
      $httpBackend = _$httpBackend_;
    });
  });

  afterEach(function() {
    localStorage = tempStorage;
  });

  it('getWords: should return the map of all words', function() {
    wordlistService.allWords = { TEST: true };

    var result = wordlistService.getWords();

    expect(result).toEqual({ TEST: true });
  });

  it('init: should retrieve words from localStorage', function() {
    spyOn(localStorage, 'getItem').and.returnValue('{ "TEST": "test" }');
    wordlistService.init();

    expect(wordlistService.allWords).toEqual({ TEST: 'test' });
  });

  it('init: should request words if localStorage is empty', function() {
    var setItem = spyOn(localStorage, 'setItem');
    $httpBackend.expectGET('/words').respond(200, { TEST: true });
    $httpBackend.flush();
    expect(wordlistService.allWords).toEqual({TEST: true });
    expect(setItem).toHaveBeenCalledWith('allWords', '{"TEST":true}')
  });
});

