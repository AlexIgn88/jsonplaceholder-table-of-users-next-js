import { useState, useEffect } from 'react'
import Filter from '../components/Filter'
import AddNewUser from '../components/AddNewUser'
import CreateTable from '../components/CreateTable'
import ModalWindowForEditUser from '../components/ModalWindowForEditUser'

export default function FetchUsers() {
    const
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
        });

    useEffect(() => {
        async function go() {
            try {
                setError(null);
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                );
                if (!response.ok) throw new Error(response.status);
                setUsers(await response.json());
            } catch (err) {
                setError(err);
            }
        }
        go();
    }, []);
    if (error) return <div className="error">Oшибка {error.message}</div>;
    if (users) return (
        <>
            <div className="inputs">
                <Filter
                    users={users}
                    changeUsers={users => setUsers(users)}
                    inputValue={inputValue}
                    changeInputValue={inputValue => setInputValue(inputValue)}
                />
                <AddNewUser
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
            />
            <ModalWindowForEditUser
                changeUsers={users => setUsers(users)}
                currentUser={currentUser}
                changeCurrentUser={currentUser => setCurrentUser(currentUser)}
                inputValue={inputValue}
                changeInputValue={inputValue => setInputValue(inputValue)}
            />
        </>
    );
}