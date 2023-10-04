import React from 'react';

function handleLogin() {
    // if account does not exist, retry or jump to registration page
    // if password incorrect, retry, block if wrong for 3 times
    // if password correct, jump to Main_view
}

function handleSignup() {
    // ...
}

function Login() {
    return (
        <div>
            <input type="text" name="Username" />
            <input type="text" name="Password" />
            <button title="Log in" onClick = { handleLogin }/>
            <button title="Sign up" onClick = { handleSignup }/>
        </div>
    );
}

export default Login;