import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import getAllPosts from '../api/getAllPosts';
import getUser from '../api/getUser';

export default function Activity({ userId, selfKind, state }) {
  // selfKind: 0 means from main, 1 means from my profile, 2 means from soneone else's profile
  // const [posts, setPosts] = useState([]);
  // const [f, setF] = useState([]);

  console.log('userId: ', userId);
  console.log('self: ', selfKind);
  console.log('state: ', state);

  const GetAllPosts = () => {
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
      console.log('Useeffect');
      async function fetchAllPosts() {
        try {
          const response = await getAllPosts();
          console.log(response);
          if (response.status === 200) {
          //   console.log(response.data);
            setAllPosts(response.data.posts.reverse()); // reverse the post list
            console.log('Activity Posts: ', allPosts);
          } else {
            console.log('getAllPosts error');
          }
        } catch (error) {
          // console.error('getUser error', error);
        }
      }
      fetchAllPosts();
    }, []);
    console.log('Activity Posts: ', allPosts);
    return allPosts;
  };

  const GetFollowing = () => {
    const [following, setFollowing] = useState([]);

    useEffect(() => {
      async function fetchFollowing() {
        try {
          const response = await getUser(userId);
          if (response.status === 200) {
          //   console.log(response.data);
            setFollowing(response.data.user.following); // reverse the post list
            console.log('Following: ', following);
          } else {
            console.log('gettFollowing error');
          }
        } catch (error) {
          // console.error('getUser error', error);
        }
      }
      fetchFollowing();
    }, []);
    console.log('Following: ', following);
    return following;
  };

  // useEffect(() => {
  //   async function fetchAllPosts() {
  //     try {
  //       const response = await getAllPosts();
  //       if (response.status === 200) {
  //       //   console.log(response.data);
  //         setAllPosts(response.data.reverse()); // reverse the post list
  //       } else {
  //         console.log('Activity Posts: ', allPosts);
  //       }
  //       const fResponse = await getUser(userId);
  //       setFollowing(fResponse.data.following.map((user) => user.id));
  //       console.log('Activity following', following);
  //     } catch (error) {
  //       // console.error('getUser error', error);
  //     }
  //   }
  //   fetchAllPosts();
  // }, []);

  const posts = GetAllPosts();
  const f = GetFollowing();
  console.log('AllPosts: ', posts);
  console.log('Post length: ', posts.length);
  console.log('F: ', f);

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', flexDirection: 'column', background: '#b6f486', width: '100%',
    }}
    >
      {/* <Post username="Lionel" imageUrl="https://picsum.photos/200/302" caption="Howdy"/>
            <Post username="Yuan" imageUrl="https://picsum.photos/200/301" caption="Hello"/>
            <Post username="Zairui" imageUrl="https://picsum.photos/200/303" caption="Hi"/> */}

      { posts.length !== 0 && selfKind === 0 && posts.filter((post) => {
        console.log('aaaaa');
        if (f.some((author) => author.id === post.author.id)) {
          console.log('Followed post');
          return post;
        }
        console.log('Unfollowed post');
        return null;
      }).map((post) => (
        <Post
          username={post.author.username}
          imageUrl={post.fileURL}
          caption={post.caption}
          self={selfKind}
          state={state}
          post={post}
        />
      ))}
      { console.log('1') && posts.length !== 0 && selfKind === 1
      && posts.filter((post) => post.author.id === userId).map((post) => (
        <Post
          username={post.author.username}
          imageUrl={post.fileURL}
          caption={post.caption}
          self={selfKind}
          state={state}
          post={post}
        />
      ))}
      { console.log('2') && posts.length !== 0 && selfKind === 2
      && posts.filter((post) => post.author.id === state.sId).map((post) => (
        <Post
          username={post.author.username}
          imageUrl={post.fileURL}
          caption={post.caption}
          self={selfKind}
          state={state}
          post={post}
        />
      ))}
      { posts.length === 0 && <t>No posts</t>}
    </div>
  );
}

Activity.propTypes = {
  userId: PropTypes.string.isRequired, // Prop validation for userId
  selfKind: PropTypes.number.isRequired, // Prop validation for userId
  state: PropTypes.string.isRequired, // Prop validation for userId
};
