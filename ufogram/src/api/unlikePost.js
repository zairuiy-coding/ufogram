// Unlike a post

import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default async function unlikePost(postId, userId) {
  try {
    const response = await axios.put(`${backendUrl}/Posts/unlike/${postId}/${userId}`);
    return response;
  } catch (err) {
    // console.log('Unlike post error');
    return -1;
  }
}
