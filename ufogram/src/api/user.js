// get users

import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

/**
 * A function to get users.
 */
export default async function getUsers() {
  try {
    const response = await axios.get(`${backendUrl}/Users`, {
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
    // console.log('get users error');
    return -1;
  }
}
