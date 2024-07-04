import axios from 'axios';
import uploadFile from './uploadFile';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

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
      response = await axios.put(`${backendUrl}/Posts/same/${postId}`, {
        caption,
        file: fileName,
        author,
      });
    } else {
      const fileResponse = await uploadFile(file);
      // console.log(fileResponse);
      if (fileResponse === -1 || fileResponse.status !== 201) {
        // console.log('UploadFile error');
        return -1;
      }

      const fileURL = fileResponse.data.URL;
      response = await axios.put(`${backendUrl}/Posts/new/${postId}`, {
        caption,
        fileURL,
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
