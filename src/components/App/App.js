
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from '../../Pages/StartPage';
import MainPage from '../../Pages/MainPage';


function App() {

  return (
    <Router>
      <div className="container">
        <h1>Крестики-нолики</h1>
        <Routes>
          <Route path='/' element={<StartPage />} />
          <Route path='/mainPage' element={<MainPage />} />
          <Route path='/:roomName' element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
