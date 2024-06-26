import React from 'react';
import { Link } from 'react-router-dom';
import homeBanner from '../assets/videos/home_banner.mov';

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-cool-gray overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={homeBanner} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 text-center text-white p-10">
        <h1 className="text-6xl font-bold mb-8">Welcome to UFOgram</h1>
        <p className="text-2xl mb-10">Share Your Photos & Your Life</p>
        <div className="space-x-4 mt-10">
          <Link to="/login" className="p-4 bg-space-cadet text-white text-xl rounded-md shadow-md transform transition-transform duration-300 hover:scale-105 focus:scale-105">Login</Link>
          <Link to="/signup" className="p-4 bg-mountbatten-pink text-white text-xl rounded-md shadow-md transform transition-transform duration-300 hover:scale-105 focus:scale-105">Signup</Link>
        </div>
      </div>
    </div>
  );
}
