'use strict';

angular.module('myApp.presentateur', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/presentateur/:id', {
            templateUrl: 'presentateur/presentateur.html',
            controller: 'PresentateurCtrl'
        });
    }])

    .controller('PresentateurCtrl', ["$scope","$rootScope","$routeParams","$window", function($scope, $rootScope, $routeParams, $window)  {
        $rootScope.displayBack = $window.history.length > 1
        function onSuccess(contact) {
        }

        function onError(contactError) {
        }

        $scope.addContact = function() {
            var contact = navigator.contacts.create();
            contact.displayName = $scope.presentateur.name;
            contact.nickname = $scope.presentateur.name;

            var name = new ContactName();
            name.givenName = $scope.presentateur.name;
            contact.name = name;
            contact.organizations = $scope.presentateur.company;
            contact.save(onSuccess, onError);
        };

        if ('fetch' in window) {
            fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/speakers.json')
                .then(function (response) {
                    return response.json();
                })
                .then(function (responseAsJson) {
                    var presentateurs = responseAsJson;
                    $scope.presentateur = presentateurs[$routeParams.id];
                    $rootScope.title = $scope.presentateur.name;
                    $scope.sessions = [];
                    $scope.$apply();
                    fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/sessions.json')
                        .then(function (responseSession) {
                            return responseSession.json();
                        })
                        .then(function (responseSessionAsJson) {
                            var sessions = responseSessionAsJson;
                            $scope.presentateurs = [];
                            for (var sessionId in sessions) {
                                var session = sessions[sessionId];
                                if(session.speakers)
                                {
                                    if( session.speakers.indexOf($scope.presentateur.id) != -1) {
                                        $scope.sessions.push(session);
                                    }
                                }

                            }
                            $scope.$apply();
                        })
                        .catch(function (error) {
                            console.log('Une erreur est survenue : ', error);
                        });
                })
                .catch(function (error) {
                    console.log('Une erreur est survenue : ', error);
                });
        }
    }]);