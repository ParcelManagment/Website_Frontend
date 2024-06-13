import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Home from './Components/Home/Home';
import InsertPage from './Components/InsertPage/InsertPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/insert" element={<InsertPage />} />
      </Routes>
    </Router>
  );
}

export default App;

