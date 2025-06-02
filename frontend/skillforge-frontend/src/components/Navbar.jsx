// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-bold text-gray-800">SkillForge</div>

        <div className="hidden md:flex gap-6">
          <Link to="/" className="text-gray-700 hover:text-white hover:bg-blue-600 px-4 py-2 rounded transition">Home</Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-white hover:bg-blue-600 px-4 py-2 rounded transition">Dashboard</Link>
          <Link to="/login" className="text-gray-700 hover:text-white hover:bg-blue-600 px-4 py-2 rounded transition">Login</Link>
          <Link to="/signup" className="text-gray-700 hover:text-white hover:bg-blue-600 px-4 py-2 rounded transition">Signup</Link>
        </div>

        <div
          className="md:hidden text-3xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-white/95 shadow-md px-4 py-4 space-y-3">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-white hover:bg-blue-600 w-full text-center py-2 rounded">Home</Link>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-white hover:bg-blue-600 w-full text-center py-2 rounded">Dashboard</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-white hover:bg-blue-600 w-full text-center py-2 rounded">Login</Link>
          <Link to="/signup" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-white hover:bg-blue-600 w-full text-center py-2 rounded">Signup</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
