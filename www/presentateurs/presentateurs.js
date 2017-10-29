'use strict';

angular.module('myApp.presentateurs', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/presentateurs', {
            templateUrl: 'presentateurs/presentateurs.html',
            controller: 'PresentateursCtrl'
        });
    }])

    .controller('PresentateursCtrl', ["$scope","$rootScope","$window", function($scope, $rootScope, $window) {
        $rootScope.displayBack = $window.history.length > 1
        $rootScope.title = "Présentateurs";

        if ('fetch' in window) {
                fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/speakers.json')
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (responseAsJson) {
                        var presentateurs = responseAsJson;
                        $scope.presentateurs = [];
                        for (var presentateurId in presentateurs) {
                            var presentateur = presentateurs[presentateurId];
                            $scope.presentateurs.push(presentateur);
                        }
                        $scope.$apply();
                    })
                    .catch(function (error) {
                        localforage.getItem('presentateurs').then(function(value) {
                            $scope.presentateurs = [];
                            for (var presentateurId in presentateurs) {
                                var presentateur = presentateurs[presentateurId];
                                $scope.presentateurs.push(presentateur);
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
    .directive('presentateur', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'presentateur.html'
        }
    });
