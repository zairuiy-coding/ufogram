import React, { useState } from 'react';
import Activity from './Activity';
import { useNavigate } from 'react-router-dom';
import { useLocation} from 'react-router-dom';

export default function Main() {

    const navigate = useNavigate();

    const location = useLocation();

    const [usernameToSearch, setUsernameToSearch] = useState('');

    const handleMyProfile = () => {
        navigate('/userprofile', { state: { userId: location.state.userId, username: location.state.username, self: true, sName:  location.state.username, users: location.state.users } });
    };

    const handleCreateNewPost = () => {
        navigate('/newpost', { state: { userId: location.state.userId, username: location.state.username, users: location.state.users } });
    };

    const handleSearchUserName = (usernameEvent) => {
        setUsernameToSearch(usernameEvent.target.value);
    }

    const handleSearchUser = () => {
        for (let i = 0; i < location.state.users.length; i++) {
            if (location.state.users[i].username === usernameToSearch) {
                navigate('/userprofile', { state: { userId: location.state.userId, username: location.state.username, self: location.state.username ===  usernameToSearch, sName: usernameToSearch, users: location.state.users } });
                return;
            }
        }
    }


    return (
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
            <div style={{display: "flex", justifyContent: "center", position: "fixed", width: "100%", background: "#8769b6"}}>
                <h1>UFOgram { location.state.username }</h1>
                <div style={{ display: "flex", flexDirection: "row" }}>
                <input type="text" name="SearchUser" onChange={ handleSearchUserName }/>
                <button type="button" title="searchUser" onClick={ handleSearchUser }>Search</ button>
                </div>
                <div>
                    <button type="button" title="My Profile" onClick={handleMyProfile}>My Profile</ button>
                    <button type="button" title="Create New Post" onClick={handleCreateNewPost}>Create New Post</ button>
                </div>
            </div>
            <div style={{display: "flex", width: "100%", justifyContent: "center", marginTop: "80px"}}>
                <Activity />
            </div >
        </div>
    )
}