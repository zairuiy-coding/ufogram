import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import createNewPost from '../api/createNewPost';

export default function Newpost() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const location = useLocation();

  const handlePost = async () => {
    if (!file && !caption) {
      return;
    }

    const validExtensions = [
      '.jpg', '.jpeg', '.png', '.apng', '.gif', '.ico', '.cur', '.jfif',
      '.pjpeg', '.pjp', '.svg', '.mp4', '.mov', '.avi', '.wmv', '.avchd',
    ];

    if (!validExtensions.some((ext) => file.name.endsWith(ext))) {
      return;
    }

    const author = {
      id: location.state.userId,
      username: location.state.username,
    };

    try {
      const formData = new FormData();
      const date = new Date();
      const name = `${date.getTime()}_${file.name}`;
      formData.append('File_0', file, name);

      const status = await createNewPost(caption, formData, author);
      if (status === 201) {
        navigate('/main', {
          state: {
            userId: location.state.userId,
            username: location.state.username,
            users: location.state.users,
          },
        });
      } else {
        console.error('Create post error');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMain = () => {
    navigate('/main', {
      state: {
        userId: location.state.userId,
        username: location.state.username,
        users: location.state.users,
      },
    });
  };

  const handleFile = (fileEvent) => {
    setFile(fileEvent.target.files[0]);
  };

  const handleCaption = (captionEvent) => {
    setCaption(captionEvent.target.value);
  };

  return (
    <div className="min-h-screen bg-mountbatten-pink p-4">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-semibold text-space-cadet">New Post</h1>
          <button
            type="button"
            className="px-4 py-2 bg-space-cadet text-white rounded-md shadow-sm transform transition-transform duration-300 hover:scale-105"
            onClick={handleMain}
          >
            Back To Main
          </button>
        </div>
        <form className="flex flex-col items-start mb-4 space-y-4 w-full">
          <div className="flex items-center w-full">
            <label htmlFor="fileInput" className="block text-lg font-medium text-space-cadet w-1/4 text-left">
              Image/Video:
              <input
                id="fileInput"
                type="file"
                name="file"
                data-testid="linkBox"
                onChange={handleFile}
                className="p-2 border border-gray-300 rounded-md shadow-sm w-full"
              />
            </label>
          </div>
          <div className="flex items-center w-full">
            <label htmlFor="captionInput" className="block text-lg font-medium text-space-cadet w-1/4 text-left">
              Caption:
              <input
                id="captionInput"
                type="text"
                name="caption"
                data-testid="captionBox"
                onChange={handleCaption}
                className="p-2 border border-gray-300 rounded-md shadow-sm w-full"
              />
            </label>
          </div>
          <div className="flex justify-between w-full mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-mountbatten-pink text-white rounded-md shadow-sm transition-transform duration-300 hover:scale-105"
              onClick={handleMain}
            >
              Discard
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-space-cadet text-white rounded-md shadow-sm transition-transform duration-300 hover:scale-105"
              onClick={handlePost}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
