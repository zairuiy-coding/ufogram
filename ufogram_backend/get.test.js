/* eslint-disable no-underscore-dangle */
const request = require('supertest');
const { closeMongoDBConnection, connect } = require('./DbOperations');
const webapp = require('./server');

let mongo;

// 1. TEST POST ENDPOINT
describe('GET user(s) endpoint integration test', () => {
  /**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add -'jest': true-
*/
  let db;
  let testUserID;
  // test resource to create / expected response
  const testUser = { username: 'testuser', password: '1234567' };
  /**
     * Make sure that the data is in the DB before running
     * any test
     * connect to the DB
     */
  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();
    // const res = await request(webapp).post('/Users/')
    //   .send('username=testuser&password=1234567');
    const res = await request(webapp)
      .post('/Users/')
      .set('Content-Type', 'application/json')
      .send({ username: 'testuser', password: '1234567' });

    console.log('testuser add successfully');
    console.log('res.text: ', res.text);
    // eslint-disable-next-line no-underscore-dangle
    testUserID = JSON.parse(res.text).user._id;
    console.log('testUserID: ', testUserID);
    console.log('beforeAll completed');
  });

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

  test('Get all users endpoint status code and data', async () => {
    const resp = await request(webapp).get('/Users');
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    const userArr = JSON.parse(resp.text).users;
    // testUser is in the response
    // expect(userArr).toEqual(expect.arrayContaining([{ _id: testUserID, ...testUser }]));
    const containsTestUser = userArr.some((user) => user._id === testUserID
    && user.username === testUser.username);

    expect(containsTestUser).toBe(true);
  });

  test('Get a user endpoint status code and data', async () => {
    const resp = await request(webapp).get(`/Users/${testUserID}`);
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    const userArr = JSON.parse(resp.text).user;

    // testUser is in the response
    expect(userArr).toMatchObject({
      _id: testUserID,
      username: 'testuser',
      password: '1234567',
      following: [],
      followers: [],
    });
  });

  //   test('Update a user endpoint status code and data', async () => {
  //     const resp = await request(webapp)
  //       .put(`/Users/${testUserID}`)
  //       .set('Content-Type', 'application/json')
  //       .send({
  //         username: 'testuser_updated', password: '1234567', following: [], followers: [],
  //       });

  //     console.log('resp.text in update user test: ', resp.text);
  //     expect(resp.status).toEqual(200);
  //     expect(resp.type).toBe('application/json');

  //   // Retrieve the updated user data
  //   const updatedUserResp = await request(webapp).get(`/Users/${testUserID}`);
  //   expect(updatedUserResp.status).toEqual(200);

  //   // Assert the expected values on the retrieved user data
  //   const updatedUser = JSON.parse(updatedUserResp.text).user;
  //   expect(updatedUser).toMatchObject({
  //     _id: testUserID,
  //     username: 'testuser_updated',
  //     password: '1234567',
  //     following: [],
  //     followers: [],
  //   });
  //   });

  test('user not in db status code 404', async () => {
    const resp = await request(webapp).get('/Users/1');
    expect(resp.status).toEqual(404);
    expect(resp.type).toBe('application/json');
  });
});
