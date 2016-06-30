'use strict';
(function(){

class TackComponent {
  constructor($http, $scope, $state) {

    this.$http = $http
    this.$state = $state
  }

  addTack() {
      this.$http.post('/api/tacks', {
      url: this.newTack.url,
      title: this.newTack.title,
      descriptions: this.newTack.description
    });
          this.$state.go('main')
  }

}

angular.module('tackiApp')
  .component('tack', {
    templateUrl: 'app/tack/tack.html',
    controller: TackComponent
  });

})();
