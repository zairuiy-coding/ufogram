import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import getUsers from '../api/user';

export default function Login() {
  // if account does not exist, retry or jump to registration page
  // if password incorrect, retry, block if wrong for 3 times

//   const navigate = useNavigate();

  // const [loggedIn, setLoggedIn] = useState(false);
  // const [error, setError] = useState(''); // State to store authentication error message

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [userId, setUserId] = useState(0);

  async function handleLogin() {
    try {
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

      if (response.status === 200) {
        let userFound = false;

        for (let i = 0; i < response.data.length; i += 1) {
          if (response.data[i].username === username && response.data[i].password === password) {
            console.log(response.data[i].id);
            userFound = true;
            userId = response.data[i].id;
            // setUserId(response.data[i].id);
            break;
          }
        }   
        if (userFound) {
          // setLoggedIn(true);
          console.log(userId);
          render (
          <Navigate to='main' state={{ userId, username, users: response.data }} />
          );
        //   navigate('/main', { state: { userId, username, users: response.data } });
        }
      } else {
        // Authentication failed, set error message
        // setError('Invalid user list. Please try again.');
      }
    } catch (error) {
    //   setError('Error during login:', error);
      console.log('Login error');
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
        <label htmlFor="Username">Username: </label>
        <input type="text" name="Username" onChange={handleUsernameChange} />
        <label htmlFor="Password">Password: </label>
        <input type="password" name="Password" onChange={handlePasswordChange} />
        <button type="button" title="Log in" onClick={handleLogin}>Login</button>
        <button type="button" title="Sign up" onClick={handleSignup} style={{ color: '#808080' }}>Signup</button>
      </div>
    </div>
  );
}
