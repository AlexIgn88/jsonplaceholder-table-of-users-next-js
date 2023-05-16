import { useState } from 'react';

export default function CreateEditableTr({ users, tr, handleEditFormSubmit, handleCancelClick }) {

    const
        [id, setId] = useState(tr.id || generateIdForNewUser(users)),
        [name, setName] = useState(tr.name),
        [email, setEmail] = useState(tr.email),
        [addressCity, setAddressCity] = useState(tr.address.city),
        [website, setWebsite] = useState(tr.website),
        [phone, setPhone] = useState(tr.phone),
        [companyName, setCompanyName] = useState(tr.company.name);

    function generateIdForNewUser(arr) {
        let maxId = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id > maxId) maxId = arr[i].id;
        }
        return maxId + 1;
    }

    return <tr className='editable'>
        <td>{id}</td>
        <td><img className="icon" src={`/computer-icons-user-clip-art-create.jpg`} alt={'photo'} /></td>
        <td><input type='text' placeholder='Enter a name' name='name' value={name} onChange={evt => setName(evt.target.value)}></input></td>
        <td><input type='text' placeholder='Enter an email' name='email' value={email} onChange={evt => setEmail(evt.target.value)}></input></td>
        <td><input type='text' placeholder='Enter an address' name='addressCity' value={addressCity} onChange={evt => setAddressCity(evt.target.value)}></input></td>
        <td><input type='text' placeholder='Enter an phone' name='phone' value={phone} onChange={evt => setPhone(evt.target.value)}></input></td>
        <td><input type='text' placeholder='Enter an website' name='website' value={website} onChange={evt => setWebsite(evt.target.value)}></input></td>
        <td><input type='text' placeholder='Enter an company-name' name='company.name' value={companyName} onChange={evt => setCompanyName(evt.target.value)} ></input></td>
        <td>
            <button type='submit' onClick={_ => handleEditFormSubmit({ id, name, email, address: { city: addressCity }, website, phone, company: { name: companyName } })}>&#128190; Save</button>
            {handleCancelClick && <button type='button' onClick={handleCancelClick}>&#128711; Cancel</button>}
        </td>
    </tr>
}