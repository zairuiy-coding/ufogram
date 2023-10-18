import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './views/Login';
import Signup from './views/Signup';
import Main from './views/Main';
import UserProfile from './views/UserProfile';
import NewPost from './views/Newpost';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/newpost" element={<NewPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
