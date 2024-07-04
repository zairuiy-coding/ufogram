import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

// user registration
/**
 * A function to register a user.
 * @param {*} username the name of the user
 * @param {*} password the password of the user
 */
export default async function register(newUsername, newPassword) {
  if (newUsername === '' || newPassword === '' || newUsername === null || newPassword === null) {
    // bad input, throw error
    return -2;
  }
  try {
    const response = await axios.post(`${backendUrl}/Users/`, {
      username: newUsername,
      password: newPassword,
    });
    return response;
  } catch (e) {
    // error
    // console.log('registration error: ', e);
    return -1;
  }
}
