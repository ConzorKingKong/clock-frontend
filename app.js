var express = require('express')
var app = express()
var path = require('path')

if (process.env.NODE_ENV === 'production') {
  app.use(function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      res.redirect(302, 'https://' + req.hostname + req.originalUrl)
    } else {
      next()
    }
  })
}

app.use(express.static('public'))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

module.exports = app