import axios from 'axios';

export default async function post(user, image, caption) {
    try {
        const response = await axios.post('http://localhost:3000/posts', {
        image: image,
        caption: caption,
    });
    if (response.status === 201) {
        return response.data;
    } else {
        return 'Error: Post creation failed';
    }
    } catch(e) {
        console.error('Error:', e.message);
        throw e;
    }
}