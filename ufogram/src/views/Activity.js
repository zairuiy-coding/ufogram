import React, { useState } from 'react';
import Post from './Post';

export default function Activity() {
    return (
        <div style={{display: "flex", justifyContent: "center", flexDirection: "column", background: "#b6f486", width: "100%"}}>
            <Post username="Lionel" imageUrl="https://picsum.photos/200/302" caption="Howdy"/>
            <Post username="Yuan" imageUrl="https://picsum.photos/200/301" caption="Hello"/>
            <Post username="Zairui" imageUrl="https://picsum.photos/200/303" caption="Hi"/>
        </div>
    )
}