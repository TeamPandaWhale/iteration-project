import { expect } from 'chai';
import { fetchFromApi } from '../src/models/api.js';
import Games, { loadGames, idIndex, nameIndex } from '../src/models/games.js';

const fn = {
  calls: 0,
  mock: function (cb) {
    this.calls++;
    return (...args) => cb(...args);
  },
};

const game1 = {
  id: 1020,
  name: 'Grand Theft Auto V',
};

const game2 = {
  id: 472,
  name: 'The Elder Scrolls V: Skyrim',
};

describe('IGDB API - games endpoint', () => {
  before(() => {
    idIndex.clear();
    nameIndex.clear();
  });

  it('should load games into the cache from the IGDB API', async () => {
    expect(fn.calls).to.equal(0);

    expect(idIndex.size).to.equal(0);
    expect(nameIndex.size).to.equal(0);

    await loadGames(fn.mock(fetchFromApi));

    expect(idIndex.size).to.equal(490);
    expect(nameIndex.size).to.equal(483);

    expect(fn.calls).to.equal(1);
  });

  it('should retrieve games by id from the cache', () => {
    expect(fn.calls).to.equal(1);
    const { id, name } = Games.findOneById(game1.id);
    expect(id).to.equal(game1.id);
    expect(name).to.equal(game1.name);
    expect(fn.calls).to.equal(1);
  });

  it('should retrieve games by name from the cache', () => {
    expect(fn.calls).to.equal(1);
    const { id, name } = Games.findOneByName(game2.name);
    expect(id).to.equal(game2.id);
    expect(name).to.equal(game2.name);
    expect(fn.calls).to.equal(1);
  });

  it('should not duplicate game objects in memory', () => {
    expect(Games.findOneById(game1.id)).to.equal(Games.findOneByName(game1.name));
    expect(Games.findOneById(game2.id)).to.equal(Games.findOneByName(game2.name));
  });

  after(() => {
    idIndex.clear();
    nameIndex.clear();
  });
});
