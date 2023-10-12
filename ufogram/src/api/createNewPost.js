import axios from "axios";

// create new post
/**
 * A function to create new post
 * @param {*} username the name of the user
 * @param {*} password the password of the user
 */
export default async function createNewPost(caption, fileURL, author) {
    // if (newUsername === '' || newPassword === '' || newUsername === null || newPassword === null) {
    //     // bad input, throw error
    //     return;
    // }

    try {
        const response = await axios.post('http://localhost:3000/Posts', {
            "caption": caption,
            "fileURL": fileURL,
            "likes":0,
            "author": author
        });
    return response.status;
    } catch(e) {
        // error
    }
}