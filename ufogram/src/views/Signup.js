import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import register from '../api/registration';
import getUsers from '../api/user';

function Signup() {
    // if account does not exist, retry or jump to registration page
    // if password incorrect, retry, block if wrong for 3 times
    // if password correct, jump to Main_view

    const navigate = useNavigate();

    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    const handleSignup = async () => {
        
        console.log('User info', username, password);
        const response = await getUsers();
        for (let i = 0; i < response.data.length; i++) {
                    
            if (response.data[i].username === username) {
                return;
            }
        }
        try {
            const status = await register(username, password);
            console.log('Status', status);
            if (status === 201) {
                navigate('/login');
            }
        } catch (err) {

        }
        
    }

    const handleLogin = () => {
        navigate('/login');
    }

    function handleUsernameChange(unameEvent) {
        setUsername(unameEvent.target.value);
    }

    function handlePasswordChange(passwdEvent) {
        setPassword(passwdEvent.target.value);
    }

    return (
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
            <div style={{display: "flex", justifyContent: "center", position: "fixed", width: "100%", background: "#8769b6"}}>
                <h1>UFOgram Signup</h1>
            </div>
            <div style={{display: "flex", width: "12%", marginTop: "100px", flexDirection: "column"}}>
                <label htmlFor='Username'>Username: </label>
                <input data-testID='uname' type="text" name="Username" value={username} onChange={handleUsernameChange}/>
                <label htmlFor='Password'>Password: </label>
                <input type="password" name="Password" value={password} onChange={handlePasswordChange}/>
                <button id='sign_up' title="Sign up" onClick={handleSignup}>Signup</button>
                <button title="Log in" onClick={handleLogin} style={{color: "#808080"}}>Login</button>
            </div>
        </div>
    );
}

export default Signup;

