import axios from 'axios';
import uploadFile from './uploadFile';

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
    const fileResponse = await uploadFile(file);
    console.log(fileResponse);
    if (fileResponse === -1 || fileResponse.status !== 201) {
      console.log('UploadFile error');
      return -1;
    }

    const fileURL = fileResponse.data.URL;
    const response = await axios.post(
      'http://localhost:8080/Posts',
      {
        caption,
        fileURL,
        author,
      },
    );
    console.log('CreateNewPost response status', response.status);
    return response.status;
  } catch (e) {
    console.log('create post error: ', e);
    return -1;
  }
}
