// get a specific comment

import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_URL

/**
 * A function to get comment.
 */
export default async function getComment(commentId) {
  try {
    const response = await axios.get(`${backendUrl}/Comments/${commentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
    return response;
  } catch (e) {
    // error
    // console.log('get user error: ', e);
    return -1;
  }
}
