import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Newpost() {
    const navigate = useNavigate();
    const [Image, setImage] = useState(null);
    const [caption, setCaption] = useState('');

    const handleMain = () => {
        navigate('/main');
    };

    const handleImage = (imageEvent) => {
        setImage(imageEvent.target.value);
    };

    const handleCaption = (captionEvent) => {
        setCaption(captionEvent.target.value);
    };

    return (
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
            <div style={{display: "flex", justifyContent: "center", position: "fixed", width: "100%", background: "#8769b6"}}>
                <h1>New Post</h1>
                <div>
                    <button type="button" title="Create New Post" onClick={handleMain}>Main</ button>
                </div>
            </div>
            <div style={{display: "flex", width: "100%", justifyContent: "center", marginTop: "100px", background: "#b6f486"}}>
                <label htmlFor='image'>Image: </label>
                <input type="file" name="image" accept="image/*" onChange={handleImage}/>
                <label htmlFor='caption'>Caption: </label>
                <input type="text" name="caption" value={caption} onChange={handleCaption}/>
                <button type="button" title="discard" onClick={handleMain}>Discard</ button>
            </div>
        </div>
    );
}