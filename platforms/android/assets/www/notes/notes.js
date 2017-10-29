'use strict';

angular.module('myApp.notes', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/session/notes/:id', {
            templateUrl: 'notes/notes.html',
            controller: 'NotesCtrl'
        });
    }])

    .controller('NotesCtrl', ["$scope","$rootScope","$routeParams","$window" , function($scope, $rootScope, $routeParams, $window)  {

        $scope.notes = {
            text: null,
            photo: null,
            video: null,
            audio: null
        };

        function onSuccess(imageData) {
            console.log(imageData);
            window.FilePath.resolveNativePath(imageData, function(result) {
                // onSuccess code
                imageData = 'file://' + result;
                console.log(imageData)
                console.log(result)
                $scope.notes.photo = result;
                $scope.$apply();
            });
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }

        localforage.getItem($routeParams.id).then(function(value) {
            console.log(value);
            $scope.noteText = value.text;
            $scope.notes = value;
            $scope.$apply();
        }).catch(function(err) {
            console.log(err);
        });
        var callback = function(buttonIndex) {

            console.log(buttonIndex)
        };

        $scope.share = function() {
            var options = {
                androidTheme: window.plugins.actionsheet.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT, // default is THEME_TRADITIONAL
                title: "Que faire avec l'image ?",
                buttonLabels: ['Supprimmer', 'Partager'],
                androidEnableCancelButton : true,
                addCancelButtonWithLabel: 'Annuler'
            };
            window.plugins.actionsheet.show(options, callback)
        };

        $scope.getPicture = function() {
            navigator.camera.getPicture(onSuccess,onFail,{quality: 100});
        };

        $scope.recordAudio = function() {

            navigator.device.capture.captureAudio(function(mediaFiles){
                    $scope.notes.audio = mediaFiles;
                },function(erreur){
                    console.log(erreur)
                },
                {
                    limit:1,
                    duration:60
                });
        };

        $scope.recordVideo = function() {

            navigator.device.capture.captureVideo(function(mediaFiles){
                    $scope.notes.video = mediaFiles[0].fullPath;
                },function(erreur){
                    console.log(erreur)
                },
                {
                    limit:1,
                    duration:60
                });
        };

        $scope.getPictureFromGallery = function() {
            navigator.camera.getPicture(onSuccess,onFail,{quality: 100,destinationType: Camera.DestinationType.NATIVE_URI,sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM});
        };

        $scope.enregistrer = function() {
            var notes = {
                text: $scope.noteText,
                photo: null,
                video: null,
                audio: null
            };
            localforage.setItem($routeParams.id, $scope.notes)
        };

        $rootScope.displayBack = $window.history.length > 1
    }]);

