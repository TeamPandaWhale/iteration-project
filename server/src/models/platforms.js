export const cache = new Map();

export const loadPlatforms = async (fetchFunction) => {
  if (cache.size) return;
  return fetchFunction('platforms', 'fields name; limit 300;')
    .then((data) => {
      data.forEach(({ id, name }) => {
        cache.set(id, name);
      });
    })
    .catch((err) => err);
};

const Platforms = {};

Platforms.findOne = (id) => ({ id, name: cache.get(id) });

Platforms.findAll = (ids) => ids.map((id) => ({ id, name: cache.get(id) }));

export default Platforms;
