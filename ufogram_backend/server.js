// Import express
const express = require('express');

// enable cross-origin resource sharing (cors)
const cors = require('cors');

// Create express app
const webapp = express();

webapp.use(cors());

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
  console.log('READ all users');
  try {
    const results = await lib.getUsers();
    res.status(200).json({ users: results });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.get('/Users/:id', async (req, res) => {
  console.log('READ a user by id');
  try {
    if (req.params.id === undefined) {
      res.status(404).json({ error: 'id is missing' });
      return;
    }
    const result = await lib.getUser(req.params.id);
    if (result === undefined) {
      res.status(404).json({ error: 'bad user id' });
      return;
    }
    res.status(200).json({ user: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.post('/Users/', async (req, res) => {
  console.log('CREATE a user');
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
    console.log(`id: ${JSON.stringify(result)}`);
    // add id to new user and return it
    res.status(201).json({
      user: { id: result, ...newUser },
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.put('/Posts/like/:postId/:userId', async (req, res) => {
  console.log('Like a post');
  try {
    if (req.params.postId === undefined) {
      res.status(404).json({ error: 'post ID is missing' });
      return;
    }
    if (req.params.userId === undefined) {
      res.status(404).json({ error: 'user ID is missing' });
      return;
    }
    const result = await lib.addPostLike(req.params.postId, req.params.userId);
    if (result === undefined) {
      res.status(404).json({ error: 'bad post ID' });
      return;
    }
    if (result === -2) {
      res.status(404).json({ error: 'bad user ID' });
      return;
    }
    if (result === -1) {
      res.status(400).json({ error: 'user already liked' });
      return;
    }
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.put('/Posts/unlike/:postId/:userId', async (req, res) => {
  console.log('Unlike a post');
  try {
    if (req.params.postId === undefined) {
      res.status(404).json({ error: 'post ID is missing' });
      return;
    }
    if (req.params.userId === undefined) {
      res.status(404).json({ error: 'user ID is missing' });
      return;
    }
    const result = await lib.addPostLike(req.params.postId, req.params.userId);
    if (result === undefined) {
      res.status(404).json({ error: 'bad post ID' });
      return;
    }
    if (result === -2) {
      res.status(404).json({ error: 'bad user ID' });
      return;
    }
    if (result === -1) {
      res.status(400).json({ error: 'user haven\'t liked' });
      return;
    }
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// webapp.get('/Posts/like/:postId/:userId', async (req, res) => {
//   console.log('Like a post');
//   try {
//     if (req.params.postId === undefined) {
//       res.status(404).json({ error: 'post ID is missing' });
//       return;
//     }
//     if (req.params.userId === undefined) {
//       res.status(404).json({ error: 'user ID is missing' });
//       return;
//     }
//     const result = await lib.addPostLike(req.params.postId, req.params.userId);
//     if (result === undefined) {
//       res.status(404).json({ error: 'bad post ID' });
//       return;
//     }
//     if (result === -2) {
//       res.status(404).json({ error: 'bad user ID' });
//       return;
//     }
//     if (result === -1) {
//       res.status(400).json({ error: 'user already liked' });
//       return;
//     }
//     res.status(200).json({ data: result });
//   } catch (err) {
//     res.status(404).json({ error: err.message });
//   }
// });

webapp.put('/Posts/:postId', async (req, res) => {
  console.log('Edit a post');
  try {
    if (req.params.postId === undefined) {
      res.status(404).json({ error: 'post ID is missing' });
      return;
    }
    if (!req.body.caption || !req.body.fileURL || !req.body.author) {
      res.status(404).json({ error: 'missing post info' });
      return;
    }

    const result = await lib.updatePost(req.params.postId, req.body.caption, req.body.fileURL, req.body.author);
    if (result === undefined) {
      res.status(404).json({ error: 'bad post ID' });
      return;
    }
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.delete('/Posts/:postId', async (req, res) => {
  console.log('Delete a post');
  try {
    if (req.params.postId === undefined) {
      res.status(404).json({ error: 'post ID is missing' });
      return;
    }

    const result = await lib.deletePost(req.params.postId);
    if (result === undefined) {
      res.status(404).json({ error: 'bad post ID' });
      return;
    }
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.get('/Comments/:id', async (req, res) => {
  console.log('READ a comment by id');
  try {
    if (req.params.id === undefined) {
      res.status(404).json({ error: 'id is missing' });
      return;
    }
    const result = await lib.getComment(req.params.id);
    if (result === undefined) {
      res.status(404).json({ error: 'bad comment id' });
      return;
    }
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.post('/Comments/:postId', async (req, res) => {
  console.log('CREATE a comment');
  if (req.params.postId === undefined) {
    res.status(404).json({ error: 'post ID is missing' });
    return;
  }
  if (!req.body.text || !req.body.author) {
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
    console.log(`id: ${JSON.stringify(result)}`);
    const result2 = await lib.commentPost(req.params.postId, result);
    if (result2 === -2) {
      res.status(404).json({ error: 'comment not found' });
    }
    if (result2 === undefined) {
      res.status(404).json({ error: 'post not found' });
    }
    res.status(201).json({
      comment: { id: result, ...newComment },
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// webapp.delete('/player/:player', async (req, res) => {
//   if (req.params.player === undefined) {
//     res.status(404).json({ error: 'name is missing' });
//     return;
//   }
//   console.log('DELETE a player');
//   try {
//     const result = await lib.deletePlayer(db, req.params.player);
//     console.log(`result-->${result}`);
//     if (Number(result) === 0) {
//       res.status(404).json({ error: 'player not in the system' });
//       return;
//     }
//     res.status(200).json({ message: `Deleted ${result} player(s) with name ${req.params.player}` });
//   } catch (err) {
//     res.status(404).json({ error: err.message });
//   }
// });

// Default response for any other request
webapp.use((_req, res) => {
  res.status(404);
});

module.exports = webapp; // for testing
