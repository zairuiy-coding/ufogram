import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import getUser from '../api/getUser';
import updateUser from '../api/updateUser';
import Activity from './Activity';

export default function UserProfile() {
  const navigate = useNavigate();

  const location = useLocation();

  // console.log('UserId: ', location.state.userId);
  // console.log('sId: ', location.state.sId);

  // const [followed, setFollowed] = useState(location.state.followed);
  let { followed } = location.state;

  const isMyself = location.state.self;

  let selfKind;

  if (location.state.self) {
    selfKind = 1;
  } else {
    selfKind = 2;
  }

  const handleMain = () => {
    navigate('/main', { state: { userId: location.state.userId, username: location.state.username, users: location.state.users } });
  };

  const handleFollow = async (followEvent) => {
    // console.log(`Followed at the start: ${followed}`);
    const selfResponse = await getUser(location.state.userId);
    const searchResponse = await getUser(location.state.sId);
    const currFollowing = selfResponse.data.user.following.slice();
    const currFollowers = searchResponse.data.user.followers.slice();
    const copy = followEvent;
    if (followed) {
      const newFollowing = currFollowing.filter((user) => user.id !== location.state.sId);
      const newFollowers = currFollowers.filter((user) => user.id !== location.state.userId);
      // console.log('newFollowing: \n', newFollowing);
      // console.log('newFollowers: \n', newFollowers);
      await updateUser(location.state.userId, {
        username: selfResponse.data.user.username,
        password: selfResponse.data.user.password,
        following: newFollowing,
        followers: selfResponse.data.user.followers,
      });
      await updateUser(location.state.sId, {
        username: searchResponse.data.user.username,
        password: searchResponse.data.user.password,
        following: searchResponse.data.user.following,
        followers: newFollowers,
      });
      // console.log('Response1: ', response1);
      // console.log('Response2: ', response2);
      copy.target.innerHTML = 'Follow';
      // setFollowed(false);
      followed = false;
      // console.log(`Shoudl be false: ${followed}`);
    } else {
      const newFollowing = currFollowing.slice();
      const newFollowers = currFollowers.slice();
      newFollowing.push({
        id: location.state.sId,
        username: searchResponse.data.user.username,
      });
      newFollowers.push({
        id: location.state.userId,
        username: selfResponse.data.user.username,
      });
      // console.log('newFollowing: \n', newFollowing);
      // console.log('newFollowers: \n', newFollowers);
      await updateUser(location.state.userId, {
        username: selfResponse.data.user.username,
        password: selfResponse.data.user.password,
        following: newFollowing,
        followers: selfResponse.data.user.followers,
      });
      await updateUser(location.state.sId, {
        username: searchResponse.data.user.username,
        password: searchResponse.data.user.password,
        following: searchResponse.data.user.following,
        followers: newFollowers,
      });
      // console.log('Response1: ', response1);
      // console.log('Response2: ', response2);
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
            setFollowing(response.data.user.following);
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
            setFollowers(response.data.user.followers);
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
          <Activity userId={location.state.userId} selfKind={selfKind} state={location.state} />
        </div>
      </div>
    </div>
  );
}
