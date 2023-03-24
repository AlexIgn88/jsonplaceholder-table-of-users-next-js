export default function ModalWindowForEditUser({ changeUsers, currentUser, changeCurrentUser, inputValue, changeInputValue }) {
    

    function rewriteUser(id) {
        changeUsers((old) => {
            const index = old.findIndex((item) => id === item.id);
            old.splice(index, 1, currentUser);
            return [...old];
        });
    }

    return (
        <div className="modal-window modal-window-hide">
            <div className="notification">
                <div className="text">Change data</div>
                <button onClick={evt => {
                    changeCurrentUser((old) => {
                        old.name = inputValue.name;
                        old.email = inputValue.email;
                        old.address.city = inputValue.addressCity;
                        old.phone = inputValue.phone;
                        old.website = inputValue.website;
                        old.company.name = inputValue.companyName;
                        return old;
                    });
                    rewriteUser(currentUser.id);
                    document.querySelector('.modal-window').classList.toggle('modal-window-hide');
                }}>Apply all changes</button>
                <button onClick={
                    evt => document.querySelector('.modal-window').classList.toggle('modal-window-hide')
                }>Exit without saving
                </button>
                <div className="control-panel">User id: {currentUser.id}
                    <input
                        type="text"
                        className="change"

                        placeholder={currentUser.name}
                        onChange={(evt) => changeInputValue((old) => {
                            old.name = evt.target.value
                            return old;
                        })}
                    />

                    <button className="close-modal-window" onClick={evt => {
                        changeCurrentUser((old) => {
                            old.name = inputValue.name;
                            return old;
                        });
                        rewriteUser(currentUser.id);
                        document.querySelector('.modal-window').classList.toggle('modal-window-hide');
                    }}>Change name</button>

                    <input
                        type="text"
                        className="change"

                        placeholder={currentUser.email}
                        onChange={(evt) => changeInputValue((old) => {
                            old.email = evt.target.value
                            return old;
                        })}
                    />

                    <button className="close-modal-window" onClick={evt => {
                        changeCurrentUser((old) => {
                            old.email = inputValue.email;
                            return old;
                        });
                        rewriteUser(currentUser.id);
                        document.querySelector('.modal-window').classList.toggle('modal-window-hide');
                    }}>Change email</button>

                    <input
                        type="text"
                        className="change"

                        onChange={(evt) => changeInputValue((old) => {
                            old.addressCity = evt.target.value
                            return old;
                        })}
                    />

                    <button className="close-modal-window" onClick={evt => {
                        changeCurrentUser((old) => {
                            old.address.city = inputValue.addressCity;
                            return old;
                        });
                        rewriteUser(currentUser.id);
                        document.querySelector('.modal-window').classList.toggle('modal-window-hide');
                    }}>Change address.city</button>

                    <input
                        type="text"
                        className="change"

                        placeholder={currentUser.phone}
                        onChange={(evt) => changeInputValue((old) => {
                            old.phone = evt.target.value
                            return old;
                        })}
                    />

                    <button className="close-modal-window" onClick={evt => {
                        changeCurrentUser((old) => {
                            old.phone = inputValue.phone;
                            return old;
                        });
                        rewriteUser(currentUser.id);
                        document.querySelector('.modal-window').classList.toggle('modal-window-hide');
                    }}>Change phone</button>

                    <input
                        type="text"
                        className="change"

                        placeholder={currentUser.website}
                        onChange={(evt) => changeInputValue((old) => {
                            old.website = evt.target.value
                            return old;
                        })}
                    />

                    <button className="close-modal-window" onClick={evt => {
                        changeCurrentUser((old) => {
                            old.website = inputValue.website;
                            return old;
                        });
                        rewriteUser(currentUser.id);
                        document.querySelector('.modal-window').classList.toggle('modal-window-hide');
                    }}>Change website</button>

                    <input
                        type="text"
                        className="change"

                        onChange={(evt) => changeInputValue((old) => {
                            old.companyName = evt.target.value
                            return old;
                        })}
                    />

                    <button className="close-modal-window" onClick={evt => {
                        changeCurrentUser((old) => {
                            old.company.name = inputValue.companyName;
                            return old;
                        });
                        rewriteUser(currentUser.id);
                        document.querySelector('.modal-window').classList.toggle('modal-window-hide');
                    }}>Change company.name</button>
                </div>
            </div>
        </div>
    );
}