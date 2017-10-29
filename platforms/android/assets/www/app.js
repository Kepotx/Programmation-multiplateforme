'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.version',
    'myApp.menu',
    'myApp.presentateurs',
    'myApp.presentateur',
    'myApp.sessions',
    'myApp.session',
    'myApp.notes'
]).
config(['$locationProvider', '$routeProvider',  function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/menu'});

    /*

    */
    localforage.setDriver([localforage.INDEXEDDB, localforage.LOCALSTORAGE]);
    localStorage.setItem('keyBis', JSON.stringify('valuheBis'));

}])
// run blocks
    .run(function($rootScope, $window) {
        // you can inject any instance here
        $rootScope.back = function() {
            $window.history.back();
        };
    });