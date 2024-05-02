import { expect } from 'chai';
import Genres, { loadGenres, cache } from '../src/models/genres.js';

const mockData = [
  { id: 1, name: 'Category1' },
  { id: 2, name: 'Category2' },
];

const mockFetchFromApi = async () => Promise.resolve(mockData);

const fn = {
  calls: 0,
  mock: function (cb) {
    this.calls++;
    return (...args) => cb(...args);
  },
};

describe('Genres API', () => {
  before(() => cache.clear());

  it('should load genres into the cache', async () => {
    expect(fn.calls).to.equal(0);
    expect(cache.size).to.equal(0);
    await loadGenres(fn.mock(mockFetchFromApi));
    expect(cache.size).to.equal(2);
    expect(fn.calls).to.equal(1);
  });

  it('should retrieve genres from the cache using findOne', () => {
    expect(fn.calls).to.equal(1);
    expect(Genres.findOne(1)).to.deep.equal({ id: 1, name: 'Category1' });
    expect(Genres.findOne(2)).to.deep.equal({ id: 2, name: 'Category2' });
    expect(fn.calls).to.equal(1);
  });

  it('should retrieve genres from the cache using findAll', () => {
    expect(fn.calls).to.equal(1);
    expect(Genres.findAll([1, 2])).to.deep.equal(mockData);
    expect(fn.calls).to.equal(1);
  });

  after(() => cache.clear());
});
