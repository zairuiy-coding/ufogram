import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import getUser from '../api/getUser';
import updateUser from '../api/updateUser';

export default function UserProfile() {
  const navigate = useNavigate();

  const location = useLocation();

  // const [followed, setFollowed] = useState(location.state.followed);
  let { followed } = location.state;

  const isMyself = location.state.self;

  const handleMain = () => {
    navigate('/main', { state: { userId: location.state.userId, username: location.state.username, users: location.state.users } });
  };

  const handleFollow = async (followEvent) => {
    // console.log(`Followed at the start: ${followed}`);
    const selfResponse = await getUser(location.state.userId);
    const searchResponse = await getUser(location.state.sId);
    const currFollowing = selfResponse.data.following.slice();
    const currFollowers = searchResponse.data.followers.slice();
    const copy = followEvent;
    if (followed) {
      const newFollowing = currFollowing.filter((user) => user.id !== location.state.sId);
      const newFollowers = currFollowers.filter((user) => user.id !== location.state.userId);
      // console.log('newFollowing: \n', newFollowing);
      // console.log('newFollowers: \n', newFollowers);
      await updateUser(location.state.userId, {
        username: selfResponse.data.username,
        password: selfResponse.data.password,
        following: newFollowing,
        followers: selfResponse.data.followers,
      });
      await updateUser(location.state.sId, {
        username: searchResponse.data.username,
        password: searchResponse.data.password,
        following: searchResponse.data.following,
        followers: newFollowers,
      });
      copy.target.innerHTML = 'Follow';
      // setFollowed(false);
      followed = false;
      // console.log(`Shoudl be false: ${followed}`);
    } else {
      const newFollowing = currFollowing.slice();
      const newFollowers = currFollowers.slice();
      newFollowing.push({
        id: location.state.sId,
        username: searchResponse.data.username,
      });
      newFollowers.push({
        id: location.state.userId,
        username: selfResponse.data.username,
      });
      // console.log('newFollowing: \n', newFollowing);
      // console.log('newFollowers: \n', newFollowers);
      await updateUser(location.state.userId, {
        username: selfResponse.data.username,
        password: selfResponse.data.password,
        following: newFollowing,
        followers: selfResponse.data.followers,
      });
      await updateUser(location.state.sId, {
        username: searchResponse.data.username,
        password: searchResponse.data.password,
        following: searchResponse.data.following,
        followers: newFollowers,
      });

      copy.target.innerHTML = 'Unfollow';
      // console.log('Inner HTML: ', followEvent.target.innerHTML);
      // setFollowed(true);
      followed = true;
      // console.log(`Shoudl be true: ${followed}`);
    }
  };

  const GetFollowing = () => {
    const [following, setFollowing] = useState([]);

    useEffect(() => {
      async function fetchFollowing() {
        try {
          // console.log(location.state.sId);
          const response = await getUser(location.state.sId);
          if (response.status === 200) {
            // console.log(response.data.following);
            setFollowing(response.data.following);
          } else {
            // Authentication failed, set error message
            // console.log('Invaliduser ID. Please try again.');
          }
        } catch (error) {
          // console.error('getUser error', error);
        }
      }
      fetchFollowing();
    }, []);
    return following;
  };

  const GetFollowers = () => {
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
      async function fetchFollowers() {
        try {
          // console.log(location.state.sId);
          const response = await getUser(location.state.sId);
          if (response.status === 200) {
            // console.log(response.data.followers);
            setFollowers(response.data.followers);
          } else {
            // Authentication failed, set error message
            // console.log('Invaliduser ID. Please try again.');
          }
        } catch (error) {
          // console.error('getUser error', error);
        }
      }
      fetchFollowers();
    }, []);
    return followers;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <div style={{
        display: 'flex', justifyContent: 'center', position: 'fixed', width: '100%', background: '#8769b6',
      }}
      >
        <h1>Profile</h1>
        <div>
          <button type="button" title="Create New Post" onClick={handleMain}>Main</button>
        </div>
      </div>
      <div style={{
        display: 'flex', width: '100%', justifyContent: 'center', marginTop: '100px', background: '#b6f486',
      }}
      >
        <div style={{
          display: 'flex', width: '100%', justifyContent: 'space-between', flexDirection: 'row',
        }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
            <label htmlFor="followers">
              Followers
              <select name="followers" id="followers">
                {GetFollowers().map((user) => (
                  <option value={user.username}>{ user.username }</option>
                ))}
              </select>
            </label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2>{ location.state.sName }</h2>
            <img alt="test profile pic" src="https://picsum.photos/200/304" />
            <t>My info</t>
            { isMyself !== true && followed === true
                            && <button type="button" title="Follow/Unfollow" onClick={handleFollow}>Unfollow</button>}
            { isMyself !== true && followed === false
                            && <button type="button" title="Follow/Unfollow" onClick={handleFollow}>Follow</button>}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
            <label htmlFor="following">
              Following
              <select name="following" id="following">
                {GetFollowing().map((user) => (
                  <option value={user.username}>{ user.username }</option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
