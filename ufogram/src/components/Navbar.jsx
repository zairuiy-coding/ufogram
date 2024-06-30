import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-space-cadet p-4 text-white w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold font-mono tracking-wide" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
          UFOgram
        </Link>
        <div>
          <Link to="/login" className="mr-4 text-lg font-semibold transition-transform duration-300 hover:scale-105">
            Login
          </Link>
          <Link to="/signup" className="text-lg font-semibold transition-transform duration-300 hover:scale-105">
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}
