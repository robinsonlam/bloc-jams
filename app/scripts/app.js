 //require('./landing');
 //require('./album');
 //require('./collection');
 //require('./profile');

 // Example album.
 var albumPicasso = {
     name: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: '/images/album-placeholder.png',

     songs: [{
         name: 'Blue',
         length: '4:26'
     }, {
         name: 'Green',
         length: '3:14'
     }, {
         name: 'Red',
         length: '5:01'
     }, {
         name: 'Pink',
         length: '3:21'
     }, {
         name: 'Magenta',
         length: '2:15'
     }]
 };




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



/******************************************************
 Collection Page 
******************************************************/

         $stateProvider.state('collection', {
             url: '/collection',
             controller: 'Collection.controller',
             templateUrl: '/templates/collection.html'
         });

/******************************************************
 Album Page 
******************************************************/

        $stateProvider.state('album', {
            url: '/album',
            controller: 'Album.controller',
            templateUrl: '/templates/album.html'
        });

/******************************************************
                        STATES
******************************************************/

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

/******************************************************
 Collection Page
******************************************************/

 blocJams.controller('Collection.controller', ['$scope',
     function($scope) {
         $scope.hideOverlay = true;
         $scope.albums = [];
         for (var i = 0; i < 33; i++) {
             $scope.albums.push(angular.copy(albumPicasso));
         }
     }
 ]);

/******************************************************
 Album Page
******************************************************/

blocJams.controller('Album.controller', ['$scope',
    function($scope){
          $scope.album = angular.copy(albumPicasso);
             var hoveredSong = null;
   var playingSong = null;
 
   $scope.onHoverSong = function(song) {
     hoveredSong = song;
   };
 
   $scope.offHoverSong = function(song) {
     hoveredSong = null;
   };

      $scope.getSongState = function(song) {
     if (song === playingSong) {
       return 'playing';
     }
     else if (song === hoveredSong) {
       return 'hovered';
     }
     return 'default';
   };
    }]);