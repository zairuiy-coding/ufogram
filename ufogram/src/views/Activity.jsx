import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DisplayPosts from './DisplayPosts';
import getAllPosts from '../api/getAllPosts';
import getUser from '../api/getUser';

export default function Activity({ userId, selfKind, state }) {
  const [allPosts, setAllPosts] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const userResponse = await getUser(userId);
        if (userResponse.status === 200) {
          setFollowing(userResponse.data.user.following);
        } else {
          console.log('Error fetching following');
        }

        const postsResponse = await getAllPosts();
        if (postsResponse.status === 200) {
          const newPosts = postsResponse.data.posts.reverse();
          setAllPosts(newPosts);
        } else {
          console.log('Error fetching posts');
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
    fetchData();
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      <DisplayPosts
        following={following}
        allPosts={allPosts}
        selfKind={selfKind}
        state={state}
        userId={userId}
      />
    </div>
  );
}

Activity.propTypes = {
  userId: PropTypes.string.isRequired,
  selfKind: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
};
