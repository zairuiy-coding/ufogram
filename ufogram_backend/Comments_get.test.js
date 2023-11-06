/* eslint-disable no-underscore-dangle */
const request = require('supertest');
const { closeMongoDBConnection, connect } = require('./DbOperations');
const webapp = require('./server');

let mongo;

// 1. TEST POST ENDPOINT
describe('GET comment(s) endpoint integration test', () => {
  /**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add -'jest': true-
*/
  let db;
  let testPostID;
  let testCommentID;
  // test resource to create / expected response
  const testComment = {
    text: 'testcomment',
    author: {
      id: '65404186357e2d1e38f7cbec',
      username: 'lionelhu',
    },
  };

  /**
     * Make sure that the data is in the DB before running
     * any test
     * connect to the DB
     */
  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();

    // create a post that this testcomment should belong to
    const resPost = await request(webapp)
      .post('/Posts/')
      .set('Content-Type', 'application/json')
      .send({ caption: 'testpost', fileURL: 'https://picsum.photos/200/301', author: 'testuser' });

    testPostID = JSON.parse(resPost.text).post._id;
    console.log('testPostID: ', testPostID);

    // create a comment for this post
    const res = await request(webapp)
      .post(`/Comments/${testPostID}`)
      .set('Content-Type', 'application/json')
      .send({
        text: 'testcomment',
        author: {
          id: '65404186357e2d1e38f7cbec',
          username: 'lionelhu',
        },
      });

    testCommentID = JSON.parse(res.text).comment._id;
  });

  const clearDatabase = async () => {
    try {
      // delete the test comment
      const result = await db.collection('Comments').deleteOne({ text: 'testcomment' });
      // delete the test post
      const result2 = await db.collection('Posts').deleteOne({ author: 'testuser' });

      const { deletedCount } = result;

      if (deletedCount === 1) {
        console.log('info', 'Successfully deleted test comment');
      } else {
        console.log('warning', 'test comment was not deleted');
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

  //   test('Get all users endpoint status code and data', async () => {
  //     const resp = await request(webapp).get('/Comments');
  //     expect(resp.status).toEqual(200);
  //     expect(resp.type).toBe('application/json');
  //     const userArr = JSON.parse(resp.text).users;
  //     // testUser is in the response
  //     // expect(userArr).toEqual(expect.arrayContaining([{ _id: testUserID, ...testUser }]));
  //     const containsTestUser = userArr.some((user) => user._id === testUserID
  //     && user.username === testUser.username);

  //     expect(containsTestUser).toBe(true);
  //   });

  test('Get a comment endpoint status code and data', async () => {
    const resp = await request(webapp).get(`/Comments/${testCommentID}`);
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    const commentArr = JSON.parse(resp.text).data;

    // testUser is in the response
    expect(commentArr).toMatchObject({
      _id: testCommentID,
      text: 'testcomment',
      author: {
        id: '65404186357e2d1e38f7cbec',
        username: 'lionelhu',
      },
    });
  });

  test('Get all comments of a post endpoint status code and data', async () => {
    const resp = await request(webapp).get(`/Comments/post/${testPostID}`);
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    const commentArr = JSON.parse(resp.text).data;
    console.log('commentArr: ', commentArr);

    // testcomment is in the response
    expect(commentArr).toEqual([{
      _id: testCommentID,
      text: 'testcomment',
      author: {
        id: '65404186357e2d1e38f7cbec',
        username: 'lionelhu',
      },
    }]);
  });

  test('comment not in db status code 404', async () => {
    const resp = await request(webapp).get('/Comments/1');
    expect(resp.status).toEqual(404);
    expect(resp.type).toBe('application/json');
  });
});
