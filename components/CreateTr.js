export default function CreateTr({ tr, changeUsers, handleEditUser }) {

    const { id, name, email,
        address: { city: addressCity },
        phone, website, company: { name: companyName }
    } = tr;

    function handleDelUserbyId(id) {
        changeUsers((old) => {
            const index = old.findIndex((item) => id === item.id);
            old.splice(index, 1);
            return [...old];
        });
    }

    return <tr data-id={id}>
        <td>№ {id}</td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{addressCity}</td>
        <td>{phone}</td>
        <td>{website}</td>
        <td>{companyName}</td>

        <td><button onClick={evt => handleEditUser(evt, tr)}>Edit</button>
            <button onClick={() => handleDelUserbyId(tr.id)}>Delete</button>
        </td>
    </tr>
}