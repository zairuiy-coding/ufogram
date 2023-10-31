import axios from 'axios';

// delete a post
/**
 * A function to create new post
 * @param {*} postId the ID of the post
 */
export default async function deletePost(postId) {
  try {
    const response = await axios.delete(`http://localhost:8080/Posts/${postId}`);
    return response;
  } catch (e) {
    // error
    // console.log('create post error: ', e);
    return -1;
  }
}
