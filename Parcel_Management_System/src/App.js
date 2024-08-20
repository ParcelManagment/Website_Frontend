import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Home from './Components/Home/Home';
import InsertPage from './Components/InsertPage/InsertPage';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import ViewPage from './Components/ViewPage/ViewPage';
import ProfilePage from './Components/ProfilePage/ProfilePage';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginSignup />} />
      <Route path="/*" element={<MainLayout />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
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
      <Route path="/profile" element={<ProfilePage />} />
      // Add other routes here 
    </Routes>
  </>
);


export default App;

