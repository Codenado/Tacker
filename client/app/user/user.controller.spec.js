'use strict';

describe('Component: UserComponent', function () {

  // load the controller's module
  beforeEach(module('tackiApp'));

  var UserComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    UserComponent = $componentController('UserComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
