import axios from 'axios';

// delete a post
/**
 * A function to create new post
 * @param {*} postId the ID of the post
 */
export default async function deletePost(postId, fileName) {
  try {
    // console.log('filename: ', fileName);
    const response = await axios.delete(`http://localhost:8080/Posts/${postId}/${fileName}`);
    // console.log('response: ', response);
    return response;
  } catch (e) {
    // error
    // console.log('create post error: ', e);
    return -1;
  }
}
