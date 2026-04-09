import React from "react";
import "@css/styles.css";

function Footer() {
  return (
    <footer className="footer-nav lightGlass text-black">
      <div className="footer_upper">
        <div className="footer-main">
          <div className="footer-section">
            {/* <h1>Chris Norton Jr.</h1> */}
            <h2>Systems Engineer</h2>
            <p>
              Build systems that scale. <br />
              Results with precision.
            </p>
            <div className="social-icons"></div>
          </div>
        </div>
        <div className="footer-links">
          <div className="footer-section">
            <h4 className="footer-title">Navigation</h4>
            <a className="footer-link" href="/">
              Home
            </a>
            <a className="footer-link" href="#about">
              About
            </a>
            <a className="footer-link" href="#projects">
              Projects
            </a>
            <a className="footer-link" href="#insights">
              Insights
            </a>
            <a className="footer-link" href="#contact">
              Contact
            </a>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Resources</h4>
            <a className="footer-link" href="#projects">
              Newsletter
            </a>
            <a className="footer-link" href="#contact">
              Tools
            </a>
            <a className="footer-link" href="#insights">
              Resources
            </a>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Technologies</h4>
            <ul className="tech-list">
              <li>Python</li>
              <li>N8N</li>
              <li>JavaScript</li>
              <li>Docker</li>
              <li>AWS</li>
              <li>Azure</li>
              <li>Kubernetes</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer_lower">
        <p>© 2026 Chris Norton Jr. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
