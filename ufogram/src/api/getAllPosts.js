// get all posts

import axios from 'axios';

/**
 * A function to get all posts.
 */
export default async function getAllPosts() {
  try {
    const response = await axios.get('http://localhost:3000/Posts', {
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
    console.log('get all posts error');
  }
}
