/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Comment from './Comment';
import likePost from '../api/likePost';
import unlikePost from '../api/unlikePost';
import createNewComment from '../api/createNewComment';
import getPostComments from '../api/getPostComments';

function PostRender({
  username, imageUrl, caption, self, state, postObj,
}) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [comNum, setComNum] = useState(0);
  const [likeText, setLikeText] = useState('Like');
  const [type, setType] = useState(null);

  const navigate = useNavigate();

  async function isImageOrVideo(url) {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
      img.onload = () => resolve('image');
      img.onerror = () => resolve('video');
    });
  }

  useEffect(() => {
    setLikes(postObj.likes.length);

    if (postObj.likes.includes(state.userId)) {
      setLiked(true);
      setLikeText('Unlike');
    }

    async function checkImageOrVideo() {
      try {
        const result = await isImageOrVideo(imageUrl);
        setType(result);
      } catch (error) {
        console.error('Error checking image or video:', error);
      }
    }
    checkImageOrVideo();
  }, [state.userId]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const result = await getPostComments(postObj._id);
        if (result !== -1) {
          setComments(result.data.data);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
    fetchComments();
  }, [comNum]);

  const handleLike = () => {
    if (liked) {
      unlikePost(postObj._id, state.userId);
      setLikes(likes - 1);
      setLiked(false);
      setLikeText('Like');
    } else {
      likePost(postObj._id, state.userId);
      setLikes(likes + 1);
      setLiked(true);
      setLikeText('Unlike');
    }
  };

  const handleEdit = () => {
    navigate('/editpost', {
      state: {
        userId: state.userId,
        username: state.username,
        users: state.users,
        initFile: imageUrl,
        initCap: caption,
        postId: postObj._id,
      },
    });
  };

  const handleComment = (commentEvent) => {
    setNewComment(commentEvent.target.value);
  };

  const addComment = async () => {
    await createNewComment(newComment, {
      id: state.userId,
      username: state.username,
    }, postObj._id);
    setComNum(comNum + 1);
    setNewComment('');
  };

  return (
    <div className="bg-white shadow-lg rounded-lg mb-6 p-6 w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-2 text-space-cadet text-center">{username}</h2>
      {type === 'video' && (
        <video controls width="100%" className="mb-4 max-h-96" src={imageUrl} />
      )}
      {type === 'image' && (
        <img alt="post" src={imageUrl} className="w-full max-h-96 object-contain rounded mb-4" />
      )}
      <div className="text-gray-700 mb-4 text-center">{caption}</div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <button
            type="button"
            id="likeButton"
            className="bg-space-cadet text-white px-3 py-1 rounded-full transition-transform duration-300 hover:scale-105 mr-2"
            onClick={handleLike}
          >
            {likeText}
          </button>
          <span className="text-gray-600 ml-2">
            Likes:
            {likes}
          </span>
        </div>
        {self === 1 && (
          <button
            type="button"
            className="bg-mountbatten-pink text-white px-3 py-1 rounded-full transition-transform duration-300 hover:scale-105"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
      </div>
      <div className="border-t border-gray-300 mt-4 pt-4">
        <h3 className="text-lg font-medium text-space-cadet mb-2">Comments:</h3>
        <div className="mb-4 w-full">
          {comments.map((comment) => (
            <div className="flex justify-start" key={comment._id}>
              <Comment text={comment.text} author={comment.author} />
            </div>
          ))}
        </div>
        <div className="flex items-center w-full">
          <input
            type="text"
            name="comment"
            data-testid="captionBox"
            value={newComment}
            onChange={handleComment}
            className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-space-cadet focus:border-space-cadet"
          />
          <button
            type="button"
            id="commentButton"
            className="ml-2 bg-space-cadet text-white px-3 py-1 rounded-full transition-transform duration-300 hover:scale-105"
            onClick={addComment}
          >
            comment
          </button>
        </div>
      </div>
    </div>
  );
}

PostRender.propTypes = {
  username: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  self: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
  postObj: PropTypes.string.isRequired,
};

export default PostRender;
