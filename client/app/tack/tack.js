'use strict';

angular.module('tackiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tack', {
        url: '/tack',
        template: '<tack></tack>'
      });
  });
