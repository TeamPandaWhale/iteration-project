import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

import AppError from './utils/AppError.js';

import { apiSave, getGames, filterGames } from './controllers/gamesController.js';
import {
  likeGame,
  createUser,
  validateUser,
  verifyUser,
  unlikeGame,
  loadLikes,
} from './controllers/usersController.js';

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;
const app = express();

// Connect to database
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB database'))
  .catch(() => console.log('Error connecting to MongoDB database'));

// Global middlweware
app.use(express.json());

// route for handling post request from frontend to filter games
app.post('/games', getGames, filterGames, (req, res) => {
  // returns array of objects of games
  res.status(200).json(res.locals.filteredGames);
});

// route for handling post request for liked games
app.post('/likegame', likeGame, (req, res) => {
  res.status(200).json(res.locals.gameLiked);
});

app.get('/likegame', loadLikes, (req, res) => {
  // returns object of objects of games
  res.status(200).json(res.locals.likedGames);
});

app.patch('/likegame', unlikeGame, (req, res) => {
  res.status(200).json(res.locals.likedGames);
});

app.post('/createuser', validateUser, createUser, (req, res) => {
  // if res.locals.user has value then user created account
  // if it has no value then username already exists
  res.status(200).json(res.locals.user);
});

app.post('/login', validateUser, verifyUser, (req, res) => {
  // if res.locals.user has value then user logged in
  // if it has no value then user failed to log in
  res.status(200).json(res.locals.user);
});

// catch all error
app.use('*', (req, res) => {
  res.sendStatus(404);
});

// Global error handling middleware
app.use((err, req, res, next) => {
  // Log timestamp
  console.log(`\n${new Date().toLocaleString()}`);

  // Handle operational errors
  if (err instanceof AppError) {
    console.log(`${err.name}: ${err.message}`);
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Handle generic and/or programmer errors
  console.error(err.message);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
