import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationPage from './Pages/RegistrationPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import NoPage from './Pages/NoPage';
import LoginPage from './Pages/LoginPage';
import GamePage from './Pages/GamePage';
import TeamPage from './Pages/TeamPage';
import GameScorePage from './Pages/GameScoresPage';
import PrivateRoute from './Auth/PrivateRoute';
import Unauthorized from './Pages/Unauthorized';
import { AuthProvider } from './Auth/AuthContext';
import PlayerProfilePage from './Pages/PlayerProfilePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<RegistrationPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/game' element={<PrivateRoute requiredRole="COACH"><GamePage /></PrivateRoute>} />
          <Route path='/team' element={<PrivateRoute requiredRole="COACH"><TeamPage /></PrivateRoute>} />
          <Route path='/player' element={<PrivateRoute requiredRole="PLAYER"><PlayerProfilePage /></PrivateRoute>} />
          <Route path='/live' element={<GameScorePage />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
