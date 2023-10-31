import axios from 'axios';

// edit a post
/**
 * A function to create new post
 * @param {*} caption the caption
 * @param {*} fileURL the URL of the file
 * @param {*} author the author of the post
 * @param {*} postId the ID of the post
 */
export default async function editPost(caption, fileURL, author, postId) {
  try {
    const response = await axios.put(`http://localhost:8080/Posts/${postId}`, {
      caption,
      fileURL,
      author,
    });
    return response;
  } catch (e) {
    // error
    // console.log('create post error: ', e);
    return -1;
  }
}
