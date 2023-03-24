
export default function AddNewUser({ users, changeUsers, inputValue, changeInputValue }) {

    function generateIdForNewUser(arr) {
        let maxId = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id > maxId) {
                maxId = arr[i].id;
            }
        }
        return maxId + 1;
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Enter name"
                onChange={(evt) => changeInputValue((old) => {
                    old.name = evt.target.value
                    return old;
                })}
            />
            <input
                type="text"
                placeholder="Enter email"
                onChange={(evt) => changeInputValue((old) => {
                    old.email = evt.target.value
                    return old;
                })}
            />
            <input
                type="text"
                placeholder="Enter city"
                onChange={(evt) => changeInputValue((old) => {
                    old.addressCity = evt.target.value
                    return old;
                })}
            />
            <input
                type="text"
                placeholder="Enter phone"
                onChange={(evt) => changeInputValue((old) => {
                    old.phone = evt.target.value
                    return old;
                })}
            />
            <input
                type="text"
                placeholder="Enter website"
                onChange={(evt) => changeInputValue((old) => {
                    old.website = evt.target.value
                    return old;
                })}
            />
            <input
                type="text"
                placeholder="Enter name of company"
                onChange={(evt) => changeInputValue((old) => {
                    old.companyName = evt.target.value
                    return old;
                })}
            />
            <button onClick={evt => {
                changeUsers((old) => {
                    const user = {
                        "id": generateIdForNewUser(users),
                        "name": inputValue.name,
                        "username": "",
                        "email": inputValue.email,
                        "address": {
                            "street": "",
                            "suite": "",
                            "city": inputValue.addressCity,
                            "zipcode": "",
                            "geo": {
                                "lat": "",
                                "lng": ""
                            }
                        },
                        "phone": inputValue.phone,
                        "website": inputValue.website,
                        "company": {
                            "name": inputValue.companyName,
                            "catchPhrase": "",
                            "bs": ""
                        }
                    }
                    old.push(user);
                    return [...old];
                });
            }}
            >Add new user</button>
        </div>
    );
}