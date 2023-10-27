import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Comment from './Comment';

function PostRender({
  username, imageUrl, caption, self, state,
}) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');

  // console.log('self: ', self);

  const navigate = useNavigate();

  // const likeButton = document.getElementById('likeButton');

  const handleLike = ((clickEvent) => {
    const eventCopy = clickEvent;
    console.log('1', liked);
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
      console.log('5', liked);
      eventCopy.target.innerHTML = 'Like';
    } else {
      setLikes(likes + 1);
      setLiked(true);
      console.log('6', liked);
      eventCopy.target.innerHTML = 'Unlike';
    }
    // const button = clickEvent.target;
    // console.log('2', button.innerHTML);
    // button.innerHTML = liked ? 'Unlike' : 'Like';
    // console.log('4', button.innerHTML);
  });

  const handleEdit = (() => {
    navigate('/editpost', {
      state: {
        userId: state.userId,
        username: state.username,
        users: state.users,
        initFile: imageUrl,
        initCap: caption,
      },
    });
  });

  const handleComment = ((commentEvent) => {
    setComment(commentEvent.target.value);
  });

  const addComment = (() => {
  });

  return (
    <div style={{ margin: '10px' }}>
      <h2>{ username }</h2>
      {
                imageUrl.includes('youtube') && <iframe title="YouTube Video" width="560" height="315" src={imageUrl} />
            }
      {
                !imageUrl.includes('youtube') && <img src={imageUrl} alt="image_unloaded" />
            }
      <div>{ caption }</div>
      <div>
        <button type="button" id="likeButton" onClick={handleLike}>Like</button>
      </div>
      <div>
        Likes:
        {' '}
        { likes }
      </div>
      {
        self === 1 && <button type="button" onClick={handleEdit}>Edit</button>
      }
      <div>
        <h3>Comments:</h3>
        <div>
          <Comment text="This is so fun!" author="lionelhu" />
          <Comment text="I like it!" author="lionelhu" />
          <div>
            <input type="text" name="comment" data-testid="captionBox" onChange={handleComment} />
            <button type="button" id="commentButton" onClick={addComment}>comment</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Prop validation using ESLint's prop object
PostRender.propTypes = {
  username: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  self: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
};

export default PostRender;
