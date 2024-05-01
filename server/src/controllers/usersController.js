import Users from '../models/usersModel.js';
import ApiGames from '../models/gamesModel.js';
import { validateUserInfo } from '../utils/userValidation.js';
import { badRequestErr, usernameConflictErr, createUserErr } from './errors.js';

import 'dotenv/config';
import bcrypt from 'bcryptjs';

// get data from db and store to user.likedGames
export const likeGame = async (req, res, next) => {
  try {
    // get game data from frontend and store to likedGames
    // req.body should be something like { username: String, gameName: "game name" }
    const gameName = req.body.gameName;
    const username = req.body.userName;
    // find game in apiGames collection
    const game = await ApiGames.findOne({
      name: gameName,
    });
    // check if game has been already liked by user
    const userData = await Users.findOne({ username: username });
    // if it hasn't been liked add to likedGames under that user
    if (!userData.likedGames.find((likedGame) => likedGame.name === game.name)) {
      await Users.updateOne({ username: username }, { $push: { likedGames: game } });
      res.locals.gameLiked = game;
    } else {
      res.locals.gameLiked = 'Game already liked!';
    }
    next();
  } catch (error) {
    console.log(error);
    next({
      message: error,
    });
  }
};

// delete game from likedGames
export const unlikeGame = async (req, res, next) => {
  try {
    const gameName = req.body.gameName;
    const username = req.body.username;
    const game = await ApiGames.findOne({
      name: gameName,
    });
    await Users.updateOne({ username: username }, { $pull: { likedGames: { id: game.id } } });
    const user = await Users.findOne({ username: username });
    res.locals.likedGames = user.likedGames;
    next();
  } catch (error) {
    console.log(error);
    next({
      message: error,
    });
  }
};

// get liked games from user likedGames and send to frontend
export const loadLikes = async (req, res, next) => {
  try {
    const username = req.body.username;
    const userData = await Users.findOne({ username: username });
    const likedGamesList = userData.likedGames;
    res.locals.likedGames = likedGamesList;
    next();
  } catch (error) {
    console.log(error);
    next({
      message: error,
    });
  }
};

// Separate middleware for validating user info
export const validateUser = (req, res, next) => {
  const { username, password } = req.body;
  if (!validateUserInfo(username, password)) {
    return next(badRequestErr);
  }
  next();
};

// Main middleware for creating a user
export const createUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const userData = await Users.findOne({ username: username });
    if (userData) {
      return next(usernameConflictErr);
    }

    const user = await Users.create({ username, password });
    res.locals.user = { username: user.username };
    next();
  } catch (err) {
    console.error(err);
    next(createUserErr);
  }
};

export const verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // some password comaparing logic using bcrypt
    const userData = await Users.findOne({
      username: username,
    });
    if (userData) {
      const match = await bcrypt.compare(password, userData.password);
      if (match) res.locals.user = userData.username;
      next();
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    next({
      message: error,
    });
  }
};
