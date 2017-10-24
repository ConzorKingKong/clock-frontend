var test = require('tape')
var request = require('supertest')
var app = require('../app.js')

test('Verify headers are set', function(assert) {
  request(app)
    .get('/')
    .expect(200)
    .expect('access-control-allow-origin', '*')
    .expect('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept')
    .end(function(err, res) {
      assert.error(err, 'No error')
      assert.end()
    })
})

test('Get /', function(assert) {
  request(app)
    .get('/')
    .expect(200)
    .end(function(err, res) {
      assert.error(err, 'No error')
      assert.end()
    })
})

test('login status returns not signed in', function(assert) {
  request(app)
    .get('/api/loginstatus')
    .expect(200, {loggedIn: false, times: []})
    .expect('Content-Type', /json/)
    .end(function (err, res) {
      assert.error(err, 'No error')
      assert.end()
    })
})

test('404', function (assert) {
  request(app)
    .get('/foo')
    .expect(404)
    .end(function (err, res) {
      assert.error(err, 'No error')
      assert.end()
    })
})