import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import getUser from '../api/getUser';

async function GetFollowing() {
    const location = useLocation();
    try {
        const response = await getUser(location.state.userId);
        if (response.status === 200) {
            const following = response.data.following;
            return (
                <select name="following" id="following">
                {following.map(user => (
                    <option value={ user.username }>{ user.username }</option>
                  ))
                }
                </select>
            )
        } else {
            // Authentication failed, set error message
            console.log('Invaliduser ID. Please try again.');
        }
    } catch (error) {
        console.error('getUser error', error);
    }
}

export default function Main() {
    const navigate = useNavigate();

    const location = useLocation();

    const [followed, setFollowed] = useState(false);

    const isMyself = location.state.self;

    let followingComponent;

    try {
        followingComponent = GetFollowing();
    } catch (err) {
        console.log("get floowing error");
    }

    const handleMain = () => {
        navigate('/main',  { state: { userId: location.state.userId, username: location.state.username, users: location.state.users } });
    };

    const handleFollow = (followEvent) => {
        if (followed) {
            followEvent.target.innerHTML = "Follow";
            setFollowed(false);
        } else {
            followEvent.target.innerHTML = "Unfollow";
            setFollowed(true);
        }
    };

    return (
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
            <div style={{display: "flex", justifyContent: "center", position: "fixed", width: "100%", background: "#8769b6"}}>
                <h1>Profile</h1>
                <div>
                    <button type="button" title="Create New Post" onClick={handleMain}>Main</ button>
                </div>
            </div>
            <div style={{display: "flex", width: "100%", justifyContent: "center", marginTop: "100px", background: "#b6f486"}}>
                <div style={{display: "flex", width: "100%", justifyContent: "space-between", flexDirection: "row"}}>
                    <div style={{display: "flex", justifyContent: "space-between", flexDirection: "row"}}>
                        <label for="followers">Followers</label>
                        <select name="followers" id="followers">
                            <option value="lionel">Lionel</option>
                            <option value="yuan">Yuan</option>
                            <option value="zairui">Zairui</option>
                        </select>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <h2>{ location.state.sName }</h2>
                        <img src="https://picsum.photos/200/304" />
                        <t>My info</t>
                        {/* Here for now, not for self. */}
                        { isMyself !== true &&
                            <button type="button" title="Follow/Unfollow" onClick={handleFollow}>Follow</button>
                        }
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between", flexDirection: "row"}}>
                        <label for="following">Following</label>
                        {/* <select name="following" id="following"> */}
                            {/* <option value="lionel">Lionel</option>
                            <option value="yuan">Yuan</option>
                            <option value="zairui">Zairui</option> */}
                            { followingComponent }
                        {/* </select> */}
                    </div>
                </div>  
            </div>
        </div>
    )
}