'use strict';
(function(){

class UserComponent {
  constructor($http, $scope, socket, $stateParams, $uibModal) {
    this.$http = $http;
    this.socket = socket;
    this.tacks = [];
    this.user = []
    this.id = $stateParams.id
    this.modal  = $uibModal

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('tack');
    });
  }

  $onInit() {
    this.$http.get('/api/users/' + this.id)
      .then(response => {
        this.user = response.data;


      });

      this.$http.get('/api/tacks/' + this.id)
        .then(response => {
          this.tacks = response.data;
          //this.socket.syncUpdates('tack', this.tacks);
        });
  }

  open(size){

    var modalInstance = this.modal.open({
      animation: true,
      template: '<tack></tack>',
      size: size
    })
  }

}

angular.module('tackiApp')
  .component('user', {
    templateUrl: 'app/user/user.html',
    controller: UserComponent
  });

})();
