import React from 'react';
import './footer.css';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <div className="footer-wrapper">
      <footer className="footer bg-dark text-white">
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
              <p>&copy; 2024 Your Company Name. All rights reserved.</p>
            </div>

            <div className="col-md-4 text-center mb-3 mb-md-0">
              <h4>Contact Us</h4>
              <p>Email: contact@yourcompany.com</p>
              <p>Address: 123 Your Street, Colombo, Sri Lanka</p>
              <p>Phone: +94 123 456 789</p>
            </div>
            
            <div className="col-md-4 text-center text-md-end">
              <div className="footer-social">
                <a href="https://www.facebook.com/yourcompany" aria-label="Facebook" className="text-white mx-2"><FaFacebook /></a>
                <a href="https://twitter.com/yourcompany" aria-label="Twitter" className="text-white mx-2"><FaTwitter /></a>
                <a href="https://www.linkedin.com/company/yourcompany" aria-label="LinkedIn" className="text-white mx-2"><FaLinkedin /></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

