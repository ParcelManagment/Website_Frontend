import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Home from './Components/Home/Home';
import InsertPage from './Components/InsertPage/InsertPage';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import ViewPage from './Components/ViewPage/ViewPage';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginSignup />} />
      <Route path="/*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

const MainLayout = () => (
  <>
    <NavigationBar />
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/insert" element={<InsertPage />} />
      <Route path="/view" element={<ViewPage />} />
      // Add other routes here 
    </Routes>
  </>
);


export default App;

