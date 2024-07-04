import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

// create new post
/**
 * A function to upload a file
 * @param {*} file the file
 */
export default async function uploadFile(file) {
  try {
    // console.log('Upload file');
    const response = await axios.post(
      `${backendUrl}/File`,
      file,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    // console.log('uploadFile response', response);
    return response;
  } catch (e) {
    // console.log('uploadFile error: ', e);
    return -1;
  }
}
