'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.tacks = [];
      this.photos = [
    {id: 'p1', 'title': 'A nice day!', src: "http://lorempixel.com/300/400/"},
    {id: 'p2', 'title': 'Puh!', src: "http://lorempixel.com/300/400/sports"},
    {id: 'p3', 'title': 'What a club!', src: "http://lorempixel.com/300/400/nightlife"}
]


      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('tack');
      });
    }



    $onInit() {
      this.$http.get('/api/tacks')
        .then(response => {
          this.tacks = response.data;
          this.socket.syncUpdates('tack', this.tacks);
        });
  }

  deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }
  }

  angular.module('tackiApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
