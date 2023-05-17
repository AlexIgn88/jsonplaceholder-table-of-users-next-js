import { useState, useEffect, memo } from 'react';
import UserPosts from '../components/UserPosts';
import fetchData from '../includes/fetchData';

const MemoizedUserPosts = memo(UserPosts);

export default function UserDetailedInformation({ userId, showUserPosts, setShowUserPosts }) {
    const
        [userDetailed, setUserDetailed] = useState(null),
        [error, setError] = useState(null),
        api = "https://jsonplaceholder.typicode.com/users/" + userId;

    // console.log('UserDetailedInformation. userId- ', userId, 'showUserPosts- ', showUserPosts);

    useEffect(() => {
        fetchData(api, setUserDetailed, setError);
    }, [userId]);

    // console.log('RENDER UserDetailedInformation');

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
                    <div><button onClick={() => setShowUserPosts(true)}>Show posts</button></div>
                </div>
                <div className='photo-of-user'>{
                    //fakeface.rest к сожалению, последнее время не всегда работает. Добавил альтернативный
                    // [<img className='user-photo' key={userId} src={"https://fakeface.rest/face/view/" + userId} alt={'photo'}/>  
                    // ]}
                    [<img className='user-photo' key={userId} src={`https://randomuser.me/api/portraits/men/${userId}.jpg`} alt={'photo'} />
                    ]}
                </div>
            </div>
            {showUserPosts && <MemoizedUserPosts userId={userId} />}
        </>
    );
}