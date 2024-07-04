// get all comments of a post

import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

/**
 * A function to get all comments under a post.
 */
export default async function getPostComments(postId) {
  try {
    const result = await axios.get(`${backendUrl}/Comments/post/${postId}`);
    if (result.status === 200) {
      return result;
    }
    return result;
  } catch (e) {
    // console.log('get all posts error');
    return -1;
  }
}
