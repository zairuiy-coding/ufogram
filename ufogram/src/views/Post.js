import React, { useState } from 'react';

function PostRender(props) {
    let [likes, setLikes] = useState(0);
    let [liked, setLiked] = useState(false);

    const likeButton = document.getElementById("likeButton");

    const handleLike = (() => {
        if (liked) {
            setLikes(likes - 1);
            setLiked(false);
            likeButton.innerHTML = "Like";
        } else {
            setLikes(likes + 1);
            setLiked(true);
            likeButton.innerHTML = "Unlike";

        }
    })
    return (
        <div style={{margin: "10px"}}>
            <div>{ props.username }</div>
            <img src={ props.imageUrl } alt='image_unloaded' />
            <div>{ props.caption }</div>
            <div>
                <button id="likeButton" onClick = { handleLike }>Like</button>  
            </div>
            <div>Likes: { likes }</div>
        </div>
    )
}

export default PostRender;