const db = require('./database/dbConfig.js');

const Users = require('./config/data-model.js');

const bcrypt = require('bcryptjs');

// Tests for the model of the users
describe('users model', () => {
  // Reset the db after every test
  beforeEach(async () => {
    await db('users').truncate();
  });

  //
  describe('register function', () => {
    it('registers a  user into for the database', async () => {
      let users;
      users = await db('users');
      expect(users).toHaveLength(0);
      await Users.add({
        username: 'finishingthischallenge',
        password: bcrypt.hashSync('whenisitfinished', 12),
      });
      await Users.add({
        username: 'neverendingstory',
        password: bcrypt.hashSync('mysecretpassword123', 12),
      });
      userAmount = await db('users');
      expect(userAmount).toHaveLength(2);
    });

    it('inserts the provided user into the db', async () => {
      let user = await Users.add({
        username: 'saschamajewsky',
        password: bcrypt.hashSync('thiara', 12),
      });
      expect(user.username).toBe('saschamajewsky');
    });
  });
});
