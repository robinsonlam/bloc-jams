(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("scripts/album", function(exports, require, module) {
var albumMarconi = {
    name: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: '/images/album-placeholder2.png',

    songs: [{
        name: 'Hello, Operator?',
        length: '1:01'
    }, {
        name: 'Ring, ring, ring',
        length: '5:01'
    }, {
        name: 'Fits in your pocket',
        length: '3:21'
    }, {
        name: 'Can you hear me now?',
        length: '3:14'
    }, {
        name: 'Wrong phone number',
        length: '2:15'
    }]
};

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

var albumTest = {
    name: 'The Testers',
    artist: 'P Testo',
    label: 'Testism',
    year: '1011',
    albumArtUrl: '/images/album-placeholder.png',

    songs: [{
        name: 'Bloo',
        length: '2:26'
    }, {
        name: 'Gree',
        length: '4:14'
    }, {
        name: 'Rad',
        length: '99:01'
    }, {
        name: 'Pank',
        length: '7:21'
    }, {
        name: 'Manta',
        length: '3:15'
    }]
};

var albumArray = [albumMarconi, albumPicasso, albumTest];

var updateAlbumView = function(album) {
    // Update the album title
    var $albumTitle = $('.album-title');
    $albumTitle.text(album.name);

    // Update the album artist
    var $albumArtist = $('.album-artist');
    $albumArtist.text(album.artist);

    // Update the meta information
    var $albumMeta = $('.album-meta-info');
    $albumMeta.text(album.year + " on " + album.label);

    // Update the album image
    var $albumImage = $('.album-image img');
    $albumImage.attr('src', album.albumArtUrl);

    // Update the Song List
    var $songList = $(".album-song-listing");
    $songList.empty();
    var songs = album.songs;
    for (var i = 0; i < songs.length; i++) {
        var songData = songs[i];
        var $newRow = createSongRow(i + 1, songData.name, songData.length);
        $songList.append($newRow);
    }
};

var currentlyPlayingSong = null;

var createSongRow = function(songNumber, songName, songLength) {
    var template =
        '<tr>' + '  <td class="song-number col-md-1" data-song-number="' + songNumber + '">' + songNumber + '</td>' + '  <td class="col-md-9">' + songName + '</td>' + '  <td class="col-md-2">' + songLength + '</td>' + '</tr>';

    // Instead of returning the row immediately, we'll attach hover
    // functionality to it first.
    var $row = $(template);

    var onHover = function(event) {
        songNumberCell = $(this).find('.song-number');
        songNumber = songNumberCell.data('song-number');
        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html('<a class="album-song-button"><i class="fa fa-play"></i></a>');
        }
    };

    var offHover = function(event) {
        songNumberCell = $(this).find('.song-number');
        songNumber = songNumberCell.data('song-number');
        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
    };

    var clickHandler = function(event) {
        songNUmber = $(this).data('song-number');
        if (currentlyPlayingSong !== null) { //if any song is playing
            currentlyPlayingCell = $('.song-number[data-song-number="' + currentlyPlayingSong + '"]');
            currentlyPlayingCell.html(currentlyPlayingSong);
        }
        if (currentlyPlayingSong !== songNumber) { //if clicked  and is current song  not playing
            // a Paly iconw ill be showing on hover
            // switch from play to pause to show it is playing
            $(this).html('<a class="album-song-button"><i class="fa fa-pause"></i></a>');
            currentlyPlayingSong = songNumber;
        } else if (currentlyPlayingSong === songNumber) { //if clicked and current song is playing
            // Switch from pause to play for current song to indicate pausing
            $(this).html('<a class="album-song-button"><i class="fa fa-play"></i></a>');
            currentlyPlayingSong = null;
        }
    };

    $row.find('.song-number').click(clickHandler);
    $row.hover(onHover, offHover);

    return $row;
};

var chooseRandomAlbum = function() {
    var temp = albumCounter;
    do {
        if (albumCounter === temp) {
            albumCounter = Math.round(Math.random() * (albumArray.length - 1));
            console.log("Counter is " + albumCounter);
            console.log("Temp is " + temp);
            console.log(albumArray[albumCounter]);
        }
    } while (albumCounter === temp)
    currentAlbum = albumArray[albumCounter];
    console.log("Album changed to: " + currentAlbum.name);
    updateAlbumView(currentAlbum);
};

var updateSeekPercentage = function($seekBar, event) {
    var barWidth = $seekBar.width();
    var offsetX = event.pageX - $seekBar.offset().left; // get mouse x offset here

    var offsetXPercent = (offsetX / $seekBar.width()) * 100;
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);

    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({
        left: percentageString
    });
};

var setupSeekBars = function() {

    $seekBars = $('.player-bar .seek-bar');
    $seekBars.click(function(event) {
        updateSeekPercentage($(this), event);
    });

    $seekBars.find('.thumb').mousedown(function(event) {
        var $seekBar = $(this).parent();

        $seekBar.addClass('no-animate');

        $(document).bind('mousemove.thumb', function(event) {
            updateSeekPercentage($seekBar, event);
        });


        // clean up
        $(document).bind('mouseup.thumb', function() {
            $seekBar.addClass('no-animate');

            $(document).unbind('mousemove.thumb');
            $(document).unbind('mouseup.thumb');
        });
    });
};





// This 'if' condition is used to prevent the jQuery modifications
// from happening on non-Album view pages.
//  - Use a regex to validate that the url has "/album" in its path.
if (document.URL.match(/\/album.html/)) {
    // Wait until the HTML is fully processed.
    var albumCounter = Math.round(Math.random() * (albumArray.length - 1));
    var currentAlbum = albumArray[albumCounter];

    $(document).ready(function() {
        $(".album-title").click(function() {
            chooseRandomAlbum();
        });
        updateAlbumView(currentAlbum);
        setupSeekBars();
    });
}
});

;require.register("scripts/app", function(exports, require, module) {
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
});

;require.register("scripts/collection", function(exports, require, module) {
var buildAlbumThumbnail = function() {
    var template =
        '<div class="collection-album-container col-md-2">' + '  <div class="collection-album-image-container">' + '    <img src="/images/album-placeholder.png"/>' + '  </div>' + '  <div class="caption album-collection-info">' + '    <p>' + '      <a class="album-name" href="/album.html"> Album Name </a>' + '      <br/>' + '      <a href="/album.html"> Artist name </a>' + '      <br/>' + '      X songs' + '      <br/>' + '		X:XX Total Length' + '      <br/>' + '    </p>' + '  </div>' + '</div>';
    return $(template);
};

var buildAlbumOverlay = function(albumURL) {
    var template =
        '<div class="collection-album-image-overlay">' + '  <div class="collection-overlay-content">' + '    <a class="collection-overlay-button" href="' + albumURL + '">' + '      <i class="fa fa-play"></i>' + '    </a>' + '    &nbsp;' + '    <a class="collection-overlay-button">' + '      <i class="fa fa-plus"></i>' + '    </a>' + '  </div>' + '</div>';
    return $(template);
};

var updateCollectionView = function() {
    var $collection = $(".collection-container .row");
    $collection.empty();
    for (var i = 0; i < 20; i++) {
        var $newThumbnail = buildAlbumThumbnail();
        $collection.append($newThumbnail);
    }

    var onHover = function(event) {
        $(this).append(buildAlbumOverlay("/album.html"));
    };
    var offHover = function(event) {
        $(this).find('.collection-album-image-overlay').remove();
    };

    $collection.find('.collection-album-image-container').hover(onHover, offHover);
};

if (document.URL.match(/\/collection.html/)) { // This waits until the HTML is fully processed.
    $(document).ready(function() {
        updateCollectionView();
    });
}
});

;require.register("scripts/landing", function(exports, require, module) {
$(document).ready(function() { 

	$('.hero-content h3').click(function() {
		subText = $(this).text();
      	$(this).text(subText + "!");
	});

	var onHoverAction = function(event) {
		console.log("Hover action TRIGGERED!!");
		$(this).animate({'margin-top': '10px'});
	};

	var offHoverAction = function(event) {
		console.log("Off-Hover action TRIGGERED!!");
		$(this).animate({'margin-top': '0px'});
	};

	var onHoverColourChange = function(event) {
		console.log("Let's colour this text!");
		$(this).css({'color': 'red'});
	};

	var offHoverColourChange = function(event) {
		console.log("Let's un-colour this text!");
		$(this).css({'color': 'white'});
	};

	$('.selling-points .point').hover(onHoverAction, offHoverAction);
	$('.logo').click(function() {
		console.log("GOODBYE SUCKERS! Hehehehe")
		$(this).fadeOut()});
	$('.hero-content h3').hover(onHoverColourChange, offHoverColourChange);
});
});

;require.register("scripts/profile", function(exports, require, module) {
 // holds the name of our tab button container for selection later in the function
 var tabsContainer = ".user-profile-tabs-container"
 var selectTabHandler = function(event) {
     $tab = $(this);
     $(tabsContainer + " li").removeClass('active');
     $tab.parent().addClass('active');
     selectedTabName = $tab.attr('href');
     console.log(selectedTabName);
     $(".tab-pane").addClass('hidden');
     $(selectedTabName).removeClass('hidden');
     event.preventDefault();
 };

 if (document.URL.match(/\/profile.html/)) {
     $(document).ready(function() {
         var $tabs = $(tabsContainer + " a");
         $tabs.click(selectTabHandler);
         $tabs[0].click();
     });
 }
});

;
//# sourceMappingURL=app.js.map