import { useState, useEffect } from 'react';
import fetchData from '../includes/fetchData';

export default function UserPosts({ userId }) {
    // console.log('UserPosts. userId- ', userId);

    const
        [userPosts, setUserPosts] = useState(null),
        [error, setError] = useState(null),
        api = "https://jsonplaceholder.typicode.com/users/" + userId + "/posts";

    // console.log('RENDER UserPosts'); 

    useEffect(() => {
        fetchData(api, setUserPosts, setError);
    }, [userId]);

    if (error) return <div className="error">Oшибка {error.message}</div>;
    if (userPosts)
        return (
            <div className="posts">
                {userPosts.map(post =>
                    <div key={post.id}>
                        <h6>Post №{post.id}</h6>
                        <h5>{post.title}</h5>
                        <p>{post.body}</p>
                    </div>
                )}
            </div>
        );
}