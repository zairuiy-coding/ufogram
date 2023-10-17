import React, { useState } from 'react';

function PostRender(props) {
    let [likes, setLikes] = useState(0);
    let [liked, setLiked] = useState(false);

    // const likeButton = document.getElementById("likeButton");

    const handleLike = ((clickEvent) => {
        if (liked) {
            setLikes(likes - 1);
            setLiked(false);
            clickEvent.target.innerHTML = "Like";
        } else {
            setLikes(likes + 1);
            setLiked(true);
            clickEvent.target.innerHTML = "Unlike";

        }
    })
    return (
        <div style={{margin: "10px"}}>
            <div>{ props.username }</div>
            {
                props.imageUrl.includes("youtube") && <iframe width="560" height="315" src={ props.imageUrl }></iframe>
            }
            {
                !props.imageUrl.includes("youtube") && <img src={ props.imageUrl } alt='image_unloaded' />
            }
            <div>{ props.caption }</div>
            <div>
                <button id="likeButton" onClick = { handleLike }>Like</button>  
            </div>
            <div>Likes: { likes }</div>
        </div>
    )
}

export default PostRender;