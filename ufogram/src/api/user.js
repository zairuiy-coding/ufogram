// get user

import axios from 'axios';

/**
 * A function to get user.
 */
export default async function getUsers() {

    try {
        const response = await axios.get('http://localhost:3000/Users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
    });
    return response;
    } catch(e) {
        // error
    }
}