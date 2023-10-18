import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import register from '../api/registration';
import getUsers from '../api/user';

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    // console.log('User info', username, password);
    const response = await getUsers();
    for (let i = 0; i < response.data.length; i += 1) {
      if (response.data[i].username === username) {
        return;
      }
    }
    try {
      const status = await register(username, password);
      // console.log('Status', status);
      if (status === 201) {
        navigate('/login');
      }
    } catch (err) {
      // console.log('Register error');
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
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <div style={{
        display: 'flex', justifyContent: 'center', position: 'fixed', width: '100%', background: '#8769b6',
      }}
      >
        <h1>UFOgram Signup</h1>
      </div>
      <div style={{
        display: 'flex', width: '12%', marginTop: '100px', flexDirection: 'column',
      }}
      >
        <label htmlFor="Username">
          Username:
          <input type="text" name="Username" value={username} onChange={handleUsernameChange} />
        </label>
        <label htmlFor="Password">
          Password:
          <input type="password" name="Password" data-testid="passwordBox" value={password} onChange={handlePasswordChange} />
        </label>
        <button type="button" id="sign_up" title="Sign up" onClick={handleSignup}>Signup</button>
        <button type="button" title="Log in" onClick={handleLogin} style={{ color: '#808080' }}>Login</button>
      </div>
    </div>
  );
}

export default Signup;
