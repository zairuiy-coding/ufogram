import axios from 'axios';

// create new post
/**
 * A function to create new post
 * @param {*} caption the caption
 * @param {*} fileURL the URL of the file
 * @param {*} author the author of the post
 */
export default async function createNewPost(caption, fileURL, author) {
  try {
    const response = await axios.post('http://localhost:3000/Posts', {
      caption,
      fileURL,
      likes: 0,
      author,
    });
    return response.status;
  } catch (e) {
    // error
    // console.log('create post error: ', e);
    return 404;
  }
}
