var request = require('supertest')
var app = require('../app.js')
var controllers = require('../controllers.js')

describe('Test the root path', () => {
    test('It should get a 200 response on the GET method', (done) => {
        request(app)
          .get('/')
          .expect(200)
          .end(function(err, res) {
            console.log(res)
            done()
          })
    });
})

describe('Test api', () => {
  test('login status returns not signed in', function(done) {
    request(app)
      .get('/api/loginstatus')
      .expect(200, {loggedIn: false, times: []})
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (controllers.conn !== undefined) {
          controllers.conn.close()
        }
        done()
      })
  })
})

describe('Test 404', () => {
  test('404', function (done) {
    request(app)
      .get('/foo')
      .expect(404)
      .end(function (err, res) {
        done()
      })
  })
})
