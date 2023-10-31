// get all comments of a post

import axios from 'axios';

/**
 * A function to get all comments under a post.
 */
export default async function getPostComments(commentsArray) {
  try {
    const result = await Promise.all(commentsArray.map(async (commentId) => {
      const response = await axios.get(`http://localhost:8080/Comments/${commentId}`);
      if (response.status === 200) {
        return response.data;
      }
    }));
    return result;
  } catch (e) {
    // console.log('get all posts error');
    return -1;
  }
}
