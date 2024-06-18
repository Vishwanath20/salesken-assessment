import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LaunchesList from './component/LaunchesList';

function App() {
  return (
    <Router>
    <div className="App">
         <Navbar />
         <div className="container mt-4">
          <Routes>
            <Route exact path="/launch-list" element={<LaunchesList/>} />
           
          </Routes>
        </div>
    </div>
    </Router>
  );
}

export default App;
