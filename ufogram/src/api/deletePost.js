import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

// delete a post
/**
 * A function to create new post
 * @param {*} postId the ID of the post
 */
export default async function deletePost(postId, fileName) {
  try {
    // console.log('filename: ', fileName);
    const response = await axios.delete(`${backendUrl}/Posts/${postId}/${fileName}`);
    // console.log('response: ', response);
    return response;
  } catch (e) {
    // error
    // console.log('create post error: ', e);
    return -1;
  }
}
