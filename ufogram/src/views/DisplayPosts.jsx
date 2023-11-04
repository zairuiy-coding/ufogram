import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

export default function DisplayPosts({
  following, allPosts, selfKind, state, userId,
}) {
  console.log('DisplayPosts');
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', flexDirection: 'column', background: '#b6f486', width: '100%',
    }}
    >
      { allPosts.length !== 0
            && selfKind === 0
            && allPosts.filter((post) => following.some((user) => user.id === post.author.id)).map(
              (post) => (
                <Post
                  username={post.author.username}
                  imageUrl={post.fileURL}
                  caption={post.caption}
                  self={selfKind}
                  state={state}
                  postObj={post}
                  // eslint-disable-next-line no-underscore-dangle
                //   key={post._id}
                />
              ),
            )}
      { allPosts.length !== 0 && selfKind === 1
            && allPosts.filter((post) => post.author.id === userId).map((post) => (
              <Post
                username={post.author.username}
                imageUrl={post.fileURL}
                caption={post.caption}
                self={selfKind}
                state={state}
                postObj={post}
                // eslint-disable-next-line no-underscore-dangle
                key={post._id}
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
                postObj={post}
                // eslint-disable-next-line no-underscore-dangle
                // key={post._id}
              />
            ))}
      { allPosts.length === 0 && <t>No posts</t>}
    </div>
  );
}

DisplayPosts.propTypes = {
  following: PropTypes.number.isRequired,
  allPosts: PropTypes.number.isRequired,
  selfKind: PropTypes.number.isRequired,
  state: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired,
};
