'use strict';

angular.module('myApp.menu', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/menu', {
            templateUrl: 'menu/menu.html',
            controller: 'MenuCtrl'
        });
    }])

    .controller('MenuCtrl', ["$scope","$rootScope","$window", function($scope, $rootScope, $window) {
        $rootScope.title = "Menu";
        console.log($window.history.length, document.referrer);
        $rootScope.displayBack = false;

        console.log($window.history)

    }]);
