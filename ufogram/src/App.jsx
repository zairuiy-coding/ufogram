import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainNavbar from './components/MainNavbar'; // Ensure this is imported correctly
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';
import Main from './views/Main';
import UserProfile from './views/UserProfile';
import NewPost from './views/Newpost';
import Editpost from './views/Editpost';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={(
              <>
                <Navbar />
                <Login />
              </>
            )}
          />
          <Route
            path="/signup"
            element={(
              <>
                <Navbar />
                <Signup />
              </>
            )}
          />
          <Route
            path="/main"
            element={(
              <>
                <MainNavbar />
                <Main />
              </>
            )}
          />
          <Route
            path="/userprofile"
            element={(
              <>
                <MainNavbar />
                <UserProfile />
              </>
            )}
          />
          <Route
            path="/newpost"
            element={(
              <>
                <MainNavbar />
                <NewPost />
              </>
            )}
          />
          <Route
            path="/editpost"
            element={(
              <>
                <MainNavbar />
                <Editpost />
              </>
            )}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
