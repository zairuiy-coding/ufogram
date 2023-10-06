import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';

export default function Newpost() {
    const navigate = useNavigate();
    const [Image, setImage] = useState(null);
    const [caption, setCaption] = useState('');

    const handleNewPost = () => {
        // // do something to add post to posts
        navigate('/main');
    };
    const handleImage = () => {
        // // do something to add image to post
    };
    const handleCaption = () => {
        // // do something to add caption to post
    };
    return (
        <div>
            <label htmlFor='image'>Image: </label>
            <input type="file" name="image" accept="image/*" onChange={handleImage}/>
            <label htmlFor='caption'>Caption: </label>
            <input type="text" name="caption" value={caption} onChange={handleCaption}/>
        </div>
    );
}