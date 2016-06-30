'use strict';

describe('Component: TackComponent', function () {

  // load the controller's module
  beforeEach(module('tackiApp'));

  var TackComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    TackComponent = $componentController('TackComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
