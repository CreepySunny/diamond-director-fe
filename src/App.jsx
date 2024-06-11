import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationPage from './Pages/RegistrationPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import NoPage from './Pages/NoPage';
import LoginPage from './Pages/LoginPage';
import ScoreKeepersPage from './Pages/ScoreKeepersPage';

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='register' element={<RegistrationPage/>} />
        <Route path='games' element={<ScoreKeepersPage/>} />
        <Route path='login' element={<LoginPage/>} />
        <Route path='*' element={<NoPage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
