// get all comments of a post

import axios from 'axios';

/**
 * A function to get all comments under a post.
 */
export default async function getPostComments(postId) {
  try {
    const result = await axios.get(`http://localhost:8080/Comments/post/${postId}`);
    if (result.status === 200) {
      return result;
    }
    return result;
  } catch (e) {
    // console.log('get all posts error');
    return -1;
  }
}
