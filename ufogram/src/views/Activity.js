import React, { useState, useEffect } from 'react';
import Post from './Post';
import getAllPosts from '../api/getAllPosts';



export default function Activity() {

    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        async function fetchAllPosts() {
            try {
                const response = await getAllPosts();
                if (response.status === 200) {
                    console.log(response.data);
                    setAllPosts(response.data.reverse()); // reverse the post list
                } else {
                    console.log('');
                }
            } catch (error) {
                console.error('getUser error', error);
            }
        }
        fetchAllPosts();
    }, []);


    return (
        <div style={{display: "flex", justifyContent: "center", flexDirection: "column", background: "#b6f486", width: "100%"}}>
            {/* <Post username="Lionel" imageUrl="https://picsum.photos/200/302" caption="Howdy"/>
            <Post username="Yuan" imageUrl="https://picsum.photos/200/301" caption="Hello"/>
            <Post username="Zairui" imageUrl="https://picsum.photos/200/303" caption="Hi"/> */}

            {allPosts.map(post => (
                        <Post username={ post.author.username } imageUrl={post.fileURL} caption={post.caption} />
                    ))
            }
        </div>
    )
}