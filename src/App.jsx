import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationPage from './Pages/RegistrationPage';
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import NoPage from './Pages/NoPage';
import LoginPage from './Pages/LoginPage';
import ScoreKeepersPage from './Pages/ScoreKeepersPage';
import TeamPage from './Pages/TeamPage';

function App() {

  return (
    <>
    <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='register' element={<RegistrationPage/>} />
          <Route path='login' element={<LoginPage/>} />
          <Route path='game' element={<ScoreKeepersPage />} />
          <Route path='team' element={<TeamPage/>} />
          <Route path='*' element={<NoPage/>}/>
        </Routes>
    </Router>
    </>
  )
}

export default App
