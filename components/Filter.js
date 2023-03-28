import getByCompositeKey from '../components/getByCompositeKey'

export default function Filter({ users, changeUsers, inputValue, changeInputValue }) {

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
            <div className="title">Filter</div>
            <input
                type="text"

                onInput={(evt) => changeInputValue((old) => {
                    old.filter = evt.target.value
                    return old;
                })
                }
            />
            <button onClick={evt => changeUsers(filterArrayByKey(users, inputValue.filter))}>Filter</button>
        </div>


    );
}