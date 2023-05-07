import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
const Footer: React.FC = () => {
  return (
    <>
      <footer>
        <div className="footer-container">
          <Link to="/contact">
            <p>Contact Us</p>
          </Link>
          <Link to="/term">
            <p>Term of Use</p>
          </Link>
          <Link to="/policy">
            <p>Privacy Policy</p>
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
