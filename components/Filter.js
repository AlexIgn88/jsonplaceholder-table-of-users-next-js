import { useState } from 'react';
import getByCompositeKey from '../includes/getByCompositeKey'

export default function Filter({ users, setfilteredUsers }) {

    const
        [filterValue, changeFilterValue] = useState('');

    function filterArrayByKey(arr, value) {
        let filteredArray = [],
            arreyOfKeys = ['id', 'name', 'email', 'address.city', 'phone', 'website', 'company.name'];
        for (let key of arreyOfKeys) {
            for (let i = 0; i < arr.length; i++) {
                if (getByCompositeKey(arr[i], key) == value) filteredArray.push(arr[i]);
            }
        }
        return filteredArray;
    }

    return (
        <div className='filter'>
            <input
                type="search"
                value={filterValue}
                onInput={(evt) => changeFilterValue(evt.target.value)}
            />
            <button onClick={evt => {
                setfilteredUsers((filterArrayByKey(users, filterValue)))
            }
            }>Filter</button>
            <button onClick={evt => {
                setfilteredUsers('')
            }
            }>Reset</button>
        </div>
    );
}