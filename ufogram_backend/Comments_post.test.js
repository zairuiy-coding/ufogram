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
  let res; // the res from our express server
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
    // create a post that this testcomment should belong to
    const resPost = await request(webapp)
      .post('/Posts/')
      .set('Content-Type', 'application/json')
      .send({ caption: 'testpost', fileURL: 'https://picsum.photos/200/301', author: 'testuser' });
    testPostID = JSON.parse(resPost.text).post._id;
    console.log('testPostID: ', testPostID);

    // create a comment for this post
    res = await request(webapp)
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
    console.log('testCommentID: ', testCommentID);
    console.log('res JSON: ', JSON.parse(res.text));
    console.log('res status: ', res.status);
  });

  /**
 * removes all testing data from the DB
 */
  const clearDatabase = async () => {
    try {
      // delete the test comment
      const result = await db.collection('Comments').deleteOne({ text: 'testcomment' });
      // delete the test post
      const result2 = await db.collection('Posts').deleteOne({ author: 'testuser' });

      const { deletedCount } = result;

      if (deletedCount === 1) {
        console.log('info', 'Successfully deleted test post');
      } else {
        console.log('warning', 'test comment was not deleted');
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
 * Status code and res type
 */
  test('the status code is 201 and res type', () => {
    expect(res.status).toBe(201); // status code
    expect(res.type).toBe('application/json');
  });

  /**
 * res body
 */
  test('the new comment is returned', () => {
    expect(JSON.parse(res.text).comment).toMatchObject(testComment); // status code
  });

  test('The new comment is in the database', async () => {
    const insertedComment = await db.collection('Comments').findOne({ _id: new ObjectId(testCommentID) });
    console.log('insertedComment: ', insertedComment);
    expect(insertedComment.text).toEqual('testcomment');
  });

  test('missing a field (author) 404', async () => {
    const res2 = await request(webapp)
      .post(`/Comments/${testPostID}`)
      .set('Content-Type', 'application/json')
      .send({ text: 'testcomment' });

    expect(res2.status).toEqual(404);
  });

  test('create a comment with invalid postID', async () => {
    const res2 = await request(webapp)
      .post('/Comments/1')
      .set('Content-Type', 'application/json')
      .send({
        text: 'testcomment',
        author: {
          id: '65404186357e2d1e38f7cbec',
          username: 'lionelhu',
        },
      });
    expect(res2.status).toEqual(404);
    expect(res2.type).toBe('application/json');
  });

  test('create a comment with empty postID', async () => {
    const res2 = await request(webapp)
      .post('/Comments/ /')
      .set('Content-Type', 'application/json')
      .send({
        text: 'testcomment',
        author: {
          id: '65404186357e2d1e38f7cbec',
          username: 'lionelhu',
        },
      });
    expect(res2.status).toEqual(404);
    expect(res2.type).toBe('application/json');
  });
});
