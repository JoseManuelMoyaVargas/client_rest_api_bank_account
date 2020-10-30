'use strict';

angular.module('myApp.listAccount', ['ngRoute'])


.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/listAccount', {
    templateUrl: 'listAccount/listAccount.html',
    controller: 'listAccountController'
  });
}])

.controller('listAccountController', function($scope,$http) {
  
  $scope.reset = function(){
    $http.get("http://localhost:8080/account/list")
    .then(function(response) {
      $scope.accounts=response.data;
    })
  }
  

  

  $scope.delete = function(id){
    //console.log(id);
    $http.delete("http://localhost:8080/account/remove/"+id)
    .then(function(){
      $scope.reset();
    }).catch(function() {
      $scope.reset();
   });
    
  }
  
  $scope.reset();

});