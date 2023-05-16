import { useState } from 'react';
import CreateEditableTr from '../components/CreateEditableTr';

export default function Table({
    users, viewData, changeUsers, columns, sortCol, setSortCol, setUserId, setShowUserPosts
}) {
    const [editContactId, setEditContactId] = useState(null);

    function handleEditUser(evt, user) {
        evt.preventDefault();
        setEditContactId(user.id);
    }

    function handleDelUserbyId(id) {
        changeUsers((old) => {
            const index = old.findIndex((item) => id === item.id);
            old.splice(index, 1);
            return [...old];
        });
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

    return (
        <table className='sorted-table'>
            <thead>
                <tr onClick={evt => {
                    if (!evt.target.closest('th')) return;
                    const index = evt.target.closest('th')?.cellIndex;
                    if (columns[index].name === 'Photo' || columns[index].name === 'Action') return;

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
                }}>
                    {columns?.map((el, i) =>
                        <th key={el.name} className={
                            (Math.abs(sortCol) - 1 === i ? 'sort ' : '') + (-sortCol - 1 === i ? ' desc' : '')
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
                        : <tr key={user.id} data-id={user.id}>
                            {columns.map(col => <td key={col.name} title={"double click to show details"}>
                                {col.wrap
                                    ? <col.wrap value={col.getVal(user)} />
                                    : col.name === 'Action'
                                        ? <>
                                            <button onClick={evt => handleEditUser(evt, user)}>&#9998; Edit</button>
                                            <button onClick={() => handleDelUserbyId(user.id)}>&#128465; Delete</button>
                                        </>
                                        : col.getVal(user)
                                }
                            </td>
                            )}
                        </tr>
                })}
            </tbody>
        </table>
    );
}