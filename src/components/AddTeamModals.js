import { useState } from "react";
import { useSelector } from "react-redux";
import { useAddTeamMutation } from "../features/teams/teamsApi";


function AddTeamModal({ open, control }) {

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('');
    const { user } = useSelector((state) => state.auth);

    const [addTeam, { isLoading }] = useAddTeamMutation(user?.email);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() && title.trim() && color.trim()) {
            addTeam({
                name: name.toLowerCase(),
                title,
                color,
                author: user,
                members: [user?.email],
                createdAt: new Date(),
            });
            control(false);
        }
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
                        Add Team
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="input input-bordered w-full max-w-full mb-2 bg-slate-900"
                            placeholder='Team Name'
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            className="input input-bordered w-full max-w-full mb-2  bg-slate-900"
                            placeholder='Title'
                            required
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            className="input input-bordered w-full max-w-full mb-2  bg-slate-900"
                            placeholder='Any valid hex(#ffffff)'
                            required
                            onChange={(e) => setColor(e.target.value)}
                        />

                        <div className='text-center mt-4 flex mx-auto'>
                            <button
                                className='inline-block w-auto px-4 py-3 bg-blue-700 rounded-lg font-semibold text-sm mt-4 mt-0 order-1'
                                type='submit'
                                disabled={isLoading}>
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </>
        )
    );
}

export default AddTeamModal;