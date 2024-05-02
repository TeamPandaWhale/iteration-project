export const cache = new Map();

export const loadGenres = async (fetchFunction) => {
  if (cache.size) return;
  return fetchFunction('genres', 'fields name; limit 50;')
    .then((data) => {
      data.forEach(({ id, name }) => {
        cache.set(id, name);
      });
    })
    .catch((err) => err);
};

const Genres = {};

Genres.findOne = (id) => ({ id, name: cache.get(id) });

Genres.findAll = (ids) => ids.map((id) => ({ id, name: cache.get(id) }));

export default Genres;
