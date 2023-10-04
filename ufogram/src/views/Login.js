import React from 'react';

function handleLogin() {
    // if account does not exist, retry or jump to registration page
    // if password incorrect, retry, block if wrong for 3 times
    // if password correct, jump to Main_view
}

function handleSignup() {
    // ...
}

export default function Login() {
    return (
        <div>
            <h1>UFOgram</h1>
            <div>
                <input type="text" name="Username" />
                <input type="text" name="Password" />
                <button title="Log in" onClick = { handleLogin }/>
                <button title="Sign up" onClick = { handleSignup }/>
            </div>
        </div>
    );
}