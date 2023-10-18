import React, { useState, useEffect } from 'react';
import Post from './Post';
import getAllPosts from '../api/getAllPosts';
import getUser from '../api/getUser';

export default function Activity(props) {
  const [allPosts, setAllPosts] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        const response = await getAllPosts();
        if (response.status === 200) {
          console.log(response.data);
          setAllPosts(response.data.reverse()); // reverse the post list
        } else {
          console.log('');
        }
        const fResponse = await getUser(props.userId);
        setFollowing(fResponse.data.following.map((user) => user.id));
        console.log(following);
      } catch (error) {
        console.error('getUser error', error);
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

      { allPosts.length !== 0
      && allPosts.filter((post) => following.includes(post.author.id)).map((post) => (
        <Post username={post.author.username} imageUrl={post.fileURL} caption={post.caption} />
      ))}
      { allPosts.length === 0 && <t>No posts</t>}
    </div>
  );
}
