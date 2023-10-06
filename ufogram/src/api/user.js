// user registration

import axios from 'axios';

/**
 * A function to register a user.
 * @param {*} username the name of the user
 * @param {*} password the password of the user
 */
export default async function register(newUsername, newPassword) {
    // if (newUsername === None || newPassword === None) {
    //     // bad input, throw error
    //     return;
    //
    // }
    try {
        const response = await axios.post('http://localhost:3000/User', {
        username: newUsername,
        password: newPassword
    });
    return response.status;
    } catch(e) {
        // error
    }
}