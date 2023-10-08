import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';

function Login() {
    // if account does not exist, retry or jump to registration page
    // if password incorrect, retry, block if wrong for 3 times

    const navigate = useNavigate();

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState(''); // State to store authentication error message

    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    
    const handleLogin = async () => {
        try {
            // Make an API call to your backend for authentication
            const response = await fetch('/api/login/{username}', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                setLoggedIn(true);
                navigate('/main');
            } else {
                // Authentication failed, set error message
                setError('Invalid authentication. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    function handleUsernameChange(unameEvent) {
        setUsername(unameEvent.target.value);
    }

    function handlePasswordChange(passwdEvent) {
        setPassword(passwdEvent.target.value);
    }

    return (
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
            <div style={{display: "flex", justifyContent: "center", position: "fixed", width: "100%", background: "#8769b6"}}>
                <h1>UFOgram</h1>
            </div>
            <div style={{display: "flex", width: "12%", marginTop: "100px", flexDirection: "column"}}>
                <label htmlFor='Username'>Username: </label>
                <input type="text" name="Username" value={username} onChange={handleUsernameChange}/>
                <label htmlFor='Password'>Password: </label>
                <input type="password" name="Password" value={password} onChange={handlePasswordChange}/>
                <button type="button" title="Log in" onClick={handleLogin}>Login</ button>
                <button type="button" title="Sign up" onClick={handleSignup} style={{color: "#808080"}}>Signup</ button>
            </div>
        </div>
    );
};

export default Login;


