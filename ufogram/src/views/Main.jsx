import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Activity from './Activity';
import getUser from '../api/getUser';

export default function Main() {
  const navigate = useNavigate();

  const location = useLocation();

  const [usernameToSearch, setUsernameToSearch] = useState('');

  const handleMyProfile = () => {
    navigate('/userprofile', {
      state: {
        userId: location.state.userId,
        username: location.state.username,
        self: true,
        sName: location.state.username,
        sId: location.state.userId,
        users: location.state.users,
        followed: true,
      },
    });
  };

  const handleCreateNewPost = () => {
    // console.log('Create New Post Handler Called');
    navigate('/newpost', { state: { userId: location.state.userId, username: location.state.username, users: location.state.users } });
  };

  const handleSearchUserName = (usernameEvent) => {
    setUsernameToSearch(usernameEvent.target.value);
  };

  const handleSearchUser = async () => {
    const userToSearch = location.state.users.find((user) => user.username === usernameToSearch);

    if (userToSearch) {
      const searchResponse = await getUser(userToSearch.id);
      const isFollowed = searchResponse.data.followers.some(
        (follower) => follower.id === location.state.userId,
      );

      const userProfileState = {
        userId: location.state.userId,
        username: location.state.username,
        self: location.state.username === usernameToSearch,
        sName: usernameToSearch,
        sId: userToSearch.id,
        users: location.state.users,
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
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <div style={{
        display: 'flex', justifyContent: 'center', position: 'fixed', width: '100%', background: '#8769b6',
      }}
      >
        <h1>
          UFOgram
          {' '}
          { location.state.username }
        </h1>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <input type="text" name="SearchUser" onChange={handleSearchUserName} />
          <button type="button" title="searchUser" onClick={handleSearchUser}>Search</button>
        </div>
        <div>
          <button type="button" title="My Profile" onClick={handleMyProfile}>My Profile</button>
          <button type="button" title="Create New Post" onClick={handleCreateNewPost}>Create New Post</button>
        </div>
      </div>
      <div style={{
        display: 'flex', width: '100%', justifyContent: 'center', marginTop: '80px',
      }}
      >
        <Activity userId={location.state.userId} selfKind={0} state={useLocation.state} />
      </div>
    </div>
  );
}
