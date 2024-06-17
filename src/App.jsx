import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationPage from './Pages/RegistrationPage';
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import NoPage from './Pages/NoPage';
import LoginPage from './Pages/LoginPage';
import GamePage from './Pages/GamePage';
import TeamPage from './Pages/TeamPage';
import GameScorePage from './Pages/GameScoresPage';

function App() {

  return (
    <>
    <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='register' element={<RegistrationPage/>} />
          <Route path='login' element={<LoginPage/>} />
          <Route path='game' element={<GamePage />} />
          <Route path='team' element={<TeamPage/>} />
          <Route path='live' element={<GameScorePage />} />
          <Route path='*' element={<NoPage/>}/>
        </Routes>
    </Router>
    </>
  )
}

export default App
