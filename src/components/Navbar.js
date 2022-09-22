import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';

const Navbar = () => {
    return (
        <div>
            <div className='flex justify-between items-center flex-shrink-0 w-full h-16 px-10 bg-opacity-75'>
                <div className='flex gap-6 items-center'>
                    <img src="./images/logo.png" class="h-10 w-10" alt='' />
                    <Link className='mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700' to='/teams'>
                        Teams
                    </Link>
                    <Link className='mx-2 text-sm font-semibold hover:text-indigo-700' to='/projects'>
                        Projects
                    </Link>
                </div>
                <Avatar />
            </div>
        </div>
    );
};

export default Navbar;