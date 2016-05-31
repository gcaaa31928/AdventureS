adventureSApp = angular.module 'adventureSApp', [
    'ngRoute',
    'ui.router'
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
