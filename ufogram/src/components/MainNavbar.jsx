import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function MainNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, username, users } = location.state || { userId: 'defaultUserId', username: 'Guest', users: [] };

  const handleMyProfile = () => {
    navigate('/userprofile', {
      state: {
        userId,
        username,
        self: true,
        sName: username,
        sId: userId,
        users,
        followed: true,
      },
    });
  };

  const handleCreateNewPost = () => {
    navigate('/newpost', { state: { userId, username, users } });
  };

  return (
    <nav className="bg-space-cadet p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <button
          type="button"
          className="text-lg font-bold"
          style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
          onClick={() => navigate('/main', { state: { userId, username, users } })}
        >
          UFOgram
        </button>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="bg-mountbatten-pink px-3 py-2 rounded-md text-white transform transition-transform duration-300 hover:scale-105"
            onClick={handleMyProfile}
          >
            My Profile
          </button>
          <button
            type="button"
            className="bg-mountbatten-pink px-3 py-2 rounded-md text-white transform transition-transform duration-300 hover:scale-105"
            onClick={handleCreateNewPost}
          >
            Create New Post
          </button>
        </div>
      </div>
    </nav>
  );
}
