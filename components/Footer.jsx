import React from 'react';
import { github2Icon, linkedinIcon } from '../src/assets/icons';
import '../App.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a
          href="https://github.com/mndanh"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={github2Icon} alt="GitHub" className="social-icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/dan-heer/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
        </a>
      </div>
    </footer>
  );
}
