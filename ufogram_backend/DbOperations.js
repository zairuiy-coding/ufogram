const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const dbURL = 'mongodb+srv://UFOAdmin:9HTzfKuWB23W6RPW@ufogram.b3wc2qn.mongodb.net/?retryWrites=true&w=majority';

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
    return MongoConnection;
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
      const result = await db.collection('Users').find({}).toArray();
      // print the results
      console.log(`Users: ${JSON.stringify(result)}`);
      return result;
    } catch (err) {
      console.log(`error: ${err.message}`);
    }
  };

  const addUser = async (newUser) => {
    // get the db
    const db = await getDB();
    const result = await db.collection('Users').insertOne(newUser);
    return result.insertedId;
  };

  const getUser = async (userID) => {
    try {
      // get the db
      const db = await getDB();
      const result = await db.collection('Users').findOne({ _id: new ObjectId(userID) });
      // print the result
      console.log(`User: ${JSON.stringify(result)}`);
      return result;
    } catch (err) {
      console.log(`error: ${err.message}`);
    }
  };

  const updateUser = async (userId, newCommentId) => {
    try {
      // get the db
      const db = await getDB();
      const result = await db.collection('Users').updateOne(
        { _id: ObjectId(userId) },
        // add a new comment id
        // { $set: { major: newMajor } },
      );
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
  updateUser,
};