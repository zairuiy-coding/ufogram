import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Main() {
    const navigate = useNavigate();

    const handleMain = () => {
        navigate('/main');
    };

    return (
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
            <div style={{display: "flex", justifyContent: "center", position: "fixed", width: "100%", background: "#8769b6"}}>
                <h1>My Profile</h1>
                <div>
                    <button type="button" title="Create New Post" onClick={handleMain}>Main</ button>
                </div>
            </div>
            <div style={{display: "flex", width: "100%", justifyContent: "center", marginTop: "100px", background: "#b6f486"}}>
                <div style={{display: "flex", width: "100%", justifyContent: "space-between", flexDirection: "row"}}>
                    <div style={{display: "flex", justifyContent: "space-between", flexDirection: "row"}}>
                        <label for="followers">Followers</label>
                        <select name="followers" id="followers">
                            <option value="lionel">Lionel</option>
                            <option value="yuan">Yuan</option>
                            <option value="zairui">Zairui</option>
                        </select>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <h2>My Name</h2>
                        <img src="https://picsum.photos/200/304" />
                        <t>My info</t>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between", flexDirection: "row"}}>
                        <label for="following">Following</label>
                        <select name="following" id="following">
                            <option value="lionel">Lionel</option>
                            <option value="yuan">Yuan</option>
                            <option value="zairui">Zairui</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}