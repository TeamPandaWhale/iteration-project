import 'dotenv/config';

import Game from '../models/gamesModel.js';
import User from '../models/usersModel.js';

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// get data from db and send to frontend
export const getGames = asyncHandler(async (req, res, next) => {
  // find games from db depending on filters sent from frontend
  // req.body should be something like { platforms: [platform1, platform2], genres: [genre1, genre2] }
  const { platforms, genres } = req.body;
  res.locals.games = await Game.find({
    platforms: { $in: platforms },
    genres: { $in: genres },
  });
  next();
});

export const filterGames = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });

  const excludedGames = user.likedGames;
  const excludedNames = excludedGames.map((game) => game.name);

  const filteredGames = res.locals.games.filter((game) => !excludedNames.includes(game.name));
  res.locals.filteredGames = filteredGames;
  console.log('filtered', Array.isArray(res.locals.filteredGames));

  next();
});
