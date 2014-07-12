 //require('./landing');
 //require('./album');
 //require('./collection');
 //require('./profile');

 blocJams = angular.module('BlocJams', ['ui.router']);

/******************************************************
                        STATES
******************************************************/

 blocJams.config(['$stateProvider', '$locationProvider',
     function($stateProvider, $locationProvider) {
         $locationProvider.html5Mode(true);

/******************************************************
 Landing Page 
******************************************************/

         $stateProvider.state('landing', {
             url: '/',
             controller: 'Landing.controller',
             templateUrl: '/templates/landing.html'
         });

/******************************************************
 Song Page 
******************************************************/         

         $stateProvider.state('song', {
             url: '/song',
             controller: 'Song.controller',
             templateUrl: '/templates/song.html'
         });

     }
 ]);



/******************************************************
                     CONTROLLERS
******************************************************/

/******************************************************
 Landing Page 
******************************************************/

 blocJams.controller('Landing.controller', ['$scope',
     function($scope) {

         $scope.titleText = "Bloc Jams, ver. Rob - Click here to shuffle album";

         $scope.subText = "Turn the muuuusic up!";

         $scope.albumURLs = [
             '/images/album-placeholders/album-1.jpg',
             '/images/album-placeholders/album-2.jpg',
             '/images/album-placeholders/album-3.jpg',
             '/images/album-placeholders/album-4.jpg',
             '/images/album-placeholders/album-5.jpg',
             '/images/album-placeholders/album-6.jpg',
             '/images/album-placeholders/album-7.jpg',
             '/images/album-placeholders/album-8.jpg',
             '/images/album-placeholders/album-9.jpg',
         ];

         $scope.albumShuffle = function() {
             function shuffle(o) { //v1.0
                 for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
                 return o;
             };

             shuffle($scope.albumURLs);
         };

         $scope.subTextClicked = function() {
             $scope.subText += '!';
         };
     }
 ]);

/******************************************************
 Song Page 
******************************************************/  

 blocJams.controller('Song.controller', ['$scope',
     function($scope) {

        $scope.subText = "Song Template";

        $scope.changeToNo = function() {
            $scope.subText = "It CHANGED!! OH MY GOSH!";
        };

     }
 ]);
