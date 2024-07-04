// Like a post

import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default async function likePost(postId, userId) {
  try {
    const response = await axios.put(`${backendUrl}/Posts/like/${postId}/${userId}`);
    return response;
  } catch (err) {
    console.log('Like post error');
    return -1;
  }
}
