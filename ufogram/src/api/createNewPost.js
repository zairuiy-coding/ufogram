import axios from 'axios';

// create new post
/**
 * A function to create new post
 * @param {*} caption the caption
 * @param {*} fileURL the URL of the file
 * @param {*} author the author of the post
 */
export default async function createNewPost(caption, file, author) {
  try {
    console.log('Create New Post');
    const response = await axios.post('http://localhost:8080/Posts', {
      caption,
      file,
      author,
    }, {
      'Content-Type': 'multipart/form-data',
    });
    console.log('CreateNewPost response status', response.status);
    return response.status;
  } catch (e) {
    // error
    // console.log('create post error: ', e);
    return -1;
  }
}
