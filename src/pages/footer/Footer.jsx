import {useState} from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll"; // Smooth scrolling
import "./Footer.css"; // Ensure styling

import SectionContainer from "../../components/SectionContainer";
import BACKEND_URL from "../../config/backend-config";  

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Subscribed successfully!");
        setEmail("");
      } else {
        setMessage(data.error || data.message || "Subscription failed");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
 // check if user is logged in 
 const token = localStorage.getItem("token");
 const profileLink = token ? "/profile": "/freelancer-register"

  return (
    <footer className="footer">
      <SectionContainer>
        <div className="foot-container">
          {/* Quick Links (Scroll to Sections) */}
          <div className="">
            <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
            <div>
              <ul className="">
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
                  <Link
                    to={profileLink}
                    
                    
                    className="quick-link"
                  >
                    Profile
                  </Link>
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

          </div>

          {/* Categories */}
          <div className="w-full sm:w-1/3 mb-6">
            <h3 className="font-semibold text-lg mb-2">Categories</h3>
            <div className="space-y-2 category-links-container">
                <Link to={'/discovery?category=game development'} className="category-links">
                  Game Development
                </Link>
                <Link to={'/discovery?category=creative design'} className="category-links">
                  Creative Design
                </Link>
                <Link to={'/discovery?category=music & audio'} className="category-links">
                  Music & Audio
                </Link>
                <Link to={'/discovery?category=compliance & legal'} className="category-links">
                  Compliance & Legal
                </Link>
                <Link to={'/discovery?category=content & marketing'} className="category-links">
                  Content & Marketing
                </Link>
                <Link to={'/discovery?category=operations'} className="category-links">
                  Operations
                </Link>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="w-full sm:w-1/3 subscribe-section">
            <h3 className="font-semibold text-lg mb-2">
              Subscribe to our community newsletter
            </h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full p-2 border rounded-md mb-2"
            />
            <button
              onClick={handleSubscribe}
              className="subscribe-button"
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
            
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
      </SectionContainer>

    </footer>
  );
};

export default Footer;
