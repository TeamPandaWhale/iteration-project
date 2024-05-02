import 'dotenv/config';

import Game from '../models/gamesModel.js';

const apiKey = process.env.API_ACCESS_TOKEN;
const clientId = process.env.API_CLIENT_ID;
const baseUrl = 'https://api.igdb.com/v4/';

// function to requery to endpoint to get the name field linked to ids
const fetchIdName = async (id, endpoint) => {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Client-ID': clientId,
      Authorization: `Bearer ${apiKey}`,
    },
    body: `fields *; where id = (${id});`,
  });

  const data = await response.json();
  // if endpoint is covers, return the url and remove the first two slashes
  // else return data.name
  return data.map((item) => {
    if (endpoint === 'covers') {
      return item.url.slice(2);
    } else {
      return item.name;
    }
  });
};

// api request
export const apiSave = async () => {
  /*
  when the INITIAL request is made to API (using postman for now),
  take the data received and store into db apigames collection
  */

  for (const game of req.body) {
    const games = await Game.findOne({ id: game.id });
    if (games) continue;
    // making individual fetch requests calling fetchIdName
    if (!game.cover || !game.similar_games || !game.platforms || !game.genres) continue;

    const cover = await fetchIdName(game.cover, 'covers');

    const similarGames = await fetchIdName(game.similar_games, 'games');

    const platforms = await fetchIdName(game.platforms, 'platforms');

    const genres = await fetchIdName(game.genres, 'genres');

    const gameData = {
      id: game.id,
      name: game.name,
      cover: cover[0],
      similar_games: similarGames,
      summary: game.summary,
      platforms: platforms,
      genres: genres,
    };

    if (!games) {
      await Game.create(gameData);
    }
  }
};
