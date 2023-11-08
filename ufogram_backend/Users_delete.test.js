/* eslint-disable no-underscore-dangle */
const request = require('supertest');
// Import MongoDB module
const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, connect } = require('./DbOperations');
const webapp = require('./server');

let mongo;

// TEST PUT ENDPOINT
describe('Delete a user endpoint integration test', () => {
  /**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add -'jest': true-
 */
  let res;
  let db;
  let testUserID;

  /**
     *  Make sure that the data is in the DB before running
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

      testUserID = JSON.parse(res.text).user._id;
  });

  const clearDatabase = async () => {
    try {
      const result = await db.collection('Users').deleteOne({ username: 'testuser' });

      console.log('info', result);
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
      await closeMongoDBConnection(); // mongo client started when running express.
    } catch (err) {
      return err;
    }
  });

  test('Endpoint response: status code, type and content', async () => {
    // successful deletion returns 200 status code
    const resp = await request(webapp).delete(`/Users/${testUserID}`);
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    // the user is not in the database
    const resp1 = await db.collection('students').findOne({ _id: new ObjectId(testUserID) });
    expect(resp1).toBeNull();
  });

  test('wrong user id format/exception - response 404', async () => {
    const resp = await request(webapp).delete('/Users/1');
    expect(resp.status).toEqual(404);
  });

  test('user id not in system (correct id format) - response 404', async () => {
    const resp = await request(webapp).delete('/Users/63738b602fe72e59d4a72ccc');
    expect(resp.status).toEqual(404);
  });

  test('user id empty - response 404', async () => {
    const resp = await request(webapp).delete('/Users/ /');
    expect(resp.status).toEqual(404);
  });
});
