export const idIndex = new Map();
export const nameIndex = new Map();

export const loadGames = async (fetchFunction) => {
  if (idIndex.size && nameIndex.size) return;
  return fetchFunction(
    'games',
    'fields id, name, cover, similar_games, summary, \
    platforms, genres, total_rating_count; \
    sort total_rating_count desc; \
    where total_rating_count > 300; \
    limit 500;',
  )
    .then((data) => {
      data.forEach((game) => {
        idIndex.set(game.id, game);
        nameIndex.set(game.name, game);
      });
    })
    .catch((err) => err);
};

const Games = {};

Games.findOneById = (id) => idIndex.get(id);

Games.findAllById = (ids) => ids.filter((id) => idIndex.has(id)).map((id) => idIndex.get(id));

Games.findOneByName = (name) => nameIndex.get(name);

Games.findAllByName = (names) =>
  names.filter((name) => nameIndex.has(name)).map((name) => nameIndex.get(name));

export default Games;
