'use strict';

angular.module('myApp.session', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/session/:id', {
            templateUrl: 'session/session.html',
            controller: 'SessionCtrl'
        });
    }])

    .controller('SessionCtrl', ["$scope","$rootScope","$routeParams","$window" , function($scope, $rootScope, $routeParams, $window)  {
        $rootScope.title = "Session";
        $rootScope.displayBack = $window.history.length > 1
        console.log($window.history.length, document.referrer);
        if ('fetch' in window) {
            fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/sessions.json')
                .then(function (response) {
                    return response.json();
                })
                .then(function (responseAsJson) {

                    var sessions = responseAsJson;
                    $scope.session = sessions[$routeParams.id];
                    $scope.$apply();
                    if( $scope.session.speakers)
                    {
                        fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/speakers.json')
                            .then(function (response) {
                                return response.json();
                            })
                            .then(function (responseAsJson) {
                                var presentateurs = responseAsJson;
                                $scope.presentateurs = [];
                                for (var presentateurId in presentateurs) {
                                    var presentateur = presentateurs[presentateurId];
                                    if( $scope.session.speakers.indexOf(presentateur.id) != -1) {
                                        $scope.presentateurs.push(presentateur)
                                    }
                                }
                                $scope.$apply();
                            })
                            .catch(function (error) {
                                console.log('Une erreur est survenue : ', error);
                            });
                    }
                })
                .catch(function (error) {
                    console.log('Une erreur est survenue : ', error);
                });

        }
    }]);

