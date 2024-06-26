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
  // console.log(postObj);

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [comNum, setComNum] = useState(0);
  const [likeText, setLikeText] = useState('Like');
  const [type, setType] = useState(null);

  // console.log('self: ', self);

  const navigate = useNavigate();

  // let likeText = 'Like';

  async function isImageOrVideo(url) {
    // return new Promise((resolve) => {
    //   const mediaElement = document.createElement('video');
    //   mediaElement.src = url;

    //   mediaElement.onloadeddata = () => {
    //     resolve('video'); // It's a valid video
    //     mediaElement.remove(); // Remove the element from the DOM
    //   };

    //   mediaElement.onerror = () => {
    //     // If it fails to load as a video, check if it's an image
    //     const imgElement = new Image();
    //     imgElement.src = url;

    //     imgElement.onload = () => {
    //       resolve('image'); // It's a valid image
    //       imgElement.remove(); // Remove the element from the DOM
    //     };

    //     imgElement.onerror = () => {
    //       resolve(null); // It's neither an image nor a video
    //       imgElement.remove(); // Remove the element from the DOM
    //     };
    //   };
    // });

    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
      img.onload = () => resolve('image');
      img.onerror = () => resolve('video');
    });
  }

  useEffect(() => {
    // console.log('UseEffect called');

    // const initalLikes = postObj.likes.length;
    setLikes(postObj.likes.length);

    if (postObj.likes.includes(state.userId)) {
      setLiked(true);
      setLikeText('Unlike');
    }

    async function checkImageOrVideo() {
      try {
        const result = await isImageOrVideo(imageUrl);
        if (result === 'image') {
          // Do something if it's an image
          // console.log('This is an image');
          setType('image');
        } else if (result === 'video') {
          // Do something if it's a video
          // console.log('This is a video');
          setType('video');
        } else {
          // Do something if it's neither an image nor a video
          // console.log('This is neither an image nor a video');
        }
      } catch (error) {
        // Handle any errors that might occur during the check
        // console.error('Error checking image or video:', error);
      }
    }
    checkImageOrVideo();
  }, [state.userId]);

  useEffect(() => {
    // console.log('UseEffect 2 called');

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
          // console.log('Error in getting commehts of a post.');
        }
      } catch (error) {
        // console.error('ERROR');
      }
    }
    fetchComments();
  }, [comNum]);

  const handleLike = (() => {
    // const eventCopy = clickEvent;
    // console.log('1', liked);
    if (liked) {
      // eslint-disable-next-line no-underscore-dangle
      unlikePost(postObj._id, state.userId);
      setLikes(likes - 1);
      setLiked(false);
      // console.log('5', liked);
      // likeText = 'Like';
      setLikeText('Like');
    } else {
      // eslint-disable-next-line no-underscore-dangle
      likePost(postObj._id, state.userId);
      setLikes(likes + 1);
      setLiked(true);
      // console.log('6', liked);
      // likeText = 'Unlike';
      setLikeText('Unlike');
    }
    // const button = clickEvent.target;
    // console.log('2', button.innerHTML);
    // likeText = liked ? 'Unlike' : 'Like';
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

  // const GetComments = () => {
  //   useEffect(() => {
  //     async function fetchComments() {
  //       try {
  //         // console.log(location.state.sId);
  //         // eslint-disable-next-line no-underscore-dangle
  //         const result = await getPostComments(postObj._id);
  //         if (result !== -1) {
  //           // console.log(response.data.following);
  //           setComments(result.data.data);
  //         } else {
  //           // Authentication failed, set error message
  //           console.log('Error in getting commehts of a post.');
  //         }
  //       } catch (error) {
  //         console.error('ERROR');
  //       }
  //     }
  //     fetchComments();
  //   // eslint-disable-next-line no-underscore-dangle
  //   }, [postObj._id]);
  //   // return comments;
  //   return (
  //     comments.map((comment) => (
  //       // eslint-disable-next-line no-underscore-dangle
  //       <Comment key={comment._id} text={comment.text} author={comment.author} />
  //     ))
  //   );
  // };

  const addComment = (async () => {
    await createNewComment(newComment, {
      id: state.userId,
      username: state.username,
    }, postObj._id);
    setComNum(comNum + 1);
    setNewComment('');
  });

  return (
    <div style={{ margin: '10px' }}>
      <h2>{ username }</h2>
      {
                type === 'video' && <video controls width="70%" className="videoPlayer" src={imageUrl} />
            }
      {
                type === 'image'
                && (
                  <img alt="post" src={imageUrl} />
                )
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
          {/* {GetComments().map((comment) => (
            <Comment key={comment.id} text={comment.text} author={comment.author} />
          ))} */}
          {/* { GetComments() } */}
          {
            comments.map((comment) => (
              // eslint-disable-next-line no-underscore-dangle
              <Comment key={comment._id} text={comment.text} author={comment.author} />
            ))
          }

          <div>
            <input type="text" name="comment" data-testid="captionBox" value={newComment} onChange={handleComment} />
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
