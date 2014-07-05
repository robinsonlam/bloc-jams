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
    });
}