import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddTeamModal from '../components/AddTeamModals';
import Navbar from '../components/Navbar';
import Team from '../components/Team';
import Error from '../components/ui/Error';
import { useGetTeamsQuery } from '../features/teams/teamsApi';

const Teams = () => {
    const [opened, setOpened] = useState(false);

    const controlModal = () => {
        setOpened((prevState) => !prevState);
    };

    const { user } = useSelector((state) => state.auth);

    const { data: teams, isLoading, isSuccess, isError } = useGetTeamsQuery(user.email);
    let content = null;

    if (isLoading) content = <div>Loading....</div>;
    if (!isLoading && isError) content = <Error message='some thing went wrong' />;
    if (!isLoading && !isError && teams.length === 0) content = <p className='text-center'>No Teams Found</p>;
    if (!isLoading && isSuccess && teams.length) content = teams.map((team) =>
        <Team key={team.id} team={team} />);

    return (
        <div
            class="flex flex-col w-screen h-screen overflow-auto text-white bg-gradient-to-tr from-slate-900 via-slate-900 to-slate-800"
        >
            <Navbar></Navbar>
            <div class="px-10 mt-6 flex justify-between">
                <h1 class="text-2xl font-bold">Teams</h1>
                <button
                    onClick={controlModal}
                    class="flex items-center justify-center w-6 h-6 ml-auto text-blue-700 rounded hover:bg-indigo-500 hover:text-indigo-100"
                >
                    <svg
                        class="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                    </svg>
                </button>
            </div>
            <div
                class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto"
            >
                {content}
            </div>
            <AddTeamModal open={opened} control={controlModal} />
        </div>
    );
};

export default Teams;