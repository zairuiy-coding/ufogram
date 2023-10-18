import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import createNewPost from '../api/createNewPost';

export default function Newpost() {
  const navigate = useNavigate();
  const [file, setFile] = useState('');
  const [caption, setCaption] = useState('');
  const location = useLocation();

  const handlePost = async () => {
    // post authentication

    // 1. check if both filelink and caption is empty
    if (!file && !caption) {
      return;
    }

    // 2. link authentication (if there is a link)
    async function isValidImageOrVideo(url) {
      return new Promise((resolve) => {
        const mediaElement = document.createElement('video');
        mediaElement.src = url;

        mediaElement.onloadeddata = () => {
          resolve(true); // It's a valid video
          mediaElement.remove(); // Remove the element from the DOM
        };

        mediaElement.onerror = () => {
          // If it fails to load as a video, check if it's an image
          const imgElement = new Image();
          imgElement.src = url;

          imgElement.onload = () => {
            resolve(true); // It's a valid image
            imgElement.remove(); // Remove the element from the DOM
          };

          imgElement.onerror = () => {
            resolve(false); // It's neither an image nor a video
            imgElement.remove(); // Remove the element from the DOM
          };
        };
      });
    }

    if (file) {
      try {
        const isValid = await isValidImageOrVideo(file);
        if (!isValid && !file.includes('youtube')) {
        //   console.log('Not a valid image or video URL');
          return;
        }
      } catch (error) {
        // console.error('Error:', error);
      }
    }

    // after both authentication, create a new post
    const author = {
      id: location.state.userId,
      username: location.state.username,
    };

    try {
      const status = await createNewPost(caption, file, author);
      //   console.log('Status', status);

      if (status === 201) {
        navigate('/main', {
          state: {
            userId: location.state.userId,
            username: location.state.username,
            users: location.state.users,
          },
        });
      } else {
        // return 'Error!';
      }
    } catch (error) {
    //   throw error;
    }
  };

  const handleMain = () => {
    navigate('/main', { state: { userId: location.state.userId, username: location.state.username, users: location.state.users } });
  };

  const handleFile = (fileEvent) => {
    setFile(fileEvent.target.value);
  };

  const handleCaption = (captionEvent) => {
    setCaption(captionEvent.target.value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <div style={{
        display: 'flex', justifyContent: 'center', position: 'fixed', width: '100%', background: '#8769b6',
      }}
      >
        <h1>New Post</h1>
        <div>
          <button type="button" title="Create New Post" onClick={handleMain}>Main</button>
        </div>
      </div>
      <div style={{
        display: 'flex', width: '100%', justifyContent: 'center', marginTop: '100px', background: '#b6f486',
      }}
      >
        <label htmlFor="image/file">
          Image/Video:
          <input type="fileLink" name="fileLink" data-testid="linkBox" onChange={handleFile} />
        </label>
        <label htmlFor="caption">
          Caption:
          <input type="text" name="caption" data-testid="captionBox" onChange={handleCaption} />
        </label>
        <button type="button" title="discard" onClick={handleMain}>Discard</button>
        <button type="button" title="post" onClick={handlePost}>Post</button>
      </div>
    </div>
  );
}
