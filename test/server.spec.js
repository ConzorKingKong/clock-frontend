var request = require('supertest')
var app = require('../app.js')

describe('Test the root path', () => {
    test('It should get a 200 response on the GET method', (done) => {
        request(app)
          .get('/')
          .expect(200)
          .end(function(err, res) {
            done()
          })
    });
})
