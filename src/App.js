import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import LaunchesList from './component/LaunchesList';
import { useSelector } from 'react-redux';
import Login from './component/Login';
import Signup from './component/Signup';


function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <Router>
    <div className="App">
         <Navbar />
         <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/launches" element={isAuthenticated ? <LaunchesList /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
