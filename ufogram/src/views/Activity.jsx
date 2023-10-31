import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import getAllPosts from '../api/getAllPosts';
import getUser from '../api/getUser';

export default function Activity({ userId, selfKind, state }) {
  // selfKind: 0 means from main, 1 means from my profile, 2 means from soneone else's profile
  const [allPosts, setAllPosts] = useState([]);
  const [following, setFollowing] = useState([]);

  console.log('userId: ', userId);
  console.log('self: ', selfKind);
  console.log('state: ', state);

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        const response = await getAllPosts();
        if (response.status === 200) {
        //   console.log(response.data);
          setAllPosts(response.data.reverse()); // reverse the post list
        } else {
        //   console.log('');
        }
        const fResponse = await getUser(userId);
        setFollowing(fResponse.data.following.map((user) => user.id));
        // console.log(following);
      } catch (error) {
        // console.error('getUser error', error);
      }
    }
    fetchAllPosts();
  }, []);

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', flexDirection: 'column', background: '#b6f486', width: '100%',
    }}
    >
      {/* <Post username="Lionel" imageUrl="https://picsum.photos/200/302" caption="Howdy"/>
            <Post username="Yuan" imageUrl="https://picsum.photos/200/301" caption="Hello"/>
            <Post username="Zairui" imageUrl="https://picsum.photos/200/303" caption="Hi"/> */}

      { allPosts.length !== 0 && selfKind === 0
      && allPosts.filter((post) => following.includes(post.author.id)).map((post) => (
        <Post
          username={post.author.username}
          imageUrl={post.fileURL}
          caption={post.caption}
          self={selfKind}
          state={state}
          postId={post.id}
        />
      ))}
      { allPosts.length !== 0 && selfKind === 1
      && allPosts.filter((post) => post.author.id === userId).map((post) => (
        <Post
          username={post.author.username}
          imageUrl={post.fileURL}
          caption={post.caption}
          self={selfKind}
          state={state}
          postId={post.id}
        />
      ))}
      { allPosts.length !== 0 && selfKind === 2
      && allPosts.filter((post) => post.author.id === state.sId).map((post) => (
        <Post
          username={post.author.username}
          imageUrl={post.fileURL}
          caption={post.caption}
          self={selfKind}
          state={state}
          postObject={post}
        />
      ))}
      { allPosts.length === 0 && <t>No posts</t>}
    </div>
  );
}

Activity.propTypes = {
  userId: PropTypes.string.isRequired, // Prop validation for userId
  selfKind: PropTypes.number.isRequired, // Prop validation for userId
  state: PropTypes.string.isRequired, // Prop validation for userId
};
