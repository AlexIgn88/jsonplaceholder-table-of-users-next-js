import { useState, useEffect } from 'react'
import fetchData from '../includes/fetchData'
import CreateEditableTr from '../components/CreateEditableTr';
import Filter from '../components/Filter'
import Table from '../components/Table'
import UserDetailedInformation from '../components/UserDetailedInformation'

export default function TableOfUsers() {
    const
        api = "https://jsonplaceholder.typicode.com/users",
        [users, setUsers] = useState(null),
        [error, setError] = useState(null),
        [currentUser, setCurrentUser] = useState(''),

        [filteredUsers, setfilteredUsers] = useState(null),
        [userId, setUserId] = useState(null),
        [showUserPosts, setShowUserPosts] = useState(false);
    console.log('TableOfUsers. userId- ', userId, 'showUserPosts- ', showUserPosts);

    console.log('RENDER TableOfUsers');

    console.log(users);

    useEffect(() => {
        fetchData(api, setUsers, setError);
    }, []);

    if (error) return <div className="error">Oшибка {error.message}</div>;
    if (users) return (
        <div className='table-of-users'>
            <div className="inputs">
                <table>
                    <tbody>
                        <CreateEditableTr
                            key={Date.now()}
                            users={users}
                            tr={{ name: '', email: '', address: { city: '' }, phone: '', website: '', company: { name: '' } }}
                            handleCancelClick={null}
                            handleEditFormSubmit={user => setUsers([...users, user])}
                        />
                    </tbody>
                </table>
                <Filter
                    users={users}
                    setfilteredUsers={setUsers}
                />
            </div>
            <Table
                users={users}
                changeUsers={users => setUsers(users)}
                currentUser={currentUser}
                changeCurrentUser={currentUser => setCurrentUser(currentUser)}
                setUserId={userId => setUserId(userId)}
                setShowUserPosts={showUserPosts => setShowUserPosts(showUserPosts)}
            />
            {!userId
                ? null
                : <UserDetailedInformation
                    userId={userId}
                    showUserPosts={showUserPosts}
                    setShowUserPosts={showUserPosts => setShowUserPosts(showUserPosts)}
                />
            }
        </div>
    );
}