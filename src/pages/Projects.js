import React from 'react';
import Backlog from '../components/Backlog';
import Blocked from '../components/Blocked';
import Doing from '../components/Doing';
import Done from '../components/Done';
import Navbar from '../components/Navbar';
import Ready from '../components/Ready';
import Review from '../components/Review';

const Projects = () => {
    return (
        <div
            class="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200"
        >
            <Navbar></Navbar>
            <div class="px-10 mt-6">
                <h1 class="text-2xl font-bold">Project Board</h1>
            </div>
            <div class="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
                <Backlog></Backlog>
               <Ready></Ready>
              <Doing></Doing>
               <Review></Review>
               <Blocked></Blocked>
               <Done></Done>
                <div class="flex-shrink-0 w-6"></div>
            </div>
        </div>
    );
};

export default Projects;