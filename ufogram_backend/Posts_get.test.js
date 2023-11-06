/* eslint-disable no-underscore-dangle */
const request = require('supertest');
const { closeMongoDBConnection, connect } = require('./DbOperations');
const webapp = require('./server');

let mongo;

//  TEST POST ENDPOINT
describe('GET post(s) endpoint integration test', () => {
  /**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add -'jest': true-
*/
  let db;
  let testPostID;
  // test resource to create / expected response
  const testPost = { caption: 'testpost', fileURL: 'https://picsum.photos/200/301', author: 'testuser' };
  /**
     * Make sure that the data is in the DB before running
     * any test
     * connect to the DB
     */
  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();

    const res = await request(webapp)
      .post('/Posts/')
      .set('Content-Type', 'application/json')
      .send({ caption: 'testpost', fileURL: 'https://picsum.photos/200/301', author: 'testuser' });

    // eslint-disable-next-line no-underscore-dangle
    testPostID = JSON.parse(res.text).post._id;
  });

  const clearDatabase = async () => {
    try {
      const result = await db.collection('Posts').deleteOne({ author: 'testuser' });

      const { deletedCount } = result;

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

  test('Get all posts endpoint status code and data', async () => {
    const resp = await request(webapp).get('/Posts');
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    const postArr = JSON.parse(resp.text).posts;
    // testPost is in the response
    // expect(userArr).toEqual(expect.arrayContaining([{ _id: testPostID, ...testPost }]));
    const containsTestPost = postArr.some((post) => post._id === testPostID
    && post.author === testPost.author);

    expect(containsTestPost).toBe(true);
  });

  //   test('Get a post endpoint status code and data', async () => {
  //     const resp = await request(webapp).get(`/Posts/${testPostID}`);
  //     expect(resp.status).toEqual(200);
  //     expect(resp.type).toBe('application/json');
  //     const userArr = JSON.parse(resp.text).post;

  //     // testPost is in the response
  //     expect(userArr).toMatchObject({
  //       _id: testPostID,
  //       username: 'testpost',
  //       password: '1234567',
  //       following: [],
  //       followers: [],
  //     });
  //   });

//   test('post not in db status code 404', async () => {
//     const resp = await request(webapp).get('/Posts/1');
//     expect(resp.status).toEqual(404);
//     expect(resp.type).toBe('application/json');
//   });
});
