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
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
            <div style={{display: "flex", justifyContent: "center", position: "fixed", width: "100%", background: "#8769b6"}}>
                <h1>UFOgram Welcome!</h1>
                <div>
                    <button type="button" title="My Profile" onClick={handleMyProfile}>My Profile</ button>
                    <button type="button" title="Create New Post" onClick={handleCreateNewPost}>Create New Post</ button>
                </div>
            </div>
            <div style={{display: "flex", width: "100%", justifyContent: "center", marginTop: "80px"}}>
                <Activity />
            </div >
        </div>
    )
}