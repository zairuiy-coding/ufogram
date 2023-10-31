import axios from 'axios';

export default async function updateUser(userId, object) {
  try {
    const response = await axios.put(`http://localhost:8080/users/${userId}`, object);
    return response;
  } catch (err) {
    // console.log('Update user error');
    return -1;
  }
}
