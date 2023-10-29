import axios from 'axios';

// create new comment
/**
 * A function to create new comment
 * @param {*} text the text of the comment
 * @param {*} author the author of the post
 */
export default async function createNewPost(text, author) {
  try {
    const response = await axios.post('http://localhost:3000/Comments', {
      text,
      author,
    });
    return response.status;
  } catch (e) {
    // error
    // console.log('create post error: ', e);
    return 404;
  }
}
