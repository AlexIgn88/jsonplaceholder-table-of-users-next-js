import { useState, useEffect } from 'react';
import fetchData from '../includes/fetchData';
import CreateEditableTr from '../components/CreateEditableTr';
import Table from '../components/Table';
import UserDetailedInformation from '../components/UserDetailedInformation';
import { Img, Email, Phone, Site } from '../components/cell-wrappers';

export default function TableOfUsers() {
    const
        api = "https://jsonplaceholder.typicode.com/users",
        [users, setUsers] = useState(null),
        [error, setError] = useState(null),
        [userId, setUserId] = useState(null),
        [showUserPosts, setShowUserPosts] = useState(false),
        [sortCol, setSortCol] = useState(0),
        [filterValue, setFilter] = useState(''),
        columns = [
            { name: 'Id', getVal: obj => obj.id },
            { name: 'Photo', getVal: obj => obj.id, wrap: Img },
            { name: 'Name', getVal: obj => obj.name },
            { name: 'Email', getVal: obj => obj.email, wrap: Email },
            { name: 'Address city', getVal: obj => obj.address?.city },
            { name: 'Phone', getVal: obj => obj.phone, wrap: Phone },
            { name: 'Website', getVal: obj => obj.website, wrap: Site },
            { name: 'Company name', getVal: obj => obj.company?.name },
            { name: 'Action', getVal: _ => '' }
        ];
    let viewData = users;

    useEffect(() => {
        fetchData(api, setUsers, setError);
    }, []);

    if (sortCol) {
        const
            { getVal } = columns[Math.abs(sortCol) - 1];
        viewData.sort((a, b) => {
            switch (true) {
                case (typeof getVal(a) === 'string' && typeof getVal(b) === 'string'):
                    return Math.sign(sortCol) * getVal(a).localeCompare(getVal(b));
                case (typeof getVal(a) === 'number' && typeof getVal(b) === 'number'):
                    return Math.sign(sortCol) * getVal(a) - getVal(b);
                default:
                    return;
            }
        });
    }

    if (filterValue) {
        viewData = viewData.filter(obj => columns
            .map(col => col.getVal(obj)?.toString().toLowerCase())
            .some(str => str?.includes(filterValue.toLowerCase())));
    }

    if (error) return <div className="error">Oшибка {error.message}</div>;
    if (users) return (
        <div className='table-of-users'>
            <div className='filter'>
                <span>Search:</span><input type="search" value={filterValue} placeholder='Enter a value to search' onInput={evt => setFilter(evt.target.value)}></input>
            </div>
            <Table
                users={users}
                viewData={viewData}
                changeUsers={setUsers}
                columns={columns}
                sortCol={sortCol}
                setSortCol={setSortCol}
                setUserId={setUserId}
                setShowUserPosts={setShowUserPosts}
            />
            <div className="inputs">
                <h3>Add new user:</h3>
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
            </div>
            {userId && <UserDetailedInformation
                userId={userId}
                showUserPosts={showUserPosts}
                setShowUserPosts={setShowUserPosts}
            />}
        </div>
    );
}