import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';

export default function Main() {

    const navigate = useNavigate();

    const handleMyProfile = () => {
        navigate('/myprofile');
    };

    const handleCreateNewPost = () => {

    };


    return (
        <div>
            <h1>UFOgram Welcome!</h1>
            <button type="button" title="My Profile" onClick={handleMyProfile}>My Profile</ button>
            <button type="button" title="Create New Post" onClick={handleCreateNewPost}>Create New Post</ button>
        </div>
    )
}