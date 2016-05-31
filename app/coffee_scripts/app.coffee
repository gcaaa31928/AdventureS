adventureSApp = angular.module 'adventureSApp', [
    'ngRoute',
    'ui.router'
]
adventureSApp.config [
    '$stateProvider',
    '$urlRouterProvider',
    ($stateProvider, $urlRouterProvider) ->
        $urlRouterProvider.otherwise  '/main'
        $stateProvider.state('main',
            url: '/main'
            templateUrl: 'views/main.html'
            controller: 'MainCtrl'
        )
]
