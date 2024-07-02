// Import express
const express = require('express');
const bodyParser = require('body-parser');

// enable cross-origin resource sharing (cors)
const cors = require('cors');

// import fs
const fs = require('fs');

// import formidable
const formidable = require('formidable');

// import S3 operations
const s3 = require('./s3Operations');

// Create express app
const webapp = express();

webapp.use(cors());
webapp.use(bodyParser.json());

// Import database operations
const lib = require('./DbOperations');

// Server port
// const port = 8080;

// webapp.use(express.urlencoded({
//   extended: true,
// }));

// let db;

// Start server and connect to the DB
// webapp.listen(port, async () => {
//   db = await lib.connect();
//   console.log(`Server running on port:${port}`);
// });

// Root endpoint
webapp.get('/', (_req, res) => {
  res.json({ message: 'Welcome to UDFOgram' });
});

// Other API endpoints
webapp.get('/Users', async (_req, res) => {
  // console.log('READ all users');
  try {
    const results = await lib.getUsers();
    if (results !== -2) {
      res.status(200).json({ users: results });
    } else {
      res.status(404).json({ error: 'DB error' });
    }
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.get('/Users/:id', async (req, res) => {
  // console.log('READ a user by id');
  // console.log('User id: ', req.params.id);
  try {
    if (req.params.id === undefined || req.params.id === ' ') {
      res.status(404).json({ error: 'id is missing' });
      return;
    }
    // console.log('User id: ', req.params.id);
    const result = await lib.getUser(req.params.id);
    if (result === undefined || result === -2) {
      res.status(404).json({ error: 'bad user id' });
      return;
    }
    res.status(200).json({ user: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.post('/Users/', async (req, res) => {
  // console.log('CREATE a user');
  // console.log(req.body);
  if (!req.body.username || !req.body.password) {
    res.status(404).json({ error: 'missing user info' });
    return;
  }
  // create new user object
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    following: [],
    followers: [],
  };
  try {
    const result = await lib.addUser(newUser);
    // console.log(`id: ${JSON.stringify(result)}`);
    // add id to new user and return it
    if (result !== -2) {
      res.status(201).json({
        user: { id: result, ...newUser },
      });
    } else {
      res.status(404).json({ error: 'DB error' });
    }
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.put('/Users/:userId', async (req, res) => {
  // console.log('UPDATE a user');
  try {
    if (req.params.userId === undefined || req.params.userId === ' ') {
      res.status(404).json({ error: 'user ID is missing' });
      return;
    }
    if (!req.body.username || !req.body.password || !req.body.following || !req.body.followers) {
      res.status(404).json({ error: 'missing user info' });
      return;
    }

    const result = await lib.updateUser(
      req.params.userId,
      req.body.username,
      req.body.password,
      req.body.following,
      req.body.followers,
    );
    if (result === undefined || result === -2) {
      res.status(404).json({ error: 'bad user ID' });
      return;
    }
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.delete('/Users/:userId', async (req, res) => {
  // console.log('Delete a user');
  try {
    if (req.params.userId === undefined || req.params.userId === ' ') {
      res.status(404).json({ error: 'user ID is missing' });
      return;
    }

    const result = await lib.deleteUser(req.params.userId);
    if (result === undefined || result === -2) {
      res.status(404).json({ error: 'bad post ID' });
      // console.log('result === undefined');
      return;
    }
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'no user deleted' });
    } else {
      res.status(200).json({ data: result });
      // console.log('result: ', result);
    }
  } catch (err) {
    res.status(404).json({ error: err.message });
    // console.log('err: ', err);
  }
});

webapp.get('/Posts', async (_req, res) => {
  // console.log('READ all posts');
  try {
    const results = await lib.getPosts();
    // console.log(results);
    if (results !== -2) {
      res.status(200).json({ posts: results });
    } else {
      res.status(404).json({ error: 'DB error' });
    }
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.get('/Posts/:id', async (req, res) => {
  // console.log('READ a post by id');
  // console.log('Post id: ', req.params.id);
  try {
    if (req.params.id === undefined || req.params.id === ' ') {
      res.status(404).json({ error: 'id is missing' });
      return;
    }
    // console.log('Post id: ', req.params.id);
    const result = await lib.getPost(req.params.id);
    if (result === undefined || result === -2) {
      res.status(404).json({ error: 'bad post id' });
      return;
    }
    res.status(200).json({ post: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});
app.post('/File', async (req, res) => {
  console.log('Received request to /File'); // Debug log

  try {
    const form = new formidable.IncomingForm(); // Use new formidable.IncomingForm()
    // console.log('Formidable form created'); // Debug log

    form.parse(req, (err, fields, files) => {
      if (err) {
        // console.error('Formidable parsing error:', err); // Debug log
        res.status(404).json({ error: err.message });
        return;
      }

    //   console.log('Files received:', files); // Debug log

      // Create a buffer to cache the uploaded file
      let cacheBuffer = Buffer.alloc(0);

      // Create a stream from the virtual path of the uploaded file
      const fStream = fs.createReadStream(files.File_0.path);

      fStream.on('data', (chunk) => {
        // Fill the buffer with data from the uploaded file
        cacheBuffer = Buffer.concat([cacheBuffer, chunk]);
      });

      fStream.on('end', async () => {
        // console.log('File read complete, uploading to S3'); // Debug log
        try {
          // Send buffer to AWS - The URL of the object is returned
          const s3URL = await s3.uploadFile(cacheBuffer, files.File_0.name);
        //   console.log('File uploaded to S3:', s3URL); // Debug log
          // Send a response to the client
          res.status(201).json({ URL: s3URL });
        } catch (uploadError) {
        //   console.error('Error uploading file to S3:', uploadError); // Debug log
          res.status(500).json({ error: uploadError.message });
        }
      });

      fStream.on('error', (streamError) => {
        // console.error('Error reading file stream:', streamError); // Debug log
        res.status(500).json({ error: streamError.message });
      });
    });
  } catch (e) {
    // console.error('Error in /File route:', e); // Debug log
    res.status(404).json({ error: e.message });
  }
});

webapp.post('/Posts', async (req, res) => {
  // console.log('Create a post');
  // console.log('Req.body: ', req.body);
  if (!req.body.caption || !req.body.author || !req.body.fileURL) {
    res.status(404).json({ error: 'missing post info' });
    return;
  }

  try {
    // You can store the URL in mongoDB along with the rest of the data
    // create new post object
    const newPost = {
      caption: req.body.caption,
      fileURL: req.body.fileURL,
      likes: [],
      author: req.body.author,
      comments: [],
    };

    const result = await lib.createPost(newPost);
    // console.log(`post id: ${JSON.stringify(result)}`);
    // add id to new post and return it
    if (result !== -2) {
      res.status(201).json({
        post: { id: result, ...newPost },
      });
    } else {
      res.status(404).json({ error: 'DB error' });
    }
  } catch (dbErr) {
    res.status(404).json({ error: dbErr.message });
  }
});

webapp.put('/Posts/like/:postId/:userId', async (req, res) => {
  // console.log('Like a post');
  try {
    if (req.params.postId === undefined || req.params.postId === ' ') {
      res.status(404).json({ error: 'post ID is missing' });
      return;
    }
    if (req.params.userId === undefined || req.params.userId === ' ') {
      res.status(404).json({ error: 'user ID is missing' });
      return;
    }
    const result = await lib.addPostLike(req.params.postId, req.params.userId);
    if (result === undefined) {
      res.status(404).json({ error: 'bad post ID' });
      // console.log('result: ', result);
      return;
    }
    if (result === -2 || result === -3) {
      res.status(404).json({ error: 'user/post does not exist' });
      // console.log('result: ', result);
      return;
    }
    if (result === -1) {
      res.status(400).json({ error: 'user already liked' });
      // console.log('result: ', result);
      return;
    }
    res.status(200).json({ data: result });
    // console.log('result: ', result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.put('/Posts/unlike/:postId/:userId', async (req, res) => {
  // console.log('Unlike a post');
  try {
    if (req.params.postId === undefined || req.params.postId === ' ') {
      res.status(404).json({ error: 'post ID is missing' });
      return;
    }
    if (req.params.userId === undefined || req.params.userId === ' ') {
      res.status(404).json({ error: 'user ID is missing' });
      return;
    }
    const result = await lib.removePostLike(req.params.postId, req.params.userId);
    if (result === undefined) {
      res.status(404).json({ error: 'bad post ID' });
      return;
    }
    if (result === -2 || result === -3) {
      res.status(404).json({ error: 'user does not exist' });
      return;
    }
    if (result === -1) {
      res.status(400).json({ error: 'user haven\'t liked' });
      return;
    }
    res.status(200).json({ data: result });
  } catch (err) {
    // console.log('err: ', err);
    res.status(404).json({ error: err.message });
  }
});

webapp.put('/Posts/same/:postId', async (req, res) => {
  // console.log('Edit a post without changing the file');
  try {
    if (req.params.postId === undefined || req.params.postId === ' ') {
      res.status(404).json({ error: 'post ID is missing' });
      return;
    }
    if (!req.body.caption || !req.body.file || !req.body.author) {
      res.status(404).json({ error: 'missing post info' });
      return;
    }

    const result = await lib.updatePost(
      req.params.postId,
      req.body.caption,
      req.body.file,
      req.body.author,
    );
    if (result === undefined || result === -2) {
      res.status(404).json({ error: 'bad post ID' });
      return;
    }
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.put('/Posts/new/:postId', async (req, res) => {
  // console.log('Edit a post with a new file');
  try {
    if (req.params.postId === undefined) {
      res.status(404).json({ error: 'post ID is missing' });
      return;
    }
    if (!req.body.caption || !req.body.fileURL || !req.body.author || !req.body.fileName) {
      res.status(404).json({ error: 'missing post info' });
      return;
    }

    // delete old file on s3
    const deleteRes = s3.deleteFile(req.body.fileName);
    if (deleteRes === false) {
      res.status(404).json({ error: 'Delete s3 failure' });
    }

    const result = await lib.updatePost(
      req.params.postId,
      req.body.caption,
      req.body.fileURL,
      req.body.author,
    );
    if (result === undefined) {
      res.status(404).json({ error: 'bad post ID' });
      return;
    }
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.delete('/Posts/:postId/:name', async (req, res) => {
  // console.log('Delete a post');
  try {
    if (req.params.postId === undefined) {
      // console.log('postID undefined');
      res.status(404).json({ error: 'post ID is missing' });
      return;
    }

    if (!req.params.name) {
      // console.log('filename not found');
      res.status(404).json({ error: 'missing file name' });
      return;
    }

    // delete old file on s3
    const deleteRes = s3.deleteFile(req.params.name);
    if (deleteRes === false) {
      res.status(404).json({ error: 'Delete s3 failure' });
    }

    const result = await lib.deletePost(req.params.postId);
    if (result === undefined) {
      res.status(404).json({ error: 'bad post ID' });
      return;
    }
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'no post deleted' });
    } else {
      res.status(200).json({ data: result });
    }
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.get('/Comments/:id', async (req, res) => {
  // console.log('READ a comment by id');
  try {
    if (req.params.id === undefined || req.params.id === ' ') {
      res.status(404).json({ error: 'id is missing' });
      return;
    }
    const result = await lib.getComment(req.params.id);
    if (result === undefined || result === -2) {
      res.status(404).json({ error: 'bad comment id' });
      return;
    }
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.get('/Comments/post/:id', async (req, res) => {
  // console.log('Get all comments of a post');
  try {
    if (req.params.id === undefined || req.params.id === ' ') {
      res.status(404).json({ error: 'id is missing' });
      return;
    }
    const post = await lib.getPost(req.params.id);
    if (post === undefined || post === -2) {
      res.status(404).json({ error: 'bad post id' });
      return;
    }
    const result = await Promise.all(
      post.comments.map(async (commentId) => {
        const comment = await lib.getComment(commentId);
        return comment;
      }),
    );
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.post('/Comments/:postId', async (req, res) => {
  // console.log('CREATE a comment');
  if (req.params.postId === undefined || req.params.postId === ' ') {
    res.status(404).json({ error: 'post ID is missing' });
    return;
  }
  if (!req.body.text || !req.body.author || !req.body.author.id || !req.body.author.username) {
    res.status(404).json({ error: 'missing user info' });
    return;
  }
  // create new comment object
  const newComment = {
    text: req.body.text,
    author: req.body.author,
  };
  try {
    const result = await lib.addComment(newComment);
    // console.log(`comment id: ${JSON.stringify(result)}`);
    if (result === undefined || result === -2) {
      res.status(404).json({ error: 'comment not created' });
      return;
    }
    const result2 = await lib.commentPost(req.params.postId, result);
    if (result2 === -2) {
      res.status(404).json({ error: 'comment not found' });
      return;
    }
    if (result2 === undefined) {
      res.status(404).json({ error: 'post not found' });
      return;
    }
    res.status(201).json({
      comment: { id: result, ...newComment },
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Default response for any other request
webapp.use((_req, res) => {
  res.status(404);
});

module.exports = webapp; // for testing
