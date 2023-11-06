/* eslint-disable no-underscore-dangle */
const request = require('supertest');
// Import MongoDB module
const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, connect } = require('./DbOperations');
const webapp = require('./server');

let mongo;

// TEST PUT ENDPOINT
describe('Update a post endpoint integration test', () => {
  /**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add -'jest': true-
 */

  let res;
  let db;
  let testPostID; // will store the id of the test user
  const userID = '65404186357e2d1e38f7cbeb'; // the id of user that like/unlike a post

  /**
     * Make sure that the data is in the DB before running
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
      await db.collection('Posts').deleteOne({ author: 'testuser' });
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

  test('Edit a post Endpoint status code and response async/await', async () => {
    res = await request(webapp)
      .put(`/Posts/${testPostID}`)
      .set('Content-Type', 'application/json')
      .send({
        caption: 'testpost_updated', fileURL: 'https://picsum.photos/200/301', author: 'testuser',
      });

    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');

    // the database was updated
    const updatedPostResp = await db.collection('Posts').findOne({ _id: new ObjectId(testPostID) });
    // print the result
    expect(updatedPostResp.caption).toEqual('testpost_updated');
  });

  test('missing fielURL 404', async () => {
    res = await request(webapp)
      .put(`/Posts/${testPostID}`)
      .set('Content-Type', 'application/json')
      .send({
        caption: 'testpost_updated', author: 'testuser',
      });

    expect(res.status).toEqual(404);
  });

  test('missing caption 404', async () => {
    res = await request(webapp)
      .put(`/Posts/${testPostID}`)
      .set('Content-Type', 'application/json')
      .send({
        fileURL: 'https://picsum.photos/200/302', author: 'testuser',
      });

    expect(res.status).toEqual(404);
  });

  test('Like a post Endpoint status code and response async/await', async () => {
    res = await request(webapp).put(`/Posts/like/${testPostID}/${userID}`);

    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');
    // console.log('res: ', res);

    // userID has been added to the post's likes array
    console.log('testPostID: ', testPostID);
    const likePostResp = await db.collection('Posts').findOne({ _id: new ObjectId(testPostID) });
    console.log('likePostResp: ', likePostResp);
    // print the result
    expect(likePostResp.likes).toContain(userID);
  });

  // test('Like a post with missing userID', async () => {
  //   res = await request(webapp).put(`/Posts/like/${testPostID}`);

  //   expect(res.status).toEqual(404);
  // });

  test('Unlike a post Endpoint status code and response async/await', async () => {
    res = await request(webapp).put(`/Posts/unlike/${testPostID}/${userID}`);

    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');

    console.log('testPostID: ', testPostID);

    // userID has been removed from the post's likes array
    const unlikePostResp = await db.collection('Posts').findOne({ _id: new ObjectId(testPostID) });
    console.log('unlikePostResp: ', unlikePostResp);
    // print the result
    expect(unlikePostResp.likes).not.toContain(userID);
  });
});
