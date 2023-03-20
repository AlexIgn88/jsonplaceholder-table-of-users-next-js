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
    if (users) return <CreateTable users={users} />;
}

function CreateTable({ users }) {
    return (
        <table>
            <thead onClick={clickListener}>
                <tr>
                    <th data-sort-type="number">ID</th>
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

function clickListener(evt) {
    const
        theadCell = evt.target.closest('th'),
        n = theadCell.cellIndex,
        sortType = theadCell.dataset.sortType,
        table = theadCell.closest("table"),
        tbody = table.querySelector('tbody'),
        rows = [...tbody.rows],
        cmp = getCmpFunction(n, sortType);
    rows.sort(cmp);
    tbody.append(...rows);
}

function compare(compType, a, b) {
    switch (compType) {
        case "string": return a > b ? 1 : a == b ? 0 : -1;
        case "number": return +a - +b;
    }
}

function getCmpFunction(n, sortType) {
    return function (a, b) {
        return compare(sortType, a.cells[n].innerText, b.cells[n].innerText);
    }
}