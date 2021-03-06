const express = require('express');
const server = express();
const cors = require('cors');

server.use(cors());
const SpotifyWebApi = require('spotify-web-api-node');
scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private']

require('dotenv').config();

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_API_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.CALLBACK_URL,
});

/* GET home page. */
server.get('/', function (req, res, next) {
    res.send(`home page (will be the react app, I guess, so this route won't render anything.)`);
});

server.get('/login', (req, res) => {
    const html = spotifyApi.createAuthorizeURL(scopes)
    res.redirect(html + "&show_dialog=true")
})

server.get('/callback', async (req, res) => {
    const { code } = req.query;
    try {
        const data = await spotifyApi.authorizationCodeGrant(code)
        const { access_token, refresh_token } = data.body;
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);
        res.redirect('/');
    } catch (err) {
        res.redirect('/#/error/invalid token');
    }
});


server.get('/playlists', async (req, res) => {
    try {
        var result = await spotifyApi.getUserPlaylists();
        console.log(result.body);
        res.status(200).send(result.body);
    } catch (err) {
        res.status(400).send(err)
    }

});

server.get('/related', async (req, res) => {
    const { id } = req.query;
    try {
        var result = await spotifyApi.getArtistRelatedArtists(id);
        console.log(result.body);
        res.status(200).send(result.body);
    } catch (err) {
        res.status(400).send(err)
    }
})


const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`watching port ${port}`);
})