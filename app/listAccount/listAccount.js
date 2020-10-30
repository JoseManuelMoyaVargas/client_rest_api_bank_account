'use strict';

angular.module('myApp.listAccount', ['ngRoute'])


.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/listAccount', {
    templateUrl: 'listAccount/listAccount.html',
    controller: 'listAccountController'
  });
}])

.controller('listAccountController', function($scope,$http) {
  
  $scope.filtered=false;

  $scope.reset = function(){
    $http.get("http://localhost:8080/account/list")
    .then(function(response) {
      $scope.accounts=response.data;
    })
  }
  $scope.clearSearch = function(){
    $scope.reset();
    $scope.search_value="";
    $scope.filtered=false;
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

  $scope.search = function(){
    
    if($scope.search_value===undefined){
        $scope.reset();
        $scope.filtered=false;
    }else{
      $http.get("http://localhost:8080/account/find_name?searchInput="+$scope.search_value)
      .then(function(response) {
        $scope.accounts=response.data;
        $scope.filtered=true;
      }).catch(function() {
        
      });
    }

  }
  
  $scope.reset();

});