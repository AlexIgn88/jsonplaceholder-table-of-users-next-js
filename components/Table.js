import { useState } from 'react'
import CreateTr from '../components/CreateTr'
import CreateEditableTr from '../components/CreateEditableTr';

// import getByCompositeKey from '../includes/getByCompositeKey'

export default function Table({
    users, viewData, changeUsers, columns, sortCol, setSortCol, setUserId, setShowUserPosts
}) {
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

    // function sortOnClick(evt, array) {
    //     const
    //         theadCellText = evt.target.closest('th')?.innerText;

    //     if (!theadCellText) return;

    //     return changeUsers([...array.sort(
    //         typeof getByCompositeKey(array[0], theadCellText) === 'string'
    //             ? (a, b) => getByCompositeKey(a, theadCellText).localeCompare(getByCompositeKey(b, theadCellText))
    //             : (a, b) => getByCompositeKey(a, theadCellText) - getByCompositeKey(b, theadCellText)
    //     )]);
    // }

    return (
        <table className='sorted-table'>
            {/* <thead onClick={evt => sortOnClick(evt, viewData)}> */}
            <thead>
                <tr onClick={evt => {
                    const index = evt.target.closest('th')?.cellIndex;
                    switch (true) {
                        case Math.abs(sortCol) - 1 !== index:
                            setSortCol(index + 1);
                            return;
                        case sortCol - 1 === index:
                            setSortCol(-sortCol);
                            return;
                        case -sortCol - 1 === index:
                            setSortCol(0);
                            return;
                    }
                }
                }>
                    {/* <th>id</th>
                    <th>name</th>
                    <th>email</th>
                    <th>address.city</th>
                    <th>phone</th>
                    <th>website</th>
                    <th>company.name</th>
                    <th>Action</th> */}
                    {columns?.map((el, i) =>
                        <th key={el.name} className={
                            el.name != 'Action'
                            ? (Math.abs(sortCol) - 1 === i ? 'sort ' : '') + (-sortCol - 1 === i ? ' desc' : '')
                            : null
                        }>{el.name}
                        </th>)
                    }
                </tr>
            </thead>
            <tbody onDoubleClick={evt => {
                const userId = evt.target.closest('tr')?.dataset.id;
                if (!userId) return;
                setUserId(userId);
                setShowUserPosts(false);
            }}
            >
                {viewData.map(user => {
                    return editContactId === user.id
                        ? <CreateEditableTr
                            key={user.id}
                            users={viewData}
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
}