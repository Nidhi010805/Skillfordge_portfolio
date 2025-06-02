import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#121212] text-white py-6 w-full">
      <div className="flex flex-col items-center space-y-4">
        {/* Navigation Links */}
        <div className="space-x-6">
          <Link
            to="/"
            className="text-[#17a2b8] hover:text-[#00d9ff] transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-[#17a2b8] hover:text-[#00d9ff] transition-colors duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-[#17a2b8] hover:text-[#00d9ff] transition-colors duration-300"
          >
            Contact
          </Link>
          <Link
            to="/profile/:username"
            className="text-[#17a2b8] hover:text-[#00d9ff] transition-colors duration-300"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-xl hover:scale-110 transition-transform duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-xl hover:scale-110 transition-transform duration-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-xl hover:scale-110 transition-transform duration-300"
          >
            <FaTwitter />
          </a>
        </div>
      </div>

      <p className="text-sm mt-6 text-gray-400 text-center">
        © 2025 SkillForge. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
