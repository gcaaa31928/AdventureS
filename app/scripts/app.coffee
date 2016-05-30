adventureSApp = angular.module 'adventureSApp', [
    'ngAnimate',
    'ngAria',
    'ngRoute',
    'ui.router'
    'ngSanitize',
    'ngTouch'
]
adventureSApp.config [
    '$stateProvider',
    '$urlRouterProvider',
    ($stateProvider, $urlRouterProvider) ->
        $urlRouterProvider.otherwise  '/started'
        $stateProvider.state('main',
            templateUrl: 'views/main.html'
            controller: 'MainCtrl'
        )
]