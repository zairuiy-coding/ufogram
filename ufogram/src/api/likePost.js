// Like a post

import axios from 'axios';

export default async function likePost(postId, userId) {
  try {
    const response = await axios.put(`http://localhost:8080/Posts/like/${postId}/${userId}`);
    return response;
  } catch (err) {
    console.log('Like post error');
    return -1;
  }
}
