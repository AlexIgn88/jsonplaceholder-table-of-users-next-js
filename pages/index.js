import { useState, useEffect } from 'react'
import fetchData from '../components/fetchData'
import Filter from '../components/Filter'
import AddNewUser from '../components/AddNewUser'
import CreateTable from '../components/CreateTable'
import ModalWindowForEditUser from '../components/ModalWindowForEditUser'
import UserDetailedInformation from '../components/UserDetailedInformation'

export default function TableOfUsers() {
    const
        api = "https://jsonplaceholder.typicode.com/users",
        [users, setUsers] = useState(null),
        [error, setError] = useState(null),
        [currentUser, setCurrentUser] = useState(''),
        [inputValue, setInputValue] = useState({
            filter: '',
            id: '',
            name: '',
            email: '',
            addressCity: '',
            phone: '',
            website: '',
            companyName: ''
        }),

        [userId, setUserId] = useState(null),
        [showUserPosts, setShowUserPosts] = useState(false);
    console.log('TableOfUsers. userId- ', userId, 'showUserPosts- ', showUserPosts);

    useEffect(() => {
        fetchData(api, setUsers, setError);
    }, []);
    if (error) return <div className="error">Oшибка {error.message}</div>;
    if (users) return (
        <div className='table-of-users'>
            <div className="inputs">
                <AddNewUser
                    users={users}
                    changeUsers={users => setUsers(users)}
                    inputValue={inputValue}
                    changeInputValue={inputValue => setInputValue(inputValue)}
                />
                <Filter
                    users={users}
                    changeUsers={users => setUsers(users)}
                    inputValue={inputValue}
                    changeInputValue={inputValue => setInputValue(inputValue)}
                />
            </div>
            <CreateTable
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
            <ModalWindowForEditUser
                changeUsers={users => setUsers(users)}
                currentUser={currentUser}
                changeCurrentUser={currentUser => setCurrentUser(currentUser)}
                inputValue={inputValue}
                changeInputValue={inputValue => setInputValue(inputValue)}
            />
        </div>
    );
    console.log('RENDER TableOfUsers');
}