import appReducer, { loggedIn, setGames, setUser } from '../src/reducers/appSlice';

describe("App Slicer", () => {
  let state;
  beforeEach(() => {
    state = appReducer(undefined, {
      isAuthenticated: false,
      initialGames: [],
      user: ''
    });
  })

  describe('loggedIn', () => {
    it('should determine if a user has permissions', () => {
      const newState = appReducer(state, loggedIn(true));
      expect(newState.isAuthenticated).toEqual(true);
    });

    it('state should not strictly equal the original', () => {
      const newState = appReducer(state, loggedIn(true));
      expect(newState.isAuthenticated).not.toBe(state.isAuthenticated);
    });
  });

  describe('setGames', () => {
    const testGames = [
      {
        id: 7,
        title: 'Game 1',
        platforms: ['PC'],
        genres: ['Shooter'],
        summary:
          'Tripp is tall',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: 8,
        title: 'Game 2',
        platforms: ['PS5'],
        genres: ['Adventure'],
        summary: 'Emmanuel is cool.',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: 9,
        title: 'Game 3',
        platforms: ['PS4'],
        genres: ['Horror'],
        summary: 'Olivia the clown.',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: 10,
        title: 'Game 10',
        platforms: ['XBOX'],
        genres: ['Comedy'],
        summary: 'Abel is funny.',
        image: 'http://images.igdb.com/igdb/image/upload/t_thumb/co1ma0.jpg',
      }
    ]
    it('should set games to actioned array', () => {
      const newState = appReducer(state, setGames(testGames));
      expect(newState.initialGames).toEqual(testGames);
    });

    it('state should not strictly equal the original', () => {
      const newState = appReducer(state, setGames(testGames));
      expect(newState.initialGames).not.toBe(state.initialGames);
    });
  });
  
  describe('setUser', () => {
    it('should set the current user state', () => {
      const newState = appReducer(state, setUser('Amy'));
      expect(newState.user).toEqual('Amy');
    });

    it('state should not strictly equal the original', () => {
      const newState = appReducer(state, setUser('Amy'));
      expect(newState.user).not.toBe(state.user);
    });
  });
});
// loggedIn: (state, action) => {
//   state.isAuthenticated = action.payload;
  
// },
// setGames: (state, action) => {
//   state.initialGames = action.payload;
// },
// setUser: (state, action) => {
//   state.user = action.payload;
// },