'use strict';

angular.module('tackiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/user/:id',
        template: '<user></user>'
      });
  });
