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
  return MongoConnection;
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
    console.log('checkUserExists called');

    const result = await db.collection('Users').findOne(
      {
        _id: new ObjectId(userId),
      },
    );

    if (result) {
      console.log('user exists');
      return 0;
    }
    return -1;

    //   (err, result) => {
    //     if (err) {
    //       console.log(`error: ${err.message}`);
    //       return -1;
    //     }
    //     if (result) {
    //       console.log('result: ', result);
    //       return 0;
    //     }
    //     console.log('Can\'t find user');
    //     return -1;
    //   },
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const checkPostExists = async (postId) => {
  try {
    // get the db
    const db = await getDB();
    console.log('checkPostExists called');

    const result = await db.collection('Posts').findOne(
      {
        _id: new ObjectId(postId),
      },
    );

    if (result) {
      console.log('post exists');
      return 0;
    }
    console.log('post does not exist');
    console.log('find post result: ', result);

    return -1;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const checkCommentExists = async (commentId) => {
  try {
    // get the db
    const db = await getDB();

    const result = await db.collection('Comments').findOne(
      {
        _id: new ObjectId(commentId),
      },
    );

    if (result) {
      console.log('post exists');
      return 0;
    }
    return -1;
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

const updateUser = async (userId, newUsername, newPassword, newFollowing, newFollowers) => {
  try {
    // get the db
    console.log('DbOp updateUser userId', userId);
    console.log('DbOp updateUser following', newFollowing);
    console.log('DbOp updateUser folllowers', newFollowers);
    const db = await getDB();
    const result = await db.collection('Users').updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          username: newUsername,
          password: newPassword,
          following: newFollowing,
          followers: newFollowers,
        },
      },
      // { $set: { username: newUsername } },
      // { $set: { password: newPassword } },
      // { $set: { following: newFollowing } },
      // { $set: { followers: newFollowers } },
    );
    console.log('DbOp updateUser result', result);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const deleteUser = async (userId) => {
  try {
    const db = await getDB();
    const result = await db.collection('Users').deleteOne(
      { _id: new ObjectId(userId) },
    );
    console.log(`Deleted user: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const getPosts = async () => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('Posts').find().toArray();
    // print the results
    console.log(`Posts: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const getPost = async (postId) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('Posts').findOne({ _id: new ObjectId(postId) });
    // print the result
    console.log(`Post: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const addPostLike = async (postId, userId) => {
  try {
    // get the db
    const db = await getDB();

    const userExists = await checkUserExists(userId);
    if (userExists !== 0) {
      return -2;
    }

    // const postExists = await checkPostExists(postId);
    // if (postExists !== 0) {
    //   return -2;
    // }

    // check the user has not liked the post yet
    const alreadyLiked = await db.collection('Posts').findOne(
      {
        _id: new ObjectId(postId),
        likes: { $in: [userId] },
      },
    );

    if (alreadyLiked) {
      console.log('Error: Already liked post');
      return -1;
    }

    const result = await db.collection('Posts').updateOne(
      { _id: new ObjectId(postId) },
      { $push: { likes: userId } },
    );
    console.log('addPostLike result: ', result);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const removePostLike = async (postId, userId) => {
  try {
    // get the db
    const db = await getDB();

    const userExists = await checkUserExists(userId);
    if (userExists !== 0) {
      return -2;
    }

    // const postExists = await checkPostExists(postId);
    // if (postExists !== 0) {
    //   return -2;
    // }

    // check the user has not liked the post yet
    const alreadyLiked = await db.collection('Posts').findOne(
      {
        _id: new ObjectId(postId),
        likes: { $in: [userId] },
      },
    );

    if (alreadyLiked) {
      console.log('Legit: Already liked post');
    } else {
      console.log('Error: Haven\'t liked post');
      return -1;
    }

    const result = await db.collection('Posts').updateOne(
      { _id: new ObjectId(postId) },
      { $pull: { likes: userId } },
    );
    console.log('removePostLike result: ', result);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const updatePost = async (postId, caption, fileURL, author) => {
  try {
    const db = await getDB();
    const result = await db.collection('Posts').updateOne(
      { _id: new ObjectId(postId) },
      {
        $set: {
          caption,
          fileURL,
          author,
        },
      },
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
      { _id: new ObjectId(postId) },
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
    console.log(`Comment: ${JSON.stringify(result)}`);
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
      { _id: new ObjectId(postId) },
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
  deleteUser,
  getPosts,
  getPost,
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
  updateUser,
};
