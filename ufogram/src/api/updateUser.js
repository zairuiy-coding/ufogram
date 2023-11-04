import axios from 'axios';

export default async function updateUser(userId, object) {
  console.log('Update user at frontend');
  try {
    const response = await axios.put(`http://localhost:8080/Users/${userId}`, object);
    return response;
  } catch (err) {
    console.log('Update user error');
    return -1;
  }
}
