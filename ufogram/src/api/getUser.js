// get a specific user

import axios from 'axios';

/**
 * A function to get user.
 */
export default async function getUser(userId) {
  try {
    const response = await axios.get(`http://localhost:3000/Users/${userId}`, {
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
    return 400;
  }
}