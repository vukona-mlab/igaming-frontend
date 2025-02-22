import React from "react";
import { Link as ScrollLink } from "react-scroll"; // Smooth scrolling
import "./Footer.css"; // Ensure styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Quick Links (Scroll to Sections) */}
        <div className="w-full sm:w-1/3 mb-6">
          <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <ScrollLink
                to="home"
                smooth={true}
                duration={500}
                className="quick-link"
              >
                Home
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="about"
                smooth={true}
                duration={500}
                className="quick-link"
              >
                About
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="contact"
                smooth={true}
                duration={500}
                className="quick-link"
              >
                Contact
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="profile"
                smooth={true}
                duration={500}
                className="quick-link"
              >
                Profile
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="faq"
                smooth={true}
                duration={500}
                className="quick-link"
              >
                FAQ
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="policy"
                smooth={true}
                duration={500}
                className="quick-link"
              >
                Policy & Terms
              </ScrollLink>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="w-full sm:w-1/3 mb-6">
          <h3 className="font-semibold text-lg mb-2">Categories</h3>
          <ul className="space-y-2">
            <li className="category-item">Game Development</li>
            <li className="category-item">Creative Design</li>
            <li className="category-item">Music & Audio</li>
            <li className="category-item">Compliance & Legal</li>
            <li className="category-item">Content & Marketing</li>
            <li className="category-item">Operations</li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="w-full sm:w-1/3 subscribe-section">
          <h3 className="font-semibold text-lg mb-2">
            Subscribe to our community newsletter
          </h3>
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full p-2 border rounded-md mb-2"
          />
          <button className="subscribe-button">Subscribe</button>
        </div>

        {/* Bottom Section */}

        <div className="footer-logo-container">
          <img
            src="/images/logo-ri-express.png"
            alt="RiExperts Logo"
            className="footer-logo"
          />
        </div>

        <div className="footer-bottom">
          <div className="text-gray-500">
            &copy; iGaming International Ltd. 2025
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
