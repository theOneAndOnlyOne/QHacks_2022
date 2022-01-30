// Get artists related to an artist
spotifyApi.getArtistRelatedArtists('0qeei9KQnptjwb8MgkqEoy')
    .then(function (data) {
        console.log(data.body);
    }, function (err) {
        done(err);
    });

// Get available genre seeds
spotifyApi.getAvailableGenreSeeds()
    .then(function (data) {
        let genreSeeds = data.body;
        console.log(genreSeeds);
    }, function (err) {
        console.log('Something went wrong!', err);
    });


