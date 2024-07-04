import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

// create new comment
/**
 * A function to create new comment
 * @param {*} text the text of the comment
 * @param {*} author the author of the post
 */
export default async function createNewComment(text, author, postId) {
  try {
    const response = await axios.post(`${backendUrl}/Comments/${postId}`, {
      text,
      author,
    });
    // if (response.status === 201) {
    //   await axios.post(`http://localhost:8080/CommentPost/${postId}/${response.id}`);
    // }
    return response;
  } catch (e) {
    // error
    // console.log('create post error: ', e);
    return -1;
  }
}
