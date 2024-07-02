/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

export default function DisplayPosts({
  following, allPosts, selfKind, state, userId,
}) {
  return (
    <div className="flex flex-col items-center bg-cool-gray-100 min-h-screen w-full p-4">
      {allPosts.length !== 0 && selfKind === 0
        && allPosts.filter((post) => following.some((user) => user.id === post.author.id)).map(
          (post) => (
            <div key={post._id} className="bg-white shadow-md rounded-lg mb-4 p-4 w-full max-w-2xl">
              <Post
                username={post.author.username}
                imageUrl={post.fileURL}
                caption={post.caption}
                self={selfKind}
                state={state}
                postObj={post}
              />
            </div>
          ),
        )}
      {allPosts.length !== 0 && selfKind === 1
        && allPosts.filter((post) => post.author.id === userId).map((post) => (
          <div key={post._id} className="bg-white shadow-md rounded-lg mb-4 p-4 w-full max-w-2xl">
            <Post
              username={post.author.username}
              imageUrl={post.fileURL}
              caption={post.caption}
              self={selfKind}
              state={state}
              postObj={post}
            />
          </div>
        ))}
      {allPosts.length !== 0 && selfKind === 2
        && allPosts.filter((post) => post.author.id === state.sId).map((post) => (
          <div key={post._id} className="bg-white shadow-md rounded-lg mb-4 p-4 w-full max-w-2xl">
            <Post
              username={post.author.username}
              imageUrl={post.fileURL}
              caption={post.caption}
              self={selfKind}
              state={state}
              postObj={post}
            />
          </div>
        ))}
      {allPosts.length === 0 && <p className="text-space-cadet text-lg mt-4">No posts</p>}
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
