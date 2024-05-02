import { expect } from 'chai';
import Games, { loadGames, idIndex, nameIndex } from '../src/models/games.js';

const mockData = [
  { id: 1, name: 'Game1' },
  { id: 2, name: 'Game2' },
];

const mockFetchFromApi = async () => Promise.resolve(mockData);

const fn = {
  calls: 0,
  mock: function (cb) {
    this.calls++;
    return (...args) => cb(...args);
  },
};

describe('Games API', () => {
  before(() => {
    idIndex.clear();
    nameIndex.clear();
  });

  it('should load games into the cache', async () => {
    expect(fn.calls).to.equal(0);
    expect(idIndex.size).to.equal(0);
    expect(nameIndex.size).to.equal(0);
    await loadGames(fn.mock(mockFetchFromApi));
    expect(idIndex.size).to.equal(2);
    expect(nameIndex.size).to.equal(2);
    expect(fn.calls).to.equal(1);
  });

  it('should retrieve games by id', () => {
    expect(fn.calls).to.equal(1);
    expect(Games.findOneById(1)).to.deep.equal({ id: 1, name: 'Game1' });
    expect(Games.findOneById(2)).to.deep.equal({ id: 2, name: 'Game2' });
    expect(fn.calls).to.equal(1);
  });

  it('should retrieve games by name', () => {
    expect(fn.calls).to.equal(1);
    expect(Games.findOneByName('Game1')).to.deep.equal({ id: 1, name: 'Game1' });
    expect(Games.findOneByName('Game2')).to.deep.equal({ id: 2, name: 'Game2' });
    expect(fn.calls).to.equal(1);
  });

  it('should retrieve multiple games by id', () => {
    expect(fn.calls).to.equal(1);
    expect(Games.findAllById([1, 2])).to.deep.equal(mockData);
    expect(fn.calls).to.equal(1);
  });

  it('should retrieve multiple games by name', () => {
    expect(fn.calls).to.equal(1);
    expect(Games.findAllByName(['Game1', 'Game2'])).to.deep.equal(mockData);
    expect(fn.calls).to.equal(1);
  });

  it('should not duplicate game objects', () => {
    expect(Games.findOneById(1)).to.equal(Games.findOneByName('Game1'));
  });

  after(() => {
    idIndex.clear();
    nameIndex.clear();
  });
});
