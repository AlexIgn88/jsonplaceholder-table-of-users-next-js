
import { useState, useEffect } from 'react'
import UserPosts from '../components/UserPosts'
import fetchData from '../components/fetchData'

export default function UserDetailedInformation({ userId, showUserPosts, setShowUserPosts }) {
    const
        [userDetailed, setUserDetailed] = useState(null),
        [error, setError] = useState(null),
        api = "https://jsonplaceholder.typicode.com/users/" + userId;

    //console.log('render UserDetailedInformation. userId- ', userId);
    console.log('UserDetailedInformation. showUserPosts- ', showUserPosts);

    useEffect(() => {
        setShowUserPosts(null);
        fetchData(api, setUserDetailed, setError);
    }, [userId]);

    if (error) return <div className="error">Oшибка {error.message}</div>;
    if (userDetailed) return (
        <>
            <div className='user-detailed'>
                <div className='info-of-user'>
                    <div>
                        <span>Name: </span>
                        <span>{userDetailed.name}</span></div>
                    <div>
                        <span>email: </span>
                        <span>{userDetailed.email}</span></div>
                    <div>
                        <span>Phone number: </span>
                        <span>{userDetailed.phone}</span></div>
                    <div>
                        <span>Address: </span>
                        <span>{userDetailed.address.city}, </span>
                        <span>{userDetailed.address.street}, </span>
                        <span>{userDetailed.address.suite}</span>
                    </div>
                    <div>
                        <span>Company name: </span>
                        <span>{userDetailed.company.name}</span></div>
                    <div><button onClick={evt => { setShowUserPosts(1) }}>Show posts</button></div>
                </div>
                <div className='photo-of-user'>{
                    [<img className='user-photo' key={userId} src={"https://fakeface.rest/face/view/" + userId} />
                    ]} 
                </div>
            </div>
            {!showUserPosts
                ? null
                : <UserPosts userId={userId} />
            }
        </>
    );
}