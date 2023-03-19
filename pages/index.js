import { useState, useEffect } from 'react'

export default function FetchUser() {
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
            <thead>
                <tr>
                    <th>ID</th>
                    <th>name</th>
                    <th>email</th>
                    <th>address.city</th>
                    <th>phone</th>
                    <th>website</th>
                    <th>company.name</th>
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