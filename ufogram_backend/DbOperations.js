const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const dbURL = 'mongodb+srv://UFOAdmin:9HTzfKuWB23W6RPW@UFOgram.b3wc2qn.mongodb.net/UFOgram?retryWrites=true&w=majority';

let MongoConnection;
// connection to the db
const connect = async () => {
  // always use try/catch to handle any exception
  try {
    MongoConnection = (await MongoClient.connect(
      dbURL,
      { useNewUrlParser: true, useUnifiedTopology: true },
    )); // we return the entire connection, not just the DB
    // check that we are connected to the db
    console.log(`connected to db: ${MongoConnection.db().databaseName}`);
    // return MongoConnection;
  } catch (err) {
    console.log(err.message);
  }
};

const getDB = async () => {
  // test if there is an active connection
  if (!MongoConnection) {
    await connect();
  }
  return MongoConnection.db();
};

const checkUserExists = async (userId) => {
  try {
    // get the db
    const db = await getDB();

    db.collection('Users').findOne(
      {
        _id: ObjectId(userId),
      },
      (err, result) => {
        if (err) {
          console.log(`error: ${err.message}`);
          return -1;
        }
        if (result) {
          return 0;
        }
        console.log('Can\'t find user');
        return -1;
      },
    );
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const checkPostExists = async (postId) => {
  try {
    // get the db
    const db = await getDB();

    db.collection('Posts').findOne(
      {
        _id: ObjectId(postId),
      },
      (err, result) => {
        if (err) {
          console.log(`error: ${err.message}`);
          return -1;
        }
        if (result) {
          return 0;
        }
        console.log('Can\'t find post');
        return -1;
      },
    );
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const checkCommentExists = async (commentId) => {
  try {
    // get the db
    const db = await getDB();

    db.collection('Comments').findOne(
      {
        _id: ObjectId(commentId),
      },
      (err, result) => {
        if (err) {
          console.log(`error: ${err.message}`);
          return -1;
        }
        if (result) {
          return 0;
        }
        console.log('Can\'t find comment');
        return -1;
      },
    );
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

/**
   *
   * Close the mongodb connection
   */
const closeMongoDBConnection = async () => {
  await MongoConnection.close();
};

const getUsers = async () => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('Users').find().toArray();
    // print the results
    console.log(`Users: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const addUser = async (newUser) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('Users').insertOne(newUser);
    return result.insertedId;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const getUser = async (userId) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('Users').findOne({ _id: new ObjectId(userId) });
    // print the result
    console.log(`User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

// const updateUser = async (userId, newCommentId) => {
//   try {
//     // get the db
//     const db = await getDB();
//     const result = await db.collection('Users').updateOne(
//       { _id: ObjectId(userId) },
//       // add a new comment id
//       // { $set: { major: newMajor } },
//     );
//     return result;
//   } catch (err) {
//     console.log(`error: ${err.message}`);
//   }
// };

const addPostLike = async (postId, userId) => {
  try {
    // get the db
    const db = await getDB();

    const exists = await checkUserExists(userId);
    if (exists !== 0) {
      return -2;
    }

    // check the user has not liked the post yet
    db.collection('Posts').findOne(
      {
        _id: ObjectId(postId),
        likes: { $in: userId },
      },
      (err, result) => {
        if (err) {
          console.log(`error: ${err.message}`);
        } else {
          if (result) {
            console.log('Error: Already liked post');
            return -1;
          }
          console.log('Haven\'t liked post');
        }
      },
    );
    const result = await db.collection('Posts').updateOne(
      { _id: ObjectId(postId) },
      { $push: { likes: userId } },
    );
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const removePostLike = async (postId, userId) => {
  try {
    // get the db
    const db = await getDB();

    const exists = await checkUserExists(userId);
    if (exists !== 0) {
      return -2;
    }

    db.collection('Posts').findOne(
      {
        _id: ObjectId(postId),
        likes: { $in: userId },
      },
      (err, result) => {
        if (err) {
          console.log(`error: ${err.message}`);
        } else if (result) {
          console.log('Already liked post');
        } else {
          console.log('Error: Haven\'t liked post');
          return -1;
        }
      },
    );
    const result = await db.collection('Posts').updateOne(
      { _id: ObjectId(postId) },
      { $pull: { likes: userId } },
    );
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const updatePost = async (postId, caption, fileURL, author) => {
  try {
    const db = await getDB();
    const result = await db.collection('Posts').updateOne(
      { _id: ObjectId(postId) },
      { $set: { caption } },
      { $set: { fileURL } },
      { $set: { author } },
    );
    console.log(`Post: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const createPost = async (newPost) => {
  try {
    const db = await getDB();
    const result = await db.collection('Posts').insertOne(newPost);
    return result.insertedId;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const deletePost = async (postId) => {
  try {
    const db = await getDB();
    const result = await db.collection('Posts').deleteOne(
      { _id: ObjectId(postId) },
    );
    console.log(`Deleted post: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const addComment = async (newComment) => {
  // get the db
  try {
    const db = await getDB();
    const result = await db.collection('Comments').insertOne(newComment);
    return result.insertedId;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const getComment = async (commentId) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('Comments').findOne({ _id: new ObjectId(commentId) });
    // print the result
    console.log(`User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const commentPost = async (postId, commentId) => {
  try {
    const db = await getDB();
    const commentExists = await checkCommentExists(commentId);
    if (commentExists) {
      return -2;
    }
    const result = await db.collection('Posts').updateOne(
      { _id: ObjectId(postId) },
      { $push: { comments: commentId } },
    );
    console.log(`Post: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

// export the functions
module.exports = {
  closeMongoDBConnection,
  getDB,
  connect,
  addUser,
  getUsers,
  getUser,
  updatePost,
  addPostLike,
  removePostLike,
  checkUserExists,
  checkPostExists,
  checkCommentExists,
  addComment,
  getComment,
  commentPost,
  deletePost,
  createPost,
};
