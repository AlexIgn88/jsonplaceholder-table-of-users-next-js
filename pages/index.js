import { useState, useEffect } from 'react'

export default function FetchUsers() {
    const
        [users, setUsers] = useState(null),
        [error, setError] = useState(null);
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
    if (users) return <CreateTable users={users} changeUsers={users => setUsers(users)} />;
}

function CreateTable({ users, changeUsers }) {
    return (
        <table>
            <thead onClick={evt => sortOnclick(evt, users)}>
                <tr>
                    <th data-sort-type="number">id</th>
                    <th data-sort-type="string">name</th>
                    <th data-sort-type="string">email</th>
                    <th data-sort-type="string">address.city</th>
                    <th data-sort-type="string">phone</th>
                    <th data-sort-type="string">website</th>
                    <th data-sort-type="string">company.name</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => <CreateTr key={user.id} tr={user} />)}
            </tbody>
        </table>
    );

    function sortOnclick(evt, users) {
        const
            theadCell = evt.target.closest('th'),
            theadCellText = theadCell.innerText,
            sortType = theadCell.dataset.sortType;
        let result;

        switch (sortType) {
            case "string": result = [...users.sort((a, b) => a[theadCellText].localeCompare(b[theadCellText]))];
                break;
            case "number": result = [...users.sort((a, b) => +a[theadCellText] - +b[theadCellText])];
                break;
        }
        return changeUsers(result);
    }
}

function CreateTr({ tr }) {
    const { id, name, email,
        address: { city: addressCity },
        phone, website, company: { name: companyName }
    } = tr;
    return (
        <>
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{addressCity}</td>
                <td>{phone}</td>
                <td>{website}</td>
                <td>{companyName}</td>
            </tr>
        </>
    );
}