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
         length: '4:26',
         audioUrl: '/music/placeholders/blue'
     }, {
         name: 'Green',
         length: '3:14',
         audioUrl: '/music/placeholders/green'
     }, {
         name: 'Red',
         length: '5:01',
         audioUrl: '/music/placeholders/red'
     }, {
         name: 'Pink',
         length: '3:21',
         audioUrl: '/music/placeholders/pink'
     }, {
         name: 'Magenta',
         length: '2:15',
         audioUrl: '/music/placeholders/magenta'
     }]
 };

 blocJams = angular.module('BlocJams', ['ui.router']);

 /******************************************************
                      DIRECTIVES
******************************************************/

blocJams.directive('slider', function(){

    var updateSeekPercentage = function($seekBar, event) {
     var barWidth = $seekBar.width();
     var offsetX =  event.pageX - $seekBar.offset().left;
 
     var offsetXPercent = (offsetX  / $seekBar.width()) * 100;
     offsetXPercent = Math.max(0, offsetXPercent);
     offsetXPercent = Math.min(100, offsetXPercent);
 
     var percentageString = offsetXPercent + '%';
     $seekBar.find('.fill').width(percentageString);
     $seekBar.find('.thumb').css({left: percentageString});
   }

    return{
    templateUrl: '/templates/directives/slider.html', // We'll create these files shortly.
     replace: true,
     restrict: 'E',
     link: function(scope, element, attributes) {
      
      var $seekBar = $(element);
 
      $seekBar.click(function(event) {
        updateSeekPercentage($seekBar, event);
      });
 
      $seekBar.find('.thumb').mousedown(function(event){
        $seekBar.addClass('no-animate');
 
        $(document).bind('mousemove.thumb', function(event){
          updateSeekPercentage($seekBar, event);
        });
 
        //cleanup
        $(document).bind('mouseup.thumb', function(){
          $seekBar.removeClass('no-animate');
          $(document).unbind('mousemove.thumb');
          $(document).unbind('mouseup.thumb');
        });
 
      });
    }
    };
});

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
 Album Page 
******************************************************/

         $stateProvider.state('playerBar', {
             controller: 'playerBar.controller',
             templateUrl: '/templates/player_bar.html'
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
 blocJams.controller('Collection.controller', ['$scope', 'SongPlayer',
     function($scope, SongPlayer) {
         $scope.hideOverlay = true;
         $scope.albums = [];
         for (var i = 0; i < 33; i++) {
             $scope.albums.push(angular.copy(albumPicasso));
         }

         $scope.playAlbum = function(album) {
             SongPlayer.setSong(album, album.songs[0]);
         }
     }
 ]);

 /******************************************************
 Album Page
******************************************************/

 blocJams.controller('Album.controller', ['$scope', 'SongPlayer',
     function($scope, SongPlayer) {
         $scope.album = angular.copy(albumPicasso);
         var hoveredSong = null;

         $scope.onHoverSong = function(song) {
             hoveredSong = song;
         };

         $scope.offHoverSong = function(song) {
             hoveredSong = null;
         };

         $scope.getSongState = function(song) {
             if (song === SongPlayer.currentSong && SongPlayer.playing) {
                 return 'playing';
             } else if (song === hoveredSong) {
                 return 'hovered';
             }
             return 'default';
         };

         $scope.playSong = function(song) {
             SongPlayer.setSong($scope.album, song);
         };

         $scope.pauseSong = function(song) {
             SongPlayer.pause();
         };

     }
 ]);

 /******************************************************
 Song Player 
******************************************************/

 blocJams.controller('PlayerBar.controller', ['$scope', 'SongPlayer',
     function($scope, SongPlayer) {
         $scope.songPlayer = SongPlayer;
     }
 ]);

 blocJams.service('SongPlayer', function() {

     var currentSoundFile = null;

     var trackIndex = function(album, song) {
         return album.songs.indexOf(song);
     };


     return {
         currentSong: null,
         currentAlbum: null,
         playing: false,

         play: function() {
             this.playing = true;
             currentSoundFile.play();
         },
         pause: function() {
             this.playing = false;
             currentSoundFile.pause();
         },
         setSong: function(album, song) {

             if (currentSoundFile) {
                 currentSoundFile.stop();
             }
             this.currentAlbum = album;
             this.currentSong = song;
             currentSoundFile = new buzz.sound(song.audioUrl, {
                 formats: ["mp3"],
                 preload: true
             });

             this.play();

         },
         next: function() {
             var currentTrackIndex = trackIndex(this.currentAlbum, this.currentSong);
             currentTrackIndex++;
             if (currentTrackIndex >= this.currentAlbum.songs.length) {
                 currentTrackIndex = 0;
             }
             var song = this.currentAlbum.songs[currentTrackIndex];
             this.setSong(this.currentAlbum, song);
         },
         previous: function() {
             var currentTrackIndex = trackIndex(this.currentAlbum, this.currentSong);
             currentTrackIndex--;
             if (currentTrackIndex < 0) {
                 currentTrackIndex = this.currentAlbum.songs.length - 1;
             }

             var song = this.currentAlbum.songs[currentTrackIndex];
             this.setSong(this.currentAlbum, song);
         }
     };
 });