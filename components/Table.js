import { useState } from 'react'
import CreateTr from '../components/CreateTr'
import CreateEditableTr from '../components/CreateEditableTr';
import getByCompositeKey from '../includes/getByCompositeKey'

export default function Table({ users, changeUsers, currentUser, changeCurrentUser, setUserId, setShowUserPosts }) {
    const [editContactId, setEditContactId] = useState(null);

    function handleEditUser(evt, user) {
        evt.preventDefault();
        setEditContactId(user.id);
    }

    function handleEditFormSubmit(obj) {
        const newContacts = [...users];
        const index = users.findIndex((user) => user.id === editContactId);
        newContacts[index] = Object.assign(newContacts[index], obj);
        changeUsers(newContacts);
        setEditContactId(null);
    };

    function handleCancelClick() {
        setEditContactId(null);
    };

    console.log('editContactId- ', editContactId);

    return (
        <table className='sort'>
            <thead onClick={evt => sortOnClick(evt, users)}>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>email</th>
                    <th>address.city</th>
                    <th>phone</th>
                    <th>website</th>
                    <th>company.name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody onDoubleClick={evt => {
                const userId = evt.target.closest('tr')?.dataset.id;
                if (!userId) return;
                setUserId(userId);
                setShowUserPosts(false);
            }}
            >
                {users.map(user => {
                    return editContactId === user.id
                        ? <CreateEditableTr
                            key={user.id}
                            users={users}
                            tr={user}
                            handleEditFormSubmit={handleEditFormSubmit}
                            handleCancelClick={handleCancelClick}
                        />
                        : <CreateTr
                            key={user.id}
                            tr={user}
                            changeUsers={changeUsers}
                            handleEditUser={handleEditUser}
                        />
                })}
            </tbody>
        </table>
    );

    function sortOnClick(evt, array) {
        const
            theadCellText = evt.target.closest('th')?.innerText;

        if (!theadCellText) return;

        return changeUsers([...array.sort(
            typeof getByCompositeKey(array[0], theadCellText) === 'string'
                ? (a, b) => getByCompositeKey(a, theadCellText).localeCompare(getByCompositeKey(b, theadCellText))
                : (a, b) => getByCompositeKey(a, theadCellText) - getByCompositeKey(b, theadCellText)
        )]);
    }
}