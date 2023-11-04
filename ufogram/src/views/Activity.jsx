import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DisplayPosts from './DisplayPosts';
import getAllPosts from '../api/getAllPosts';
import getUser from '../api/getUser';

export default function Activity({ userId, selfKind, state }) {
  // selfKind: 0 means from main, 1 means from my profile, 2 means from soneone else's profile
  // const [posts, setPosts] = useState([]);
  // const [f, setF] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  // const [fetched, setFetched] = useState(false);
  // let allPosts;
  // let following;
  // const [id, setId] = useState('');
  // setId(userId);

  console.log('userId: ', userId);
  console.log('self: ', selfKind);
  console.log('state: ', state);

  // const GetAllPosts = () => {
  //   const [allPosts, setAllPosts] = useState([]);

  //   useEffect(() => {
  //     console.log('Useeffect');
  //     async function fetchAllPosts() {
  //       try {
  //         const response = await getAllPosts();
  //         console.log(response);
  //         if (response.status === 200) {
  //         //   console.log(response.data);
  //           setAllPosts(response.data.posts.reverse()); // reverse the post list
  //           console.log('Activity Posts: ', allPosts);
  //         } else {
  //           console.log('getAllPosts error');
  //         }
  //       } catch (error) {
  //         // console.error('getUser error', error);
  //       }
  //     }
  //     fetchAllPosts();
  //   }, []);
  //   console.log('Activity Posts: ', allPosts);
  //   return allPosts;
  // };

  // const GetFollowing = () => {
  //   const [following, setFollowing] = useState([]);

  //   useEffect(() => {
  //     async function fetchFollowing() {
  //       try {
  //         const response = await getUser(userId);
  //         if (response.status === 200) {
  //         //   console.log(response.data);
  //           setFollowing(response.data.user.following); // reverse the post list
  //           console.log('Following: ', following);
  //         } else {
  //           console.log('gettFollowing error');
  //         }
  //       } catch (error) {
  //         // console.error('getUser error', error);
  //       }
  //     }
  //     fetchFollowing();
  //   }, []);
  //   console.log('Following: ', following);
  //   return following;
  // };useEffect

  useEffect(() => {
    console.log('UseEffect called');
    async function fetchData() {
      try {
        const response = await getUser(userId);
        if (response.status === 200) {
          setFollowing(response.data.user.following);
          // following = response.data.user.following;
        } else {
          console.log('getFollowing error');
        }

        const responsew = await getAllPosts();
        if (responsew.status === 200) {
          const newPosts = responsew.data.posts.reverse();
          if (JSON.stringify(newPosts) !== JSON.stringify(allPosts)) {
            console.log('change posts to', responsew.data.posts.reverse());
            setAllPosts(newPosts);
          }
          // setAllPosts(responsew.data.posts.reverse());
          // allPosts = response.data.posts.reverse();
        } else {
          console.log('getAllPosts error');
        }

        // setFetched(true);
      } catch (error) {
        console.error('getFollowing error', error);
      }
    }
    // if (!fetched) {
    fetchData();
    // }
  }, [userId]);

  // const fetchData = useCallback(async () => {
  //   try {
  //     const response = await getAllPosts();
  //     if (response.status === 200) {
  //       setAllPosts(response.data.posts.reverse());
  //       // allPosts = response.data.posts.reverse();
  //     } else {
  //       console.log('getAllPosts error');
  //     }
  //   } catch (error) {
  //     console.error('getAllPosts error', error);
  //   }

  //   try {
  //     const response = await getUser(userId);
  //     if (response.status === 200) {
  //       setFollowing(response.data.user.following);
  //       // following = response.data.user.following;
  //     } else {
  //       console.log('getFollowing error');
  //     }
  //   } catch (error) {
  //     console.error('getFollowing error', error);
  //   }
  // }, [userId]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const posts = GetAllPosts();
  // const f = GetFollowing();
  // console.log('AllPosts: ', posts);
  // console.log('Post length: ', posts.length);
  // console.log('F: ', f);
  console.log('POSTS', allPosts);
  return (
    <DisplayPosts
      following={following}
      allPosts={allPosts}
      selfKind={selfKind}
      state={state}
      userId={userId}
    />
  );
}

Activity.propTypes = {
  userId: PropTypes.string.isRequired, // Prop validation for userId
  selfKind: PropTypes.number.isRequired, // Prop validation for userId
  state: PropTypes.string.isRequired, // Prop validation for userId
};
