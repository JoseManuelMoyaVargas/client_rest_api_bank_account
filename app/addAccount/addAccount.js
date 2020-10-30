'use strict';

angular.module('myApp.addAccount', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addAccount', {
    templateUrl: 'addAccount/addAccount.html',
    controller: 'addAccountController'
  }).when('/edit/:id', {
    templateUrl: 'addAccount/addAccount.html',
    controller: 'addAccountController',
    method:'edit'
  });
}])

.controller('addAccountController',function($scope,$http,$route,$routeParams,$location) {
      $scope.error=false;
      $scope.edition=false;
      if($route.current.method == 'edit'){
        $scope.edition=true;
        var id = $routeParams.id;
        $http.get("http://localhost:8080/account/get_account/"+id)
        .then(function(response) {
          $scope.name=response.data.name;
          $scope.currency=response.data.currency;
          $scope.balance=response.data.balance;
        })
        .catch(function(fallback) {
           
        });
      }
  

      $scope.submit = function(){
          $http.post("http://localhost:8080/account/save", {
          "name":$scope.name,
          "currency":$scope.currency,
          "balance":$scope.balance,
          "treasury":$scope.treasury
          }).then(function(rest) {
            $scope.error=false;
            $location.path("/listAccount");
          })
          .catch(function(fallback) {
             $scope.error=true;
          });
      }

      $scope.edit = function(){
         var id= $routeParams.id;
         $http.post("http://localhost:8080/account/edit", {
          "id":id,
          "name":$scope.name,
          "currency":$scope.currency,
          "balance":$scope.balance,
          "treasury":$scope.treasury
          }).then(function(rest) {
    
          })
          .catch(function(fallback) {
            $location.path("/listAccount");
          });
      }
    
})

.controller('editAccountController', function($scope,$http) {
  $scope.error=true;
  /*$scope.submit = function(){
      $http.post("http://localhost:8080/account/save", {
      "id":3,
      "name":$scope.name,
      "currency":$scope.currency,
      "balance":$scope.balance,
      "treasury":$scope.treasury
      }).then(function(rest) {
        $scope.error=false;
      })
      .catch(function(fallback) {
         $scope.error=true;
      });

  }*/

})

;