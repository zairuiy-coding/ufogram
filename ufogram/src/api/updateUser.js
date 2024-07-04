import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default async function updateUser(userId, object) {
  // console.log('Update user at frontend');
  try {
    const response = await axios.put(`${backendUrl}/Users/${userId}`, object);
    return response;
  } catch (err) {
    // console.log('Update user error');
    return -1;
  }
}
