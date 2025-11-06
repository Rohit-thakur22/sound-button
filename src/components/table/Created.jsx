'use client'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileSoundBox from '../ProfileSoundBox';
import NewSound from '../NewSound/NewSound';

const Created = (props) => {
    const [currentlyPlayingSound, setCurrentlyPlayingSound] = useState(null);

    const handlePlaySound = (soundId) => {
        setCurrentlyPlayingSound(soundId);
    };

    const hideModal = () => {
        document.getElementById('modalId').classList.add('-z-50', 'scale-50', 'opacity-0')
        document.getElementById('modalId').classList.remove('z-[99999]', 'opacity-100', 'scale-100')
    }
    const showModal = () => {
        document.getElementById('modalId').classList.add('z-[99999]', 'scale-100', 'opacity-100')
        document.getElementById('modalId').classList.remove('scale-50', 'opacity-0', '-z-50')
    }

    useEffect(() => {
        if (props.uploadCheck) {
            showModal()
        }
    }, [props.uploadCheck])

    const handleRefresh = () => {
        props.setRefreshKey(prevKey => prevKey + 1);
    };

    const [search, setSearch] = useState('')

    const filteredData = props.allSoundsOfUser && props.allSoundsOfUser
    .filter((sounds) => {
      if (search === "") {
        return true; // Return all sounds if there's no search input
      } else if (
        (sounds.name && sounds.name.toLowerCase().includes(search.toLowerCase())) ||
        (sounds.user && sounds.user.toLowerCase().includes(search.toLowerCase()))
      ) {
        return true; // Return sounds if they match the search
      }
      return false; // Filter out sounds that don't match the search
    })
    .sort((a, b) => b.downloads - a.downloads); // Sort the filtered sounds by downloads in descending order

    const newSoundSubmit = (e) => {
        hideModal()
        toast.success('Sound added successfully');
        handleRefresh()
    }

    return (
        <div className=' dark:bg-[#212D3D]'>
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className='bg-white dark:bg-[#212D3D] mt-5'>
                <div className='w-full flex flex-col md:flex-row justify-between gap-5 pb-5 px-5'>
                    <div className='flex gap-5 justify-between items-center'>
                        <button onClick={showModal} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 border dark:border-gray-200">Add new sound</button>
                    </div>
                    <form class="flex items-center md:max-w-[300px] w-full">
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                                </svg>
                            </div>
                            <input onChange={(e) => setSearch(e.target.value)} type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search sound name..." required />
                        </div>
                    </form>
                </div>
                <div className="md:w-[90%] px-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 my-5 md:my-16  gap-5">

                    {filteredData && filteredData.length > 0 ? filteredData.map((sound) => (
                        <ProfileSoundBox
                            key={sound.id}
                            id={sound.id}
                            name={sound.name}
                            link={sound.link}
                            color={sound.color}
                            isPlaying={currentlyPlayingSound === sound.id}
                            handlePlaySound={handlePlaySound}
                            handleRefresh={handleRefresh}
                        />
                    )) :
                        <div className='w-full flex items-center justify-center'>
                            <p className="text-center text-lg text-gray-500">No sound found</p>

                        </div>

                    }
                </div>
            </div>
            <NewSound newSoundSubmit={newSoundSubmit} hideModal={hideModal} modalId={"modalId"} func={hideModal} />

        </div>
    )
}

export default Created
