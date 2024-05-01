import Users from '../models/usersModel.js';
import Games from '../models/gamesModel.js';
import { validateUserInfo } from '../utils/userValidation.js';
import AppError from '../utils/AppError.js';

import 'dotenv/config';
import bcrypt from 'bcryptjs';

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// get data from db and store to user.likedGames
export const likeGame = asyncHandler(async (req, res, next) => {
  const { username, gameName } = req.body;
  if (!username || !gameName) return next(new AppError('Invalid request', 400));

  const game = await Games.findOne({ name: gameName });
  if (!game) return next(new AppError('Game not found', 400));

  const user = await Users.findOne({ username });
  if (!user) return next(new AppError('User not found', 400));

  if (!user.likedGames.find((g) => g.name === game.name)) {
    const update = await Users.updateOne({ username }, { $push: { likedGames: game } });
    if (!update) return next(new AppError('Could not like game', 400));

    res.locals.gameLiked = game;
    return next();
  }

  return next(new AppError('Game already liked', 400));
});

// Delete game from likedGames array
export const unlikeGame = asyncHandler(async (req, res, next) => {
  const { username, gameName } = req.body;
  if (!username || !gameName) return next(new AppError('Invalid request', 400));

  const user = await Users.findOne({ username });
  if (!user) return next(new AppError('User not found', 400));

  const update = await Users.updateOne({ username }, { $pull: { likedGames: { name: gameName } } });
  if (!update) return next(new AppError('Error deleting game', 400));

  res.locals.likedGames = user.likedGames;
  next();
});

// Get user's liked games array and send to frontend
export const loadLikes = asyncHandler(async (req, res, next) => {
  const { username } = req.body;
  const userData = await Users.findOne({ username });
  if (!userData) return next(new AppError('Error retrieving data', 400));

  res.locals.likedGames = userData.likedGames;
  next();
});

// Separate middleware for validating user info
export const validateUser = (req, res, next) => {
  const { username, password } = req.body;
  if (!validateUserInfo(username, password)) {
    return next(new AppError('Invalid username and/or password', 400));
  }
  next();
};

// Main middleware for creating a user
export const createUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  const userData = await Users.findOne({ username: username });
  if (userData) {
    return next(new AppError('Username conflict', 409));
  }

  const user = await Users.create({ username, password });
  res.locals.user = { username: user.username };
  next();
});

export const verifyUser = asyncHandler(async (req, res, next) => {
  const loginError = new AppError('Incorrect username and/or password', 400);
  const { username, password } = req.body;

  const userData = await Users.findOne({ username });
  if (!userData) return next(loginError);

  const match = await bcrypt.compare(password, userData.password);
  if (!match) return next(loginError);

  res.locals.user = { username: userData.username };

  next();
});
