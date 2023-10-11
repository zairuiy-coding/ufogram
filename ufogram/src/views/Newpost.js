import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom';

export default function Newpost() {
    const navigate = useNavigate();
    const [image, setImage] = useState('');
    const [video, setVideo] = useState('');
    const [file, setFile] = useState('');
    const [caption, setCaption] = useState('');
    const location = useLocation();

    const handleMain = () => {
        navigate('/main', { state: { userId: location.state.userId, username: location.state.username, users: location.state.users } });
    };

    const handleImage = (imageEvent) => {
        setImage(imageEvent.target.value);
        setFile(imageEvent.target.value);
    };

    const handleVideo = (videoEvent) => {
        setVideo(videoEvent.target.value);
        setFile(videoEvent.target.value);
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
                <input type="imageLink" name="imageLink" onChange={handleImage}/>
                <label htmlFor='image'>Video: </label>
                <input type="videoLink" name="videoLink" onChange={handleVideo}/>
                <label htmlFor='caption'>Caption: </label>
                <input type="text" name="caption" onChange={handleCaption}/>
                <button type="button" title="discard" onClick={handleMain}>Discard</ button>
            </div>
        </div>
    );
}