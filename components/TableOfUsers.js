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
        [userId, setUserId] = useState(null),
        [showUserPosts, setShowUserPosts] = useState(false),

        [filteredUsers, setfilteredUsers] = useState(null);
    let viewData = users;
    if (filteredUsers) viewData = filteredUsers;

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
                            handleEditFormSubmit={user => setUsers([...users, user])}
                            handleCancelClick={null}
                        />
                    </tbody>
                </table>
                <Filter
                    users={users}
                    setfilteredUsers={setfilteredUsers}
                />
            </div>
            <Table
                users={viewData}
                changeUsers={filteredUsers ? setfilteredUsers : setUsers}
                setUserId={userId => setUserId(userId)}
                setShowUserPosts={showUserPosts => setShowUserPosts(showUserPosts)}
            />
            {userId && <UserDetailedInformation
                userId={userId}
                showUserPosts={showUserPosts}
                setShowUserPosts={showUserPosts => setShowUserPosts(showUserPosts)}
            />}
        </div>
    );
}