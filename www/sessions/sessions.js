'use strict';

angular.module('myApp.sessions', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/sessions', {
            templateUrl: 'sessions/sessions.html',
            controller: 'SessionsCtrl'
        });
    }])

    .controller('SessionsCtrl', ["$scope","$rootScope", "$window", function($scope, $rootScope, $window) {
        $rootScope.title = "Sessions";
        $rootScope.displayBack = $window.history.length > 1;
        if ('fetch' in window) {
                fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/sessions.json')
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (responseAsJson) {
                        localforage.setItem('sessions', responseAsJson)
                        var sessions = responseAsJson;
                        $scope.sessions = [];
                        for (var sessionId in sessions) {
                            var session = sessions[sessionId];
                            $scope.sessions.push(session)
                        }
                        $scope.$apply();
                    })
                    .catch(function (error) {
                        localforage.getItem('sessions').then(function(value) {
                            var sessions = value;
                            $scope.sessions = [];
                            for (var sessionId in sessions) {
                                var session = sessions[sessionId];
                                $scope.sessions.push(session)
                            }
                            $scope.$apply();
                        }).catch(function(err) {
                            console.log(err);
                        });
                    });
        }

    }])



//////////////////



    // directives
    .directive('session', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'session.html'
        }
    });

