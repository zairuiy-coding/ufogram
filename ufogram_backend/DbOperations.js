const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const dbURL = process.env.MONGODB_URL;

let MongoConnection;
// connection to the db
const connect = async () => {
  // always use try/catch to handle any exception
  try {
    MongoConnection = await MongoClient.connect(dbURL);
    console.log(`connected to db: ${MongoConnection.db().databaseName}`);
  } catch (err) {
    console.log('Error connecting to MongoDB:', err.message);
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

    const result = await db.collection('Users').findOne({
      _id: new ObjectId(userId),
    });

    if (result) {
      return 0;
    }
    return -1;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return -2;
  }
};

const checkPostExists = async (postId) => {
  try {
    const db = await getDB();

    const result = await db.collection('Posts').findOne({
      _id: new ObjectId(postId),
    });

    if (result) {
      return 0;
    }

    return -1;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return -2;
  }
};

const checkCommentExists = async (commentId) => {
  try {
    const db = await getDB();

    const result = await db.collection('Comments').findOne({
      _id: new ObjectId(commentId),
    });

    if (result) {
      return 0;
    }
    return -1;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return -2;
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
    const db = await getDB();
    const result = await db.collection('Users').find().toArray();
    return result;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return -2;
  }
};

const addUser = async (newUser) => {
  try {
    const db = await getDB();
    const result = await db.collection('Users').insertOne(newUser);
    return result.insertedId;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return -2;
  }
};

const getUser = async (userId) => {
  try {
    const db = await getDB();
    const result = await db.collection('Users').findOne({ _id: new ObjectId(userId) });
    return result;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return -2;
  }
};

const updateUser = async (userId, newUsername, newPassword, newFollowing, newFollowers) => {
  try {
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
    );
    return result;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return -2;
  }
};

const deleteUser = async (userId) => {
  try {
    const db = await getDB();
    const result = await db.collection('Users').deleteOne({ _id: new ObjectId(userId) });
    return result;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return -2;
  }
};

const getPosts = async () => {
  try {
    const db = await getDB();
    const result = await db.collection('Posts').find().toArray();
    return result;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return -2;
  }
};

const getPost = async (postId) => {
  try {
    const db = await getDB();
    const result = await db.collection('Posts').findOne({ _id: new ObjectId(postId) });
    return result;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return -2;
  }
};

const addPostLike = async (postId, userId) => {
  try {
    const db = await getDB();

    const userExists = await checkUserExists(userId);
    if (userExists !== 0) {
      return -2;
    }

    const alreadyLiked = await db.collection('Posts').findOne({
      _id: new ObjectId(postId),
      likes: { $in: [userId] },
    });

    if (alreadyLiked) {
      return -1;
    }

    const result = await db.collection('Posts').updateOne(
      { _id: new ObjectId(postId) },
      { $push: { likes: userId } },
    );
    return result;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return -3;
  }
};

const removePostLike = async (postId, userId) => {
  try {
    const db = await getDB();

    const userExists = await checkUserExists(userId);
    if (userExists !== 0) {
      return -2;
    }

    const alreadyLiked = await db.collection('Posts').findOne({
      _id: new ObjectId(postId),
      likes: { $in: [userId] },
    });

    if (!alreadyLiked) {
      return -1;
    }

    const result = await db.collection('Posts').updateOne(
      { _id: new ObjectId(postId) },
      { $pull: { likes: userId } },
    );
    return result;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return -3;
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
    return result;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return -2;
  }
};

const createPost = async (newPost) => {
  try {
    const db = await getDB();
    const result = await db.collection('Posts').insertOne(newPost);
    return result.insertedId;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return -2;
  }
};

const deletePost = async (postId) => {
  try {
    const db = await getDB();
    const result = await db.collection('Posts').deleteOne({ _id: new ObjectId(postId) });
    return result;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return err;
  }
};

const addComment = async (newComment) => {
  try {
    const db = await getDB();
    const result = await db.collection('Comments').insertOne(newComment);
    return result.insertedId;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return -2;
  }
};

const getComment = async (commentId) => {
  try {
    const db = await getDB();
    const result = await db.collection('Comments').findOne({ _id: new ObjectId(commentId) });
    return result;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return -2;
  }
};

const commentPost = async (postId, commentId) => {
  try {
    const db = await getDB();
    const commentExists = await checkCommentExists(commentId);

    const postExists = await checkPostExists(postId);
    if (postExists !== 0) {
      return -2;
    }

    if (commentExists) {
      return -2;
    }
    const result = await db.collection('Posts').updateOne(
      { _id: new ObjectId(postId) },
      { $push: { comments: commentId } },
    );
    return result;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return err;
  }
};

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
