import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import editPost from '../api/editPost';
import deletePost from '../api/deletePost';

export default function EditPost() {
  const location = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState(location.state.initCap);

  const handlePost = async () => {
    if (!caption) {
      return;
    }

    if (file && (file.type.split('/')[0] !== 'image' && file.type.split('/')[0] !== 'video')) {
      return;
    }

    const author = {
      id: location.state.userId,
      username: location.state.username,
    };

    const urlCopy = location.state.initFile;
    const fileName = urlCopy.split('/').pop();

    try {
      let response;
      if (file === null) {
        response = await editPost(
          caption,
          null,
          author,
          location.state.postId,
          location.state.initFile,
        );
      } else {
        const date = new Date();
        const name = `${date.getTime()}_${file.name}`;
        const formData = new FormData();
        formData.append('File_0', file, name);
        response = await editPost(caption, formData, author, location.state.postId, fileName);
      }

      if (response.status === 200) {
        navigate('/userprofile', {
          state: {
            userId: location.state.userId,
            username: location.state.username,
            self: true,
            sName: location.state.username,
            sId: location.state.userId,
            users: location.state.users,
            followed: true,
          },
        });
      } else {
        console.error('Edit post error');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDiscard = () => {
    navigate('/userprofile', {
      state: {
        userId: location.state.userId,
        username: location.state.username,
        self: true,
        sName: location.state.username,
        sId: location.state.userId,
        users: location.state.users,
        followed: true,
      },
    });
  };

  const handleDelete = async () => {
    const urlCopy = location.state.initFile;
    const fileName = urlCopy.split('/').pop();
    const response = await deletePost(location.state.postId, fileName);
    if (response.status !== 200) {
      console.error('Post deletion error');
    } else {
      navigate('/userprofile', {
        state: {
          userId: location.state.userId,
          username: location.state.username,
          self: true,
          sName: location.state.username,
          sId: location.state.userId,
          users: location.state.users,
          followed: true,
        },
      });
    }
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
          <h1 className="text-3xl font-semibold text-space-cadet">Edit Post</h1>
          <button
            type="button"
            className="px-4 py-2 bg-space-cadet text-white rounded-md shadow-sm transform transition-transform duration-300 hover:scale-105"
            onClick={handleDiscard}
          >
            My Profile
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
                value={caption}
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
              onClick={handleDiscard}
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
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded-md shadow-sm transition-transform duration-300 hover:scale-105"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
