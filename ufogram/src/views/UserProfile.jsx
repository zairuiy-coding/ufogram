import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import getUser from '../api/getUser';
import updateUser from '../api/updateUser';
import Activity from './Activity';

export default function UserProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    userId,
    username,
    users,
    sId,
    sName,
    self,
    followed: initialFollowed,
  } = location.state;

  const [followed, setFollowed] = useState(initialFollowed);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);

  const isMyself = self;
  const selfKind = self ? 1 : 2;

  const handleMain = () => {
    navigate('/main', { state: { userId, username, users } });
  };

  const handleFollow = async () => {
    const selfResponse = await getUser(userId);
    const searchResponse = await getUser(sId);
    const currFollowing = selfResponse.data.user.following.slice();
    const currFollowers = searchResponse.data.user.followers.slice();

    if (followed) {
      const newFollowing = currFollowing.filter((user) => user.id !== sId);
      const newFollowers = currFollowers.filter((user) => user.id !== userId);

      await updateUser(userId, {
        ...selfResponse.data.user,
        following: newFollowing,
      });
      await updateUser(sId, {
        ...searchResponse.data.user,
        followers: newFollowers,
      });

      setFollowed(false);
    } else {
      currFollowing.push({ id: sId, username: sName });
      currFollowers.push({ id: userId, username });

      await updateUser(userId, {
        ...selfResponse.data.user,
        following: currFollowing,
      });
      await updateUser(sId, {
        ...searchResponse.data.user,
        followers: currFollowers,
      });

      setFollowed(true);
    }
  };

  useEffect(() => {
    async function fetchFollowing() {
      try {
        const response = await getUser(sId);
        if (response.status === 200) {
          setFollowing(response.data.user.following.map((user) => ({
            id: user.id,
            username:
              user.username
              || users.find((u) => u.id === user.id)?.username
              || user.id,
          })));
          setFollowers(response.data.user.followers.map((user) => ({
            id: user.id,
            username:
              user.username
              || users.find((u) => u.id === user.id)?.username
              || user.id,
          })));

          // Check if the user is followed
          const isFollowed = response.data.user.followers.some(
            (follower) => follower.id === userId,
          );
          setFollowed(isFollowed);
        }
      } catch (error) {
        console.error('Error fetching following:', error);
      }
    }
    fetchFollowing();
  }, [sId, userId, users]);

  const handleUserClick = (id, name) => {
    navigate('/userprofile', {
      state: {
        userId,
        username,
        users,
        sId: id,
        sName: name,
        self: id === userId,
        followed: following.some((user) => user.id === id),
      },
    });
  };

  return (
    <div className="min-h-screen bg-mountbatten-pink p-4">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-semibold text-space-cadet">Profile</h1>
          <button
            type="button"
            className="px-4 py-2 bg-space-cadet text-white rounded-md shadow-sm transform transition-transform duration-300 hover:scale-105"
            onClick={handleMain}
          >
            Back To Main
          </button>
        </div>
        <div className="flex flex-col items-center mb-4">
          <img
            className="rounded-full w-24 h-24 mb-4"
            src="https://picsum.photos/200/200"
            alt="Profile"
          />
          <h2 className="text-xl font-semibold text-space-cadet mb-2">{sName}</h2>
          <p className="text-gray-600 mb-4">My info</p>
          {!isMyself && (
            <button
              type="button"
              className={`mt-2 px-4 py-2 rounded-md shadow-sm transition-transform duration-300 ${
                followed
                  ? 'bg-mountbatten-pink text-white hover:bg-rose-quartz'
                  : 'bg-space-cadet text-white hover:bg-cadet-gray'
              }`}
              onClick={handleFollow}
            >
              {followed ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
        <div className="flex justify-around w-full mb-4">
          <div
            className="text-center cursor-pointer"
            onClick={() => setShowFollowersModal(true)}
            role="button"
            tabIndex={0}
            onKeyDown={() => setShowFollowersModal(true)}
          >
            <h3 className="text-lg font-semibold text-space-cadet">Followers</h3>
            <p className="text-2xl">{followers.length}</p>
          </div>
          <div
            className="text-center cursor-pointer"
            onClick={() => setShowFollowingModal(true)}
            role="button"
            tabIndex={0}
            onKeyDown={() => setShowFollowingModal(true)}
          >
            <h3 className="text-lg font-semibold text-space-cadet">Following</h3>
            <p className="text-2xl">{following.length}</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-space-cadet mb-4">Posts</h2>
        <Activity userId={userId} selfKind={selfKind} state={location.state} />
      </div>

      {/* Modal for Followers */}
      {showFollowersModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-2xl font-semibold mb-4">Followers</h3>
            <ul className="list-disc pl-4">
              {followers.map((follower) => (
                <li key={follower.id} className="mb-2">
                  <span
                    className="text-space-cadet cursor-pointer underline"
                    onClick={() => handleUserClick(follower.id, follower.username)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={() => handleUserClick(follower.id, follower.username)}
                  >
                    {follower.username}
                  </span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-4 px-4 py-2 bg-space-cadet text-white rounded-md shadow-sm"
              onClick={() => setShowFollowersModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for Following */}
      {showFollowingModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-2xl font-semibold mb-4">Following</h3>
            <ul className="list-disc pl-4">
              {following.map((follow) => (
                <li key={follow.id} className="mb-2">
                  <span
                    className="text-space-cadet cursor-pointer underline"
                    onClick={() => handleUserClick(follow.id, follow.username)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={() => handleUserClick(follow.id, follow.username)}
                  >
                    {follow.username}
                  </span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-4 px-4 py-2 bg-space-cadet text-white rounded-md shadow-sm"
              onClick={() => setShowFollowingModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
