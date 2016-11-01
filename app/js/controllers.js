/**
 * Created by ftavora on 01/11/16.
 * Source: http://jasonwatmore.com/post/2014/05/26/angularjs-basic-http-authentication-example
 */
'use strict';

angular.module('Authentication')

  .controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
      function ($scope, $rootScope, $location, AuthenticationService) {
        // reset login status
        AuthenticationService.ClearCredentials();

        $scope.login = function () {
          $scope.dataLoading = true;
          AuthenticationService.Login($scope.username, $scope.password, function(response) {
            if(response.success) {
              AuthenticationService.SetCredentials($scope.username, $scope.password);
              $location.path('/');
            } else {
              $scope.error = response.message;
              $scope.dataLoading = false;
            }
          });
        };
      }]);

angular.module('Home')

  .controller('HomeController',
    ['$scope',
      function ($scope) {

      }]);