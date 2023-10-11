import axios from "axios";

// user registration
/**
 * A function to register a user.
 * @param {*} username the name of the user
 * @param {*} password the password of the user
 */
export default async function register(newUsername, newPassword) {
    if (newUsername === '' || newPassword === '' || newUsername === null || newPassword === null) {
        // bad input, throw error
        return;
    }
    try {
        const response = await axios.post('http://localhost:3000/Users', {
            "username": newUsername,
            "password": newPassword,
            "following": [], 
            "followers": []
        });
    return response.status;
    } catch(e) {
        // error
    }
}