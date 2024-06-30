/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getUsers from '../api/user';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('zairuiy');
  const [password, setPassword] = useState('1234567');
  const [error, setError] = useState('');

  async function handleLogin() {
    try {
      const response = await getUsers();
      let userId = 0;

      if (response !== -1 && response.status === 200) {
        let userFound = false;
        for (let i = 0; i < response.data.users.length; i += 1) {
          if (response.data.users[i].username === username
            && response.data.users[i].password === password) {
            userFound = true;
            userId = response.data.users[i]._id;
            break;
          }
        }
        if (userFound) {
          navigate('/main', { state: { userId, username, users: response.data.users } });
        } else {
          setError('Invalid username or password');
        }
      } else {
        setError('Failed to fetch users');
      }
    } catch (loginError) {
      setError('Login error, please try again');
    }
  }

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-rose-quartz">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-space-cadet" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>UFOgram</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <label htmlFor="usernameBox" className="block text-lg font-medium text-space-cadet mb-2">
          Username:
          <input
            type="text"
            name="Username"
            id="usernameBox"
            className="block w-full mt-1 p-2 border border-cadet-gray rounded-md shadow-sm focus:ring-space-cadet focus:border-space-cadet sm:text-sm"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor="passwordBox" className="block text-lg font-medium text-space-cadet mb-4">
          Password:
          <input
            type="password"
            name="Password"
            data-testid="passwordBox"
            className="block w-full mt-1 p-2 border border-cadet-gray rounded-md shadow-sm focus:ring-space-cadet focus:border-space-cadet sm:text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button
          type="button"
          title="Log in"
          className="w-full mt-4 p-2 bg-space-cadet text-white rounded-md shadow-sm transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-space-cadet"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          type="button"
          title="Sign up"
          className="w-full mt-2 p-2 bg-mountbatten-pink text-white rounded-md shadow-sm transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mountbatten-pink"
          onClick={handleSignup}
        >
          Signup
        </button>
      </div>
    </div>
  );
}
