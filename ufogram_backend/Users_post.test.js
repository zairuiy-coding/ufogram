/* eslint-disable no-underscore-dangle */
// import supertest
const request = require('supertest');
// Import MongoDB module
const { ObjectId } = require('mongodb');
// import the function to close the mongodb connection
const { closeMongoDBConnection, connect } = require('./DbOperations');

// import the express server
const webapp = require('./server');

// connection to the DB
let mongo;

describe('POST /user enpoint tests', () => {
  let db; // the db
  let response; // the response from our express server
  let testUserID;
  /**
     * We need to make the request to the endpoint
     * before running any test.
     * We need to connecto the DB for all the DB checks
     * If beforeAll is undefined
     * inside .eslintrc.js, add 'jest' to the 'env' key
     */
  beforeAll(async () => {
    // connect to the db
    mongo = await connect();
    // get the db
    db = mongo.db();
    // send the request to the API and collect the response
    response = await request(webapp)
      .post('/Users/')
      .set('Content-Type', 'application/json')
      .send({ username: 'testuser', password: '1234567' });
    testUserID = JSON.parse(response.text).user._id;
  });
  /**
 * removes all testing data from the DB
 */
  const clearDatabase = async () => {
    try {
      const result = await db.collection('Users').deleteOne({ username: 'testuser' });
      console.log('result: ', result);
      const { deletedCount } = result;
      console.log('deletedCount: ', deletedCount);

      if (deletedCount === 1) {
        console.log('info', 'Successfully deleted test user');
      } else {
        console.log('warning', 'test user was not deleted');
      }
    } catch (err) {
      console.log('clearDatabase error', err.message);
    }
  };

  /**
 * After running the tests, we need to remove any test data from the DB
 * We need to close the mongodb connection
 */
  afterAll(async () => {
    // we need to clear the DB
    try {
      await clearDatabase();
      await mongo.close(); // the test  file connection
      await closeMongoDBConnection(); // the express connection
    } catch (err) {
      return err;
    }
  });

  /**
 * Status code and response type
 */
  test('the status code is 201 and response type', () => {
    expect(response.status).toBe(201); // status code
    expect(response.type).toBe('application/json');
  });

  /**
 * response body
 */
  test('the new user is returned', () => {
    const testUser = { username: 'testuser', password: '1234567' };
    expect(JSON.parse(response.text).user).toMatchObject(testUser); // status code
  });

  test('The new User is in the database', async () => {
    const insertedUser = await db.collection('Users').findOne({ _id: new ObjectId(testUserID) });
    expect(insertedUser.username).toEqual('testuser');
  });

  test('missing a field (password) 404', async () => {
    const res = await request(webapp)
      .post('/Users/')
      .set('Content-Type', 'application/json')
      .send({ username: 'testuser' });

    expect(res.status).toEqual(404);
  });
});
