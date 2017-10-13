var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var cookieSession = require('cookie-session')
var PORT = process.env.PORT || 3000
var path = require('path')
var controllers = require('./controllers.js')

app.use(cookieSession({
    name: 'session',
    keys: [process.env.SECRET],
    maxAge: 90 * 24 * 60 * 60 * 1000
}))

app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/api/signup', controllers.signup)
app.post('/api/signin', controllers.signin)
app.post('/api/signout', controllers.signout)
app.post('/api/addtime', controllers.addtime)
app.post('/api/deletetime', controllers.deletetime)
app.get('/api/loginstatus', controllers.loginstatus)

app.listen(PORT)