import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import register from '../api/registration';
import getUsers from '../api/user';

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    const response = await getUsers();
    if (response === -1 || response.status !== 200) {
      setError('Failed to fetch users');
      return;
    }
    for (let i = 0; i < response.data.users.length; i += 1) {
      if (response.data.users[i].username === username) {
        setError('Username already exists');
        return;
      }
    }
    try {
      const response2 = await register(username, password);
      if (response2 !== -1 && response2 !== -2 && response2.status === 201) {
        navigate('/login');
      } else {
        setError('Failed to register');
      }
    } catch (err) {
      setError('Registration error, please try again');
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  function handleUsernameChange(unameEvent) {
    setUsername(unameEvent.target.value);
  }

  function handlePasswordChange(passwdEvent) {
    setPassword(passwdEvent.target.value);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-rose-quartz">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-space-cadet" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>UFOgram Signup</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <label htmlFor="usernameBox" className="block text-lg font-medium text-space-cadet mb-2">
          Username:
          <input
            type="text"
            name="Username"
            id="usernameBox"
            className="block w-full mt-1 p-2 border border-cadet-gray rounded-md shadow-sm focus:ring-space-cadet focus:border-space-cadet sm:text-sm"
            onChange={handleUsernameChange}
            value={username}
          />
        </label>
        <label htmlFor="passwordBox" className="block text-lg font-medium text-space-cadet mb-4">
          Password:
          <input
            type="password"
            name="Password"
            data-testid="passwordBox"
            className="block w-full mt-1 p-2 border border-cadet-gray rounded-md shadow-sm focus:ring-space-cadet focus:border-space-cadet sm:text-sm"
            onChange={handlePasswordChange}
            value={password}
          />
        </label>

        <button
          type="button"
          id="sign_up"
          title="Sign up"
          className="w-full mt-4 p-2 bg-space-cadet text-white rounded-md shadow-sm transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-space-cadet"
          onClick={handleSignup}
        >
          Signup
        </button>
        <button
          type="button"
          title="Log in"
          className="w-full mt-2 p-2 bg-mountbatten-pink text-white rounded-md shadow-sm transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mountbatten-pink"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Signup;
