import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './views/Login';
import Signup from './views/Signup';
import Main from './views/Main';
import UserProfile from './views/UserProfile';
import NewPost from './views/Newpost';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/newpost" element={<NewPost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
