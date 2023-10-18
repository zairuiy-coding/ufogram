import React, { useState } from 'react';
import Activity from './Activity';
import { useNavigate } from 'react-router-dom';
import { useLocation} from 'react-router-dom';
import getUser from '../api/getUser';

export default function Main() {

    const navigate = useNavigate();

    const location = useLocation();

    const [usernameToSearch, setUsernameToSearch] = useState('');

    const handleMyProfile = () => {
        navigate('/userprofile', { state: { userId: location.state.userId, username: location.state.username, self: true, sName:  location.state.username, sId: location.state.userId, users: location.state.users, followed: true } });
    };

    const handleCreateNewPost = () => {
        console.log('Create New Post Handler Called');
        navigate('/newpost', { state: { userId: location.state.userId, username: location.state.username, users: location.state.users } });
    };

    const handleSearchUserName = (usernameEvent) => {
        setUsernameToSearch(usernameEvent.target.value);
    }

    const handleSearchUser = async () => {
        for (let i = 0; i < location.state.users.length; i++) {
            if (location.state.users[i].username === usernameToSearch) {
                console.log(location.state.users[i].id);
                const searchResponse = await getUser(location.state.users[i].id);
                for (let j = 0; j < searchResponse.data.followers.length; j++) {
                    if (searchResponse.data.followers[j].id === location.state.userId) {
                        navigate('/userprofile', { state: { userId: location.state.userId, username: location.state.username, self: location.state.username ===  usernameToSearch, sName: usernameToSearch, sId: location.state.users[i].id, users: location.state.users, followed: true } });
                        return;
                    }
                }
                navigate('/userprofile', { state: { userId: location.state.userId, username: location.state.username, self: location.state.username ===  usernameToSearch, sName: usernameToSearch, sId: location.state.users[i].id, users: location.state.users, followed: false } });
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