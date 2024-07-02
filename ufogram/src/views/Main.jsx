/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Activity from './Activity';
import getUser from '../api/getUser';

export default function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, username, users } = location.state || { userId: 'defaultUserId', username: 'Guest', users: [] };

  const [usernameToSearch, setUsernameToSearch] = useState('');

  const handleSearchUserName = (usernameEvent) => {
    setUsernameToSearch(usernameEvent.target.value);
  };

  const handleSearchUser = async () => {
    const userToSearch = users.find((user) => user.username === usernameToSearch);
    if (userToSearch) {
      const searchResponse = await getUser(userToSearch._id);
      const isFollowed = searchResponse.data.user.followers.some(
        (follower) => follower.id === userId,
      );

      const userProfileState = {
        userId,
        username,
        self: username === usernameToSearch,
        sName: usernameToSearch,
        sId: userToSearch._id,
        users,
        followed: isFollowed,
      };

      navigate('/userprofile', {
        state: userProfileState,
      });
    } else {
      // Handle the case where the user is not found
    }
  };

  return (
    <div className="min-h-screen bg-mountbatten-pink flex flex-col justify-start">
      <div className="container mx-auto mt-8 px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 flex flex-col items-start w-full">
          <h2 className="text-2xl font-semibold mb-4 text-space-cadet">Search User</h2>
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Search User"
              className="p-2 border border-gray-300 rounded-md shadow-sm w-full max-w-lg mr-2"
              onChange={handleSearchUserName}
            />
            <button
              type="button"
              className="px-4 py-2 bg-space-cadet text-white rounded-md shadow-sm transform transition-transform duration-300 hover:scale-105"
              onClick={handleSearchUser}
            >
              Search
            </button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
          <h2 className="text-2xl font-semibold mb-4 text-space-cadet">Posts from Your Followings</h2>
          <Activity userId={userId} selfKind={0} state={location.state} />
        </div>
      </div>
    </div>
  );
}
