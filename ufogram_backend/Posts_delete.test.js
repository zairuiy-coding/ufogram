/* eslint-disable no-underscore-dangle */
const request = require('supertest');
// Import MongoDB module
const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, connect } = require('./DbOperations');
const webapp = require('./server');

let mongo;

// TEST PUT ENDPOINT
describe('Delete a student endpoint integration test', () => {
  /**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add -'jest': true-
 */
  let res;
  let db;
  let testPostID;

  /**
     *  Make sure that the data is in the DB before running
     * any test
     * connect to the DB
     */
  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();
    res = await request(webapp)
      .post('/Posts/')
      .set('Content-Type', 'application/json')
      .send({ caption: 'testpost', fileURL: 'https://picsum.photos/200/301', author: 'testuser' });

    testPostID = JSON.parse(res.text).post._id;
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
    const resp = await request(webapp).delete(`/Posts/${testPostID}`);
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    // the user is not in the database
    const resp1 = await db.collection('Posts').findOne({ _id: new ObjectId(testPostID) });
    expect(resp1).toBeNull();
  });

  test('wrong post id format/exception - response 404', async () => {
    const resp = await request(webapp).delete('/Posts/1');
    expect(resp.status).toEqual(404);
  });

  test('post id not in system (correct id format) - response 404', async () => {
    const resp = await request(webapp).delete('/Posts/63738b602fe72e59d4a72ccc');
    expect(resp.status).toEqual(404);
  });
});
