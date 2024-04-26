import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationPage from './Pages/RegistrationPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutPage from './Pages/LayoutPage';
import HomePage from './Pages/HomePage';
import NoPage from './Pages/NoPage';

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='register' element={<RegistrationPage/>} />
        <Route path='*' element={<NoPage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
