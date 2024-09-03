import React from 'react';
import './footer.css';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <div>
      <div className="main-content">
        {/* Your main page content here */}
      </div>
      <div className="footer">
        <div className="footer-content">
          <div className="footer-info">
            <p>&copy; 2024 Your Company Name. All rights reserved.</p>
            <p>Address: 123 Your Street, Colombo, Sri Lanka</p>
            <p>Email: contact@yourcompany.com</p>
          </div>
          <div className="footer-links">
            <a href="/about">About Us</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/help">Help Center</a>
          </div>
          <div className="footer-social">
            <a href="https://www.facebook.com/yourcompany" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://twitter.com/yourcompany" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://www.linkedin.com/company/yourcompany" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

