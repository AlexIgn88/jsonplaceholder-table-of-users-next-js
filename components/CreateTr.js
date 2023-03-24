export default function CreateTr({ tr, changeUsers, changeCurrentUser }) {
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
                <td><button onClick={evt => openModalWindowForRename(tr)}>Edit</button><button onClick={evt => delUserbyID(tr.id)}>Delete</button></td>
            </tr>
        </>
    );

    function delUserbyID(id) {
        changeUsers((old) => {
            const index = old.findIndex((item) => id === item.id);
            old.splice(index, 1);
            return [...old];
        });
    }

    function openModalWindowForRename(tr) {
        const modalWindow = document.querySelector('.modal-window');

        changeCurrentUser(tr);
        if (getComputedStyle(modalWindow).display === 'none') modalWindow.classList.toggle('modal-window-hide');
    }
}