const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const SpotifyWebApi = require('spotify-web-api-node')

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://192.168.1.110:3000',
        clientId: '4f41ca55a526466b85d9386617bbb1e8',
        clientSecret: '812272b2a49e4c0c86f363ca3501325b',
        refreshToken
    })
    spotifyApi.refreshAccessToken().then((data) => {
            res.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in
            })
        }).catch(err => {
            console.log(err)
            res.sendStatus(400)
    })
})



app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://192.168.1.110:3000',
        clientId: '4f41ca55a526466b85d9386617bbb1e8',
        clientSecret: '812272b2a49e4c0c86f363ca3501325b'
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch(err => {
        res.sendStatus(400)
    })
})

app.listen(3333)