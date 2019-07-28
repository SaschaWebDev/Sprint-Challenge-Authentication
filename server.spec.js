const request = require('supertest');

const server = require('./api/server.js');

// Testing for correct environment
describe('server environment tests', () => {
  it('db environment set to development', () => {
    expect(process.env.DB_ENV).toBe('development');
  });

  describe('POST to get jokes ', () => {
    it('should return 200 OK', () => {
      return (
        request(server)
          .post('/api/jokes')
          .set('authorization', 'incorrectToken')
          /* .expect(200); */
          .then(res => {
            // 404 for bad token
            expect(res.status).toBe(404);
          })
      );
    });

    describe('POST TO LOGIN  ', () => {
      it('should return 500 for incorrect columns on the table', () => {
        return (
          request(server)
            .post('/api/login')
            .send({
              incorrectColumn: 3,
              notExisting: 'whatever',
            })
            /* .expect(200); */
            .then(res => {
              // 500 "error": "The was an error submitting your credentials for login."
              expect(res.status).toBe(500);
            })
        );
      });
    });
  });
});
