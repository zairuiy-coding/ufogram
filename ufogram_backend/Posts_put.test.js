/* eslint-disable no-underscore-dangle */
const request = require('supertest');
// Import MongoDB module
const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, connect } = require('./DbOperations');
const webapp = require('./server');

let mongo;

// // create formdata
// let formData;
// try {
//   formData = new FormData();
//   console.log('formData before', formData);
//   const date = new Date();
//   const name = `${date.getTime()}_${file}`;
//   console.log('File type: ', typeof file);
//   formData.append('File_0', file, name);
//   console.log('formData appended', formData);
// } catch (e) {
//   console.log(e);
// }

// // load the test .png file
// // `event` is an HTML change event from an <input type="file"> element.
// const documentFileObjectUrl = URL.createObjectURL(event.target.files[0]);
// PSPDFKit.load({
// 	document: documentFileObjectUrl
// })
// 	.then(instance => {
// 		// Make sure to revoke the object URL so the browser doesn't hold on to the file object that's not needed any more.
// 		URL.revokeObjectURL(documentFileObjectUrl);
// 	});

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

  //   test('Edit a post with a new file Endpoint status code and response async/await', async () => {
  //     res = await request(webapp)
  //       .put(`/Posts/new/${testPostID}`)
  //       .set('Content-Type', 'application/json')
  //       .send({
  //         caption: 'testpost_updated2', fileURL: 'https://picsum.photos/200/302', author: 'testuser',
  //       });

  //     expect(res.status).toEqual(200);
  //     expect(res.type).toBe('application/json');

  //     // the database was updated
  //     const updatedPostResp2 = await db.collection('Posts').findOne({ _id: new ObjectId(testPostID) });
  //     // print the result
  //     expect(updatedPostResp2.caption).toEqual('testpost_updated2');
  //   });

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
