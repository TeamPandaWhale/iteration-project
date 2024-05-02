import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import '../stylesheets/Login.scss';
import { setError, setPassword, setUsername } from '../reducers/loginSlice';

const LoginPage = ({ setIsAuthenticated, setInitialGames, setUser }) => {
  // State hooks for username and password

  // Transitioned to Redux Toolkit
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

  const navigate = useNavigate();
  // added dispatch hook
  const dispatch = useDispatch();

  // Handler for submitting
  const handleLogin = async (e) => {
    e.preventDefault();
    // [Not Done yet] backend login engagement here

    // setError('');
    dispatch(setError(''));

    try {
      const response = await fetch(`http://localhost:3000/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      }); // check with the backend

      const data = await response.json();

      if (response.ok && data) {
        // setIsAuthenticated(true);
        dispatch(setIsAuthenticated(true));
        // setUser(data);
        dispatch(setUser(data));
        navigate('/home');
      } else {
        // setError('Incorrect username or password');
        dispatch(setError('Incorrect username or password'));
      }
    } catch (err) {
      // setError('Error logging in');
      dispatch(setError('Error logging in'));
    }
  };

  // Handler for user input fetching
  const handleUsernameChange = (e) => {
    // setUsername(e.target.value);
    dispatch(setUsername(e.target.value));
  };

  const handlePasswordChange = (e) => {
    // setPassword(e.target.value);
    dispatch(setPassword(e.target.value));
  };

  const platforms = [
    'PC (Microsoft Windows)',
    'Web browser',
    'Xbox 360',
    'Xbox One',
    'Xbox Series X|S',
    'PlayStation 5',
    'PlayStation 4',
    'Nintendo Switch',
  ];

  const genres = [
    'Shooter',
    'Indie',
    'MOBA',
    'Adventure',
    'RPG',
    'Strategy',
    'Sport',
    'Puzzle',
    'Fighting',
  ];

  const handleSetInitialData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: useSelector((state) => state.login.username),
          platforms: platforms,
          genres: genres,
        }),
      });

      if (!response.ok) {
        console.log('Backend data fetching issue with filter');
      }

      const gamesData = await response.json();
      // Update with the new games data
      // setInitialGames(gamesData);
      dispatch(setInitialGames(gamesData));
    } catch (error) {
      console.error('Error fetching the games:', error);
    }
  };

  return (
    <div className='login'>
      <Header />
      <form
        onSubmit={async (e) => {
          handleLogin(e);
          handleSetInitialData(e);
        }}
      >
        {error && <div className='error-message'>{error}</div>}
        <div className='input-field'>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' value={username} onChange={handleUsernameChange} />
        </div>
        <div className='input-field'>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' value={password} onChange={handlePasswordChange} />
        </div>
        <div className='action-buttons'>
          <button type='submit'>Login</button>
          <Link to='/signup'>Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
