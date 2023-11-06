/* eslint-disable no-underscore-dangle */
const request = require('supertest');
// Import MongoDB module
const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, connect } = require('./DbOperations');
const webapp = require('./server');

let mongo;

// TEST PUT ENDPOINT
describe('Update a user endpoint integration test', () => {
  /**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add -'jest': true-
 */

  let res;
  let db;
  let testUserID; // will store the id of the test user

  /**
     * Make sure that the data is in the DB before running
     * any test
     * connect to the DB
     */
  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();
    res = await request(webapp)
      .post('/Users/')
      .set('Content-Type', 'application/json')
      .send({ username: 'testuser', password: '1234567' });

    // get the id of the test user
    testUserID = JSON.parse(res.text).user._id;
  });

  const clearDatabase = async () => {
    try {
      await db.collection('Users').deleteOne({ username: 'testuser_updated' });
    } catch (err) {
      console.log('error', err.message);
    }
  };
  /**
 * Delete all test data from the DB
 * Close all open connections
 */
  afterAll(async () => {
    await clearDatabase();
    try {
      await mongo.close();
      await closeMongoDBConnection(); // mongo client that started server.
    } catch (err) {
      return err;
    }
  });

  test('Endpoint status code and response async/await', async () => {
    res = await request(webapp)
      .put(`/Users/${testUserID}`)
      .set('Content-Type', 'application/json')
      .send({
        username: 'testuser_updated', password: '1234567', following: [], followers: [],
      });

    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');

    // the database was updated
    const updatedUserResp = await db.collection('Users').findOne({ _id: new ObjectId(testUserID) });
    // print the result
    expect(updatedUserResp.username).toEqual('testuser_updated');
  });

  test('missing password 404', async () => {
    res = await request(webapp)
      .put(`/Users/${testUserID}`)
      .set('Content-Type', 'application/json')
      .send({
        username: 'testuser_updated', following: [], followers: [],
      });

    expect(res.status).toEqual(404);
  });
});
