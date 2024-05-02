import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login.jsx';
import SignupPage from './pages/Signup.jsx';
import MainPage from './pages/Main.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import './stylesheets/styles.scss';

const App = () => {
  // Transitioned to Redux Toolkit
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [initialGames, setInitialGames] = useState([]);
  // const [user, setUser] = useState('');
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/login'
          element={
            // <LoginPage
            //   setIsAuthenticated={setIsAuthenticated}
            //   setInitialGames={setInitialGames}
            //   setUser={setUser}
            // />
            <LoginPage />
          }
        />
        <Route path='/signup' element={<SignupPage />} />
        {/* <Route path="/" element={<MainPage initialGames={initialGames}/>} /> */}
        <Route
          path='/home'
          element={
            // <ProtectedRoute isAuthenticated={isAuthenticated}>
            //   <MainPage initialGames={initialGames} user={user} />
            // </ProtectedRoute>
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route path='/' element={<Navigate replace to='/login' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
