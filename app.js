var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var cookieSession = require('cookie-session')
var path = require('path')
var controllers = require('./controllers.js')
var SUPER_SECRET = process.env.SECRET || 'VAVAVOOM'

if (process.env.NODE_ENV === 'production') {
  app.use(function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      res.redirect(302, 'https://' + req.hostname + req.originalUrl)
    } else {
      next()
    }
  })
}

app.use(cookieSession({
    name: 'session',
    keys: [SUPER_SECRET],
    maxAge: 90 * 24 * 60 * 60 * 1000
}))

app.use(bodyParser.json())

app.use(express.static('public'))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.post('/api/signup', controllers.signup)
app.post('/api/signin', controllers.signin)
app.post('/api/signout', controllers.signout)
app.post('/api/addtime', controllers.addtime)
app.post('/api/deletetime', controllers.deletetime)
app.get('/api/loginstatus', controllers.loginstatus)

module.exports = app