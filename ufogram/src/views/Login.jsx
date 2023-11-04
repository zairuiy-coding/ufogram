import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getUsers from '../api/user';

export default function Login() {
  // if account does not exist, retry or jump to registration page
  // if password incorrect, retry, block if wrong for 3 times

  const navigate = useNavigate();

  // const [loggedIn, setLoggedIn] = useState(false);
  // const [error, setError] = useState(''); // State to store authentication error message

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [userId, setUserId] = useState(0);

  async function handleLogin() {
    try {
      console.log('start log in');
      // Make an API call to your backend for authentication
      // const response = await axios.get('http://localhost:3000/Users', {
      //     method: 'GET',
      //     headers: {
      //         'Content-Type': 'application/json',
      //         'Cache-Control': 'no-cache',
      //         'Pragma': 'no-cache',
      //         'Expires': '0'
      //     },
      // });

      const response = await getUsers();

      let userId = 0;

      if (response !== -1 && response.status === 200) {
        let userFound = false;
        console.log(response);
        for (let i = 0; i < response.data.users.length; i += 1) {
          console.log(i);
          if (response.data.users[i].username === username
            && response.data.users[i].password === password) {
            // eslint-disable-next-line no-underscore-dangle
            console.log(response.data.users[i]._id);
            userFound = true;
            // eslint-disable-next-line no-underscore-dangle
            userId = response.data.users[i]._id;
            // setUserId(response.data[i].id);
            break;
          }
        }
        if (userFound) {
          // setLoggedIn(true);
          console.log(userId);
          console.log(username);
          console.log(response.data.users);
          navigate('/main', { state: { userId, username, users: response.data.users } });
        //   console.log('naviate successfully');
        }
      } else {
        // Authentication failed, set error message
        // setError('Invalid user list. Please try again.');
      }
    } catch (error) {
    //   setError('Error during login:', error);
    //   console.log('Login error');
    }
  }

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
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <div style={{
        display: 'flex', justifyContent: 'center', position: 'fixed', width: '100%', background: '#8769b6',
      }}
      >
        <h1>UFOgram</h1>
      </div>
      <div style={{
        display: 'flex', width: '12%', marginTop: '100px', flexDirection: 'column',
      }}
      >
        <label htmlFor="usernameBox">
          Username:
          <input type="text" name="Username" id="usernameBox" onChange={handleUsernameChange} />
        </label>
        <label htmlFor="passwordBox">
          Password:
          <input type="password" name="Password" data-testid="passwordBox" onChange={handlePasswordChange} />
        </label>

        <button type="button" title="Log in" onClick={handleLogin}>Login</button>
        <button type="button" title="Sign up" onClick={handleSignup} style={{ color: '#808080' }}>Signup</button>
      </div>
    </div>
  );
}
