import React, { useState } from 'react';

function Login() {
    // if account does not exist, retry or jump to registration page
    // if password incorrect, retry, block if wrong for 3 times
    // if password correct, jump to Main_view

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {

    };

    const handleSignup = () => {

    }

    return (
        <div>
            <h1>UFOgram</h1>
            <div>
                <label htmlFor='Username'>Username:</label>
                <input type="text" name="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <br />
                <label htmlFor='Password'>Password:</label>
                <input type="password" name="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button title="Log in" onClick={handleLogin} />Login
                <button title="Sign up" onClick={handleSignup} />Signup
            </div>
        </div>
    );
}

export default Login;


