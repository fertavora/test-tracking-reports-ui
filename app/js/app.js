/**
 * Created by ftavora on 01/11/16.
 * Source: http://jasonwatmore.com/post/2014/05/26/angularjs-basic-http-authentication-example
 */

'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);

angular.module('BasicHttpAuthExample', [
  'Authentication',
  'Home',
  'ngRoute',
  'ngCookies'
])

  .config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/login', {
        controller: 'LoginController',
        templateUrl: 'login.html'
      })

      .when('/', {
        controller: 'HomeController',
        templateUrl: 'home.html'
      })

      .otherwise({ redirectTo: '/login' });
  }])

  .run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
      // keep user logged in after page refresh
      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in
        if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
          $location.path('/login');
        }
      });
    }]);