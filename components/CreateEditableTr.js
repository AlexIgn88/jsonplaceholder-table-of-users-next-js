import { useState } from 'react';

export default function CreateEditableTr({ tr, handleEditFormSubmit, handleCancelClick }) {

    const
        [name, setName] = useState(tr.name),
        [email, setEmail] = useState(tr.email),
        [addressCity, setAddressCity] = useState(tr.address.city),
        [website, setWebsite] = useState(tr.website),
        [phone, setPhone] = useState(tr.phone),
        [companyName, setCompanyName] = useState(tr.company.name);

    return <tr>
        <td><input type='text' placeholder='Enter a name' name='name' value={name} onChange={evt => setName(evt.target.value)}></input></td>
        <td><input type='text' placeholder='Enter an email' name='email' value={email} onChange={evt => setEmail(evt.target.value)}></input></td>
        <td><input type='text' placeholder='Enter an address' name='addressCity' value={addressCity} onChange={evt => setAddressCity(evt.target.value)}></input></td>
        <td><input type='text' placeholder='Enter an phone' name='phone' value={phone} onChange={evt => setPhone(evt.target.value)}></input></td>
        <td><input type='text' placeholder='Enter an website' name='website' value={website} onChange={evt => setWebsite(evt.target.value)}></input></td>
        <td><input type='text' placeholder='Enter an company-name' name='company.name' value={companyName} onChange={evt => setCompanyName(evt.target.value)} ></input></td>

        <td>
            <button type='submit' onClick={_ => handleEditFormSubmit({ name, email, address: { city: addressCity }, website, phone, company: { name: companyName } })}>Save</button>
            <button type='button' onClick={handleCancelClick}>Cancel</button>
        </td>
    </tr>
}