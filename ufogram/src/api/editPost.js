import axios from 'axios';

// edit a post
/**
 * A function to create new post
 * @param {*} caption the caption
 * @param {*} fileURL the URL of the file
 * @param {*} author the author of the post
 * @param {*} postId the ID of the post
 */
export default async function editPost(caption, file, author, postId, fileName) {
  try {
    let response;
    if (file === null) {
      response = await axios.put(`http://localhost:8080/Posts/same/${postId}`, {
        caption,
        file: fileName,
        author,
      });
    } else {
      response = await axios.put(`http://localhost:8080/Posts/new/${postId}`, {
        caption,
        file,
        author,
        fileName,
      }, {
        'Content-Type': 'multipart/form-data',
      });
    }
    return response;
  } catch (e) {
    // error
    // console.log('create post error: ', e);
    return -1;
  }
}
