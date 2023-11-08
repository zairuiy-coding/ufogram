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
  //   let s3URL;
  const userID = '65404186357e2d1e38f7cbeb'; // the id of user that like/unlike a post

  /**
     * Make sure that the data is in the DB before running
     * any test
     * connect to the DB
     */
  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();
    // res_s3 = (await request(webapp)
    //   .post('/File'))
    //   .set('Content-Type', 'application/json');
    //   .send();

    // s3URL = JSON.parse(res.text).URL;
    // console.log('s3URL: ', s3URL);

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

  test('Edit a post without changing file Endpoint status code and response async/await', async () => {
    res = await request(webapp)
      .put(`/Posts/same/${testPostID}`)
      .set('Content-Type', 'application/json')
      .send({
        caption: 'testpost_updated1', file: 'https://picsum.photos/200/301', author: 'testuser',
      });

    console.log('edit a post same res: ', JSON.parse(res.text));
    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');

    // the database was updated
    const updatedPostResp1 = await db.collection('Posts').findOne({ _id: new ObjectId(testPostID) });
    // print the result
    expect(updatedPostResp1.caption).toEqual('testpost_updated1');
  });

  test('Edit a post without changing file with invalid postID', async () => {
    res = await request(webapp)
      .put('/Posts/same/1')
      .set('Content-Type', 'application/json')
      .send({
        caption: 'testpost_updated1', file: 'https://picsum.photos/200/301', author: 'testuser',
      });

    console.log('edit a post same res: ', JSON.parse(res.text));
    expect(res.status).toEqual(404);
    expect(res.type).toBe('application/json');
  });

  test('Edit a post without changing file with empty postID', async () => {
    res = await request(webapp)
      .put('/Posts/same/ /')
      .set('Content-Type', 'application/json')
      .send({
        caption: 'testpost_updated1', file: 'https://picsum.photos/200/301', author: 'testuser',
      });
    expect(res.status).toEqual(404);
    expect(res.type).toBe('application/json');
  });

  test('missing fielURL 404', async () => {
    res = await request(webapp)
      .put(`/Posts/same/${testPostID}`)
      .set('Content-Type', 'application/json')
      .send({
        caption: 'testpost_updated', author: 'testuser',
      });

    expect(res.status).toEqual(404);
  });

  test('missing caption 404', async () => {
    res = await request(webapp)
      .put(`/Posts/same/${testPostID}`)
      .set('Content-Type', 'application/json')
      .send({
        fileURL: 'https://picsum.photos/200/302', author: 'testuser',
      });

    expect(res.status).toEqual(404);
  });

  test('Unlike a post that has not been liked yet', async () => {
    res = await request(webapp).put(`/Posts/unlike/${testPostID}/${userID}`);

    expect(res.status).toEqual(400);
    expect(res.type).toBe('application/json');
  });

  test('Like a post with empty postID', async () => {
    res = await request(webapp).put(`/Posts/like/ /${userID}`);

    expect(res.status).toEqual(404);
    expect(res.type).toBe('application/json');
  });

  test('Like a post with empty userID', async () => {
    res = await request(webapp).put(`/Posts/like/${testPostID}/ /`);

    expect(res.status).toEqual(404);
    expect(res.type).toBe('application/json');
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

  test('Like a post that has already been liked', async () => {
    res = await request(webapp).put(`/Posts/like/${testPostID}/${userID}`);

    expect(res.status).toEqual(400);
    expect(res.type).toBe('application/json');
  });

  test('Unlike a post Endpoint with invalid user id', async () => {
    res = await request(webapp).put(`/Posts/unlike/${testPostID}/1`);

    expect(res.status).toEqual(404);
    expect(res.type).toBe('application/json');
  });

  test('Unlike a post Endpoint with empty user id', async () => {
    res = await request(webapp).put(`/Posts/unlike/${testPostID}/ /`);

    expect(res.status).toEqual(404);
    expect(res.type).toBe('application/json');
  });

  test('Unlike a post Endpoint with invalid post id', async () => {
    res = await request(webapp).put(`/Posts/unlike/1/${userID}`);

    expect(res.status).toEqual(404);
    expect(res.type).toBe('application/json');
  });

  test('Unlike a post Endpoint with empty post id', async () => {
    res = await request(webapp).put(`/Posts/unlike/ /${userID}`);

    expect(res.status).toEqual(404);
    expect(res.type).toBe('application/json');
  });

  test('Unlike a post Endpoint status code and response async/await', async () => {
    res = await request(webapp).put(`/Posts/unlike/${testPostID}/${userID}`);

    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');

    // userID has been removed from the post's likes array
    const unlikePostResp = await db.collection('Posts').findOne({ _id: new ObjectId(testPostID) });
    console.log('unlikePostResp: ', unlikePostResp);
    // print the result
    expect(unlikePostResp.likes).not.toContain(userID);
  });


});
