import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import './App.css';
import './Components/Footer/footer.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Home from './Components/Home/Home';
import InsertPage from './Components/InsertPage/InsertPage';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import Footer from './Components/Footer/footer'; // Ensure correct casing for import
import ViewPage from './Components/ViewPage/ViewPage';
import ViewAllPage from './Components/ViewPage/ViewAll';
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

const MainLayout = () => {
  const location = useLocation(); // Get the current location

  return (
    <div className="page-wrapper">
      <NavigationBar />
      <main className="content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/insert" element={<InsertPage />} />
          {/* <Route path="/view" element={<ViewPage />} /> */}
          <Route path="/view/:packageId" element={<ViewPage />} />

          <Route path="/viewAll" element={<ViewAllPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/auth" element={<Auth />} />
          {/* Add other routes here */}
        </Routes>
      </main>
      {/* Render Footer only on the Home page */}
      {location.pathname === '/home' && <Footer />}
    </div>
  );
}

export default App;

