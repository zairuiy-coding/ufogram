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
  console.log(postObj);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState('');

  // console.log('self: ', self);

  const navigate = useNavigate();

  let likeText = 'Like';
  setLikes(postObj.likes.length);
  if (postObj.likes.includes(state.userId)) {
    likeText = 'Unlike';
    setLiked(true);
  }

  // const likeButton = document.getElementById('likeButton');

  const handleLike = ((clickEvent) => {
    const eventCopy = clickEvent;
    console.log('1', liked);
    if (liked) {
      // eslint-disable-next-line no-underscore-dangle
      unlikePost(postObj._id, state.userId);
      setLikes(likes - 1);
      setLiked(false);
      console.log('5', liked);
      eventCopy.target.innerHTML = 'Like';
    } else {
      // eslint-disable-next-line no-underscore-dangle
      likePost(postObj._id, state.userId);
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
        // eslint-disable-next-line no-underscore-dangle
        postId: postObj._id,
      },
    });
  });

  const handleComment = ((commentEvent) => {
    setNewComment(commentEvent.target.value);
    // Automatic update of new comment in post???
  });

  const addComment = (async () => {
    // eslint-disable-next-line no-underscore-dangle
    await createNewComment(newComment, state.userId, postObj._id);
  });

  const GetComments = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
      async function fetchComments() {
        try {
          // console.log(location.state.sId);
          // eslint-disable-next-line no-underscore-dangle
          const result = await getPostComments(postObj._id);
          if (result !== -1) {
            // console.log(response.data.following);
            setComments(result.data.data);
          } else {
            // Authentication failed, set error message
            console.log('Error in getting commehts of a post.');
          }
        } catch (error) {
          console.error('ERROR');
        }
      }
      fetchComments();
    }, []);
    return comments;
  };

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
        <button type="button" id="likeButton" onClick={handleLike}>{likeText}</button>
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
          {GetComments().map((comment) => {
            <Comment text={comment.text} author={comment.author} />;
          })}
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
  postObj: PropTypes.string.isRequired,
};

export default PostRender;
