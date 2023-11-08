// Unlike a post

import axios from 'axios';

export default async function unlikePost(postId, userId) {
  try {
    const response = await axios.put(`http://localhost:8080/Posts/unlike/${postId}/${userId}`);
    return response;
  } catch (err) {
    // console.log('Unlike post error');
    return -1;
  }
}
