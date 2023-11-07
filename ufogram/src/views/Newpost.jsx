import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import createNewPost from '../api/createNewPost';

export default function Newpost() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const location = useLocation();

  const handlePost = async () => {
    // post authentication

    // 1. check if both file and caption is empty
    if (!file && !caption) {
      return;
    }

    // 2. file authentication (if there is a file)
    // async function isValidImageOrVideo(file) {
    // return new Promise((resolve) => {
    //   const mediaElement = document.createElement('video');
    //   mediaElement.src = url;

    //   mediaElement.onloadeddata = () => {
    //     resolve(true); // It's a valid video
    //     mediaElement.remove(); // Remove the element from the DOM
    //   };

    //   mediaElement.onerror = () => {
    //     // If it fails to load as a video, check if it's an image
    //     const imgElement = new Image();
    //     imgElement.src = url;

    //     imgElement.onload = () => {
    //       resolve(true); // It's a valid image
    //       imgElement.remove(); // Remove the element from the DOM
    //     };

    //     imgElement.onerror = () => {
    //       resolve(false); // It's neither an image nor a video
    //       imgElement.remove(); // Remove the element from the DOM
    //     };
    //   };
    // });

    // console.log('file type', file.type);
    // if (file.type.split('/')[0] !== 'image' && file.type.split('/')[0] !== 'video') {
    //   console.log('Wrong file type');
    //   return;
    // }
    // }

    console.log(file);
    if (!file.name.endsWith('.jpg')
    && !file.name.endsWith('.jpeg')
    && !file.name.endsWith('.png')
    && !file.name.endsWith('.apng')
    && !file.name.endsWith('.gif')
    && !file.name.endsWith('.ico')
    && !file.name.endsWith('.cur')
    && !file.name.endsWith('.jfif')
    && !file.name.endsWith('.pjpeg')
    && !file.name.endsWith('.pjp')
    && !file.name.endsWith('.svg')
    && !file.name.endsWith('.mp4')
    && !file.name.endsWith('.mov')
    && !file.name.endsWith('.avi')
    && !file.name.endsWith('.wmv')
    && !file.name.endsWith('.avchd')
    ) {
      console.log('Wrong file type');
      return;
    }

    // if (file) {
    //   try {
    //     const isValid = await isValidImageOrVideo(file);
    //     if (!isValid && !file.includes('youtube')) {
    //     //   console.log('Not a valid image or video URL');
    //       return;
    //     }
    //   } catch (error) {
    //     // console.error('Error:', error);
    //   }
    // }

    // after both authentication, create a new post
    console.log('Newpost 89');
    const author = {
      id: location.state.userId,
      username: location.state.username,
    };

    try {
      console.log('Create formData in Newpost');
      let formData;
      try {
        formData = new FormData();
        console.log('formData before', formData);
        const date = new Date();
        const name = `${date.getTime()}_${file}`;
        console.log('File type: ', typeof file);
        formData.append('File_0', file, name);
        console.log('formData appended', formData);
      } catch (e) {
        console.log(e);
      }
      console.log('formData created in Newpost');
      console.log('formData after', formData);
      const status = await createNewPost(caption, formData, author);
      console.log('Status', status);

      if (status === 201) {
        navigate('/main', {
          state: {
            userId: location.state.userId,
            username: location.state.username,
            users: location.state.users,
          },
        });
      } else {
        console.log('Create post error');
      }
    } catch (error) {
    //   throw error;
    }
  };

  const handleMain = () => {
    navigate('/main', { state: { userId: location.state.userId, username: location.state.username, users: location.state.users } });
  };

  const handleFile = (fileEvent) => {
    setFile(fileEvent.target.files[0]);
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
        <label htmlFor="file">
          Image/Video:
          <input type="file" name="file" data-testid="linkBox" onChange={handleFile} />
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
