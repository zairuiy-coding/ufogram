import React, { useState } from 'react';
import Activity from './Activity';
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
        </div>
    )
}