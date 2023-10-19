import React from 'react';
import PropTypes from 'prop-types';

function PostRender({ username, imageUrl, caption }) {
//   const [likes, setLikes] = useState(0);
//   const [liked, setLiked] = useState(false);

  // const likeButton = document.getElementById("likeButton");

  //   const handleLike = ((clickEvent) => {
  //     console.log('1', liked);
  //     if (liked) {
  //       setLikes(likes - 1);
  //       setLiked(false);
  //       console.log('5', liked);
  //     //   clickEvent.target.innerHTML = 'Like';
  //     } else {
  //       setLikes(likes + 1);
  //       setLiked(true);
  //       console.log('6', liked);
  //     //   clickEvent.target.innerHTML = 'Unlike';
  //     }
  //     const button = clickEvent.target;
  //     console.log('2', button.innerHTML);
  //     button.innerHTML = liked ? 'Unlike' : 'Like';
  //     console.log('4', button.innerHTML);
  //   });
  return (
    <div style={{ margin: '10px' }}>
      <div>{ username }</div>
      {
                imageUrl.includes('youtube') && <iframe title="YouTube Video" width="560" height="315" src={imageUrl} />
            }
      {
                !imageUrl.includes('youtube') && <img src={imageUrl} alt="image_unloaded" />
            }
      <div>{ caption }</div>
      {/* <div>
        <button type="button" id="likeButton" onClick={handleLike}>Like</button>
      </div> */}
      {/* <div>
        Likes:
        {' '}
        { likes }
      </div> */}
    </div>
  );
}

// Prop validation using ESLint's prop object
PostRender.propTypes = {
  username: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};

export default PostRender;
