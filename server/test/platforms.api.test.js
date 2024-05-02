import { expect } from 'chai';
import { fetchFromApi } from '../src/models/api.js';
import Genres, { loadPlatforms, cache } from '../src/models/platforms.js';

const fn = {
  calls: 0,
  mock: function (cb) {
    this.calls++;
    return (...args) => cb(...args);
  },
};

describe('IGDB API - platforms endpoint', () => {
  before(() => cache.clear());

  it('should load platforms into the cache from the IGDB API', async () => {
    expect(fn.calls).to.equal(0);
    expect(cache.size).to.equal(0);
    await loadPlatforms(fn.mock(fetchFromApi));
    expect(cache.size).to.equal(211);
    expect(fn.calls).to.equal(1);
  });

  it('should retrieve platforms from the cache using findOne', () => {
    expect(fn.calls).to.equal(1);
    expect(Genres.findOne(49)).to.deep.equal({ id: 49, name: 'Xbox One' });
    expect(Genres.findOne(167)).to.deep.equal({ id: 167, name: 'PlayStation 5' });
    expect(fn.calls).to.equal(1);
  });

  it('should retrieve platforms from the cache using findAll', () => {
    expect(fn.calls).to.equal(1);
    expect(Genres.findAll([49, 167])).to.deep.equal([
      { id: 49, name: 'Xbox One' },
      { id: 167, name: 'PlayStation 5' },
    ]);
    expect(fn.calls).to.equal(1);
  });

  after(() => cache.clear());
});
