import CreateTr from '../components/CreateTr'
import getByCompositeKey from '../components/getByCompositeKey'

export default function CreateTable({ users, changeUsers, currentUser, changeCurrentUser, setUserId }) {
    return (
        <table>
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
            }
            }>
                {users.map(user => <CreateTr
                    key={user.id}
                    tr={user}
                    changeUsers={changeUsers}
                    changeCurrentUser={changeCurrentUser}
                />)}
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