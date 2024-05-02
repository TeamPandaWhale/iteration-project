import { expect } from 'chai';
import { fetchFromApi } from '../src/models/api.js';
import Genres, { loadGenres, cache } from '../src/models/genres.js';

const fn = {
  calls: 0,
  mock: function (cb) {
    this.calls++;
    return (...args) => cb(...args);
  },
};

describe('IGDB API - genres endpoint', () => {
  before(() => cache.clear());

  it('should load genres into the cache from the IGDB API', async () => {
    expect(fn.calls).to.equal(0);
    expect(cache.size).to.equal(0);
    await loadGenres(fn.mock(fetchFromApi));
    expect(cache.size).to.equal(23);
    expect(fn.calls).to.equal(1);
  });

  it('should retrieve genres from the cache using findOne', () => {
    expect(fn.calls).to.equal(1);
    expect(Genres.findOne(5)).to.deep.equal({ id: 5, name: 'Shooter' });
    expect(Genres.findOne(15)).to.deep.equal({ id: 15, name: 'Strategy' });
    expect(fn.calls).to.equal(1);
  });

  it('should retrieve genres from the cache using findAll', () => {
    expect(fn.calls).to.equal(1);
    expect(Genres.findAll([5, 15])).to.deep.equal([
      { id: 5, name: 'Shooter' },
      { id: 15, name: 'Strategy' },
    ]);
    expect(fn.calls).to.equal(1);
  });

  after(() => cache.clear());
});
