import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateTeamMutation } from '../features/teams/teamsApi';
import { useGetUsersQuery } from '../features/user/userApi';
import AsyncSelect from 'react-select/async';

const AddMemberModal = ({ open, control, members, teamId }) => {
    const [addMember, setAddMember] = useState({});
    const [defaultOptions, setDefaultOptions] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { data: users, isSuccess: getUsersSuccess } = useGetUsersQuery();
    const [updatedTeam] = useUpdateTeamMutation();
    const { email: loggedInUserEmail } = useSelector((state) => state.auth.user);

    //custume style
    const colourStyles = {
        control: styles => ({ ...styles, backgroundColor: '#0f172a', color: "#fff" }),
        option: styles => ({ ...styles, backgroundColor: '#0f172a', marginTop: "-4px", marginBottom: "-4px", }),

    };

    const debounceHandler = (fn, delay) => {
        let timerId;
        return (...args) => {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                fn(...args);
            }, delay);
        };
    };


    const doSearch = async (inputValue, callback) => {
        if (getUsersSuccess) {
            let loaderUsers = users
                .map((user) => ({ label: user.email.toLowerCase(), value: user.email.toLowerCase() }))
                .filter((option) => option.label.toLowerCase().includes(inputValue));
            callback(loaderUsers);
        }
    };

    const handleSearch = debounceHandler(doSearch, 500);


    const handleChange = (member) => {
        setAddMember(member);

        if (!members.includes(loggedInUserEmail)) {
            setError(true);
            setErrorMessage('Only members can add new member');
            return;
        }

        if (members.includes(member.value)) {
            setError(true);
            setErrorMessage('Member already exist');
        } else {
            setError(false);
            setErrorMessage('');
        }
    };

    useEffect(() => {
        if (getUsersSuccess) {
            setDefaultOptions(
                users
                    .filter((user) => !members.includes(user.email))
                    .map((user) => ({ label: user.email.toLowerCase(), value: user.email.toLowerCase() }))
                    .slice(0, 3)
            );
        }
    }, [getUsersSuccess, setDefaultOptions, members, users]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!addMember?.value?.trim().length || members.includes(addMember?.value)) return;
        updatedTeam({ id: teamId, members: [...members, addMember?.value] });
        control(false);
    };

    return (
        open && (
            <>
                <div
                    onClick={control}
                    className="fixed w-full h-full inset-0 z-10 bg-slate-800 bg-opacity-80 cursor-pointer"
                ></div>
                <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-slate-900 p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Add Member
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <AsyncSelect
                            styles={colourStyles}
                            isSearchable={true}
                            onChange={handleChange}
                            defaultOptions={defaultOptions}
                            backspaceRemovesValue={true}
                            loadOptions={(e) => handleSearch(e.target.value)}
                            hideSelectedOptions={true}
                            placeholder='Enter member email'
                            noOptionsMessage={() => 'Member Not Found'}
                        />
                        {error && <p className='text-sm leading-sm text-red-700'>{errorMessage}</p>}
                        <div className='text-centermt-2 flex'>
                            <button
                                className='inline-block w-auto px-5 py-3 mt-4 bg-blue-700 rounded font-semibold text-sm order-1 text-xs leading-3'
                                type='submit'>
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </>
        )
    );
};

export default AddMemberModal;