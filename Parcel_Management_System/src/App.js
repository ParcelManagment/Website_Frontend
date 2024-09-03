import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Home from './Components/Home/Home';
import InsertPage from './Components/InsertPage/InsertPage';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import Footer from './Components/Footer/footer';
import ViewPage from './Components/ViewPage/ViewPage';
import ProfilePage from './Components/ProfilePage/ProfilePage';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import Auth from './Components/Authentication/Auth';

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
  <div className="page-wrapper">
    <NavigationBar />
    <main className="content">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/insert" element={<InsertPage />} />
        <Route path="/view" element={<ViewPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/auth" element={<Auth />} />
        {/* Add other routes here */}
      </Routes>
    </main>
    <Footer />
  </div>
);

export default App;
