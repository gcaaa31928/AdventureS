var adventureSApp;

adventureSApp = angular.module('adventureSApp', ['ngAnimate', 'ngAria', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch']);

adventureSApp.config([
  '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/started');
    return $stateProvider.state('main', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    });
  }
]);
