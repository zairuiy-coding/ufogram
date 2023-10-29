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
const port = 8080;

webapp.use(express.urlencoded({
  extended: true,
}));

let db;

// Start server and connect to the DB
webapp.listen(port, async () => {
  db = await lib.connect();
  console.log(`Server running on port:${port}`);
});

// Root endpoint
webapp.get('/', (_req, res) => {
  res.json({ message: 'Welcome to our web app' });
});

// Other API endpoints
webapp.get('/Users', async (_req, res) => {
  console.log('READ all users');
  try {
    const results = await lib.getUsers(db);
    res.status(200).json({ data: results });
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
    const result = await lib.getUser(db, req.params.id);
    if (result === undefined) {
      res.status(404).json({ error: 'bad user id' });
      return;
    }
    res.status(200).json({ data: result });
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
  // create new player object
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    following: [],
    followers: [],
  };
  try {
    const result = await lib.addUser(db, newUser);
    console.log(`id: ${JSON.stringify(result)}`);
    // add id to new player and return it
    res.status(201).json({
      student: { id: result, ...newUser },
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.get('/Posts/likes/:id/:newNum', async (req, res) => {
    console.log('Update a post\'s number of likes');
    try {
      if (req.params.id === undefined) {
        res.status(404).json({ error: 'id is missing' });
        return;
      }
      if (req.params.newNum === undefined) {
        res.status(404).json({ error: 'newNum is missing' });
        return;
      }
      const result = await lib.updatePostLikes(db, req.params.id, req.params.newNum);
      if (result === undefined) {
        res.status(404).json({ error: 'bad post id' });
        return;
      }
      res.status(200).json({ data: result });
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