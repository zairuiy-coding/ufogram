import React, { useState } from 'react';

export default function(props) {
    let [likes, setLikes] = useState(0);
    let [liked, setLiked] = useState(false);

    const handleLike = (() => {
        if (liked) {
            setLikes(likes - 1);
            setLiked(false);
        } else {
            setLikes(likes + 1);
            setLiked(true);
        }
    })
    return (
        <div style={{margin: "10px"}}>
            <div>{ props.username }</div>
            <img src={ props.imageUrl }/>
            <div>{ props.caption }</div>
            <div>
                <button onClick = { handleLike }>Like</button>  
            </div>
            <div>Likes: { likes }</div>
        </div>
    )
}