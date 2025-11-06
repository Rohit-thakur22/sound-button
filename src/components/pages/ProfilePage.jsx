'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Created from '@/components/table/Created';
import Favourites from '@/components/favourites/Favourites';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';
import { getUserSounds } from '../../database/getUserSounds';
import { NavbarHead } from '@/components/header/NavbarHead';
import { Avatar } from 'flowbite-react';
import Botbar from '../footer/Botbar';
import Swal from 'sweetalert2'
import { userSocialUpdate } from '../../database/userSocialUpdate';
import { getUserById } from '../../database/getUserById';
import Link from 'next/link';
import { getAllFavouriteSounds } from '@/database/getAllFavouriteSounds';

const ProfilePage = ({ uploadCheck, creatorsdata, locale = 'en' }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [filters, SetFilters] = useState('created')
    const [refreshKey, setRefreshKey] = useState(0);
    const [allSoundsOfUser, setAllSoundsOfUser] = useState()
    const [userData, setUserData] = useState()
    const [instagram, setInstagram] = useState()
    const [discord, setDiscord] = useState()
    const [youtube, setYoutube] = useState()
    const [favouriteList, setFavouriteList] = useState([])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    id: user.uid,
                    name: user.displayName,
                    image: user.photoURL,
                });
            } else {
                router.push('/');
            }
        });
        return () => unsubscribe();
    }, [router]);

    async function getUserDetails(id) {
        const userDetails = await getUserById(id)
        setInstagram(userDetails.instagram)
        setDiscord(userDetails.discord)
        setYoutube(userDetails.youtube)
        setUserData(userDetails)
    }

    useEffect(() => {
        if (user && user.id) {
            getUserDetails(user.id)
        }
    }, [user])

    async function getAllSounds() {
        if (user) {
            const allSounds = await getUserSounds(user && user.uid)
            setAllSoundsOfUser(allSounds)
        }
    }

    useEffect(() => {
        getAllSounds()
    }, [user])

    async function getFavouriteSounds() {
        const favoriteSounds = await getAllFavouriteSounds();
        setFavouriteList(favoriteSounds.sounds);
    }

    useEffect(() => {
        if (user) {
            getFavouriteSounds();
        }
    }, [user,refreshKey]);


    async function updateSocials(instagram, discord, youtube) {
        const result = await userSocialUpdate(instagram, discord, youtube)
    }

    function showSocialModal() {
        Swal.fire({
            title: "Enter your social links",
            text: "Please enter links that contains full url",
            html: `
                <input id="instagram" type="text" class="swal2-input" placeholder="Instagram" ${instagram ? 'value="' + instagram + '"' : ''} />
                <input id="discord" type="text" class="swal2-input" placeholder="Discord" ${discord ? 'value="' + discord + '"' : ''} />
                <input id="youtube" type="text" class="swal2-input" placeholder="youtube" ${youtube ? 'value="' + youtube + '"' : ''} />
            `,
            showCancelButton: true,
            confirmButtonText: "Submit",
            focusConfirm: false,
            preConfirm: () => {
                // Collect values directly from input fields
                const instagramValue = document.getElementById('instagram').value;
                const discordValue = document.getElementById('discord').value;
                const youtubeValue = document.getElementById('youtube').value;
                setInstagram(instagramValue)
                setDiscord(discordValue)
                setYoutube(youtubeValue)
                return {
                    instagram: instagramValue,
                    discord: discordValue,
                    youtube: youtubeValue,
                };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const { instagram, discord, youtube } = result.value;
                updateSocials(instagram, discord, youtube)
            }
        });
    }

    useEffect(() => {
        if (filters === 'created') {
            getAllSounds()
        }
    }, [filters, refreshKey])

    const top20Ids = creatorsdata && creatorsdata.slice(0, 20).map(creator => creator.id);
    const istopCreator = top20Ids.includes(user && user.id);
    const userRank = creatorsdata.findIndex(creator => creator.id === user?.id);


    return (
        <>
            <main className="hidebar dark:bg-[#212D3D] w-full relative flex min-h-screen flex-col items-center">
                <NavbarHead locale={locale} />
                <div className='md:block hidden top-[60px] h-[250px] overflow-hidden bg-[#F2F3F5] absolute w-full'>
                    {istopCreator &&
                        <svg className='' xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 2048 389">
                            <path transform="translate(0)" d="m0 0h2048v389h-2048z" fill="#F2F3F5" />
                            <path transform="translate(362,139)" d="m0 0 5 1 2 3 9-1 13-2v2l-20 5v16l-2 13 2 5 8 1 4-8 3-7 4-3v3l-2 3v7l2 2h6l3-3-5-4-2-7 2-3 5 1 3 4v5l6-1 1-9-3-1v-6l3-3 3 3v3l6-1 2 1 3 13 5 1 4-5 3-7h2l-1 6-5 8-6 2-5-3-2-6v-7h-5v7l-4 6-3 2h-4l-2 5-5 3-7-1-2-4h-2l-1 4-5 4-6-1-6-5-2 6-4 4-7-1v-2l-6 5-4 1-6-4-2 5-5 3h-6l-5-4v-2h-2l-1 4-4 5-6 1-5-5-1-11-4 1-1 6h-3v-5l-4-1v-6l1-2 4 1 1 4 6-1 3 4 2 10 5 1h2l2-5 4-12 3-3 5 1 2 2v6l-4 7h7l4-5 4-11 4-4 7-1 2 1v2l-8 1-3 4v7l1 2 5-1 3-9 3 3 2 4h5l4-8-1-7-3-12-1-9-11 2h-4l1-3 14-3z" fill="#1B1D5E" />
                            <path transform="translate(1893,139)" d="m0 0 5 1 2 3 9-1 13-2-1 3-19 4v19l-1 12 4 4h5l4-7 3-8 4-3v3l-2 3v6l2 3h6l3-3-6-6v-7l1-1h5l3 5 1 5 5-2 1-2v-6l-3-1v-6l1-2h4l1 5 7-1 2 3 1 9 2 3 5-1 3-4 3-7h2l-1 6-5 8-6 2-5-3-2-9v-4l-4 1-2 8-4 5-6 1-2 5-5 3-6-1-4-3-4 6-6 1-6-4-2-1-5 8-7 1-4-2-3 4-4 1-7-4-2 5-5 3-8-1-4-4-4 6-4 3-6-1-3-5-1-10-4 1-1 6-3-1 1-4-5-1 1-7 4-1 2 4 7 1 3 13 5 1 4-4 4-13 3-3 5 1 2 2v6l-4 7h7l4-5 5-12 5-4h6l2 3-2 1h-6l-3 3-1 7 2 3 4-1 3-9h2l3 7h5l3-4 1-9-4-16v-8l-12 3h-4v-2l15-4z" fill="#1B1D5E" />
                            <path transform="translate(745,139)" d="m0 0 5 1 1 4 20-4 3 1-2 2-18 4-1 23-1 7 5 5h6l3-9 4-8 3-1-1 4-1 1v10h8l2-4-5-4-1-7 2-2 5 1 3 6v3l5-2 3-9-3 1-2-2 1-6 3-2 3 4v2l6-1 2 2 2 13 7-1 4-8 1-3h3l-3 9-5 6-5 1-5-4-2-11h-4l-2 9-4 4-5 2-3 5-4 2-7-1-3-3-5 6-5 1-5-3-4-3-2 6-4 4-7-1-3-2-1 4-6 2-4-2v-2h-2l-2 5-5 3h-6l-6-5-6 8-6 1-5-4-2-11h-3l-2 6h-2v-5h-4l-1-3 2-6 4 1 1 4 6-1 3 5 1 10h6l4-5 4-13 3-2 5 1 2 3-1 7-3 3v2h6l4-4 4-11 5-5 7-1 2 1v2l-8 1-3 4v7l1 2 5-1 3-9 2 1 3 6h5l4-8-1-6-3-12-1-11-11 3-5-1 2-2 14-3z" fill="#1B1D5E" />
                            <path transform="translate(1128,139)" d="m0 0 5 1 1 4 22-4 1 2-16 4-5 2v22l-1 7 5 5h6l3-10 4-7h3l-2 4-1 6 2 4h7l2-4-5-4-1-2v-6l1-1h5l3 4 1 6 5-2 2-5-1-3-3-1 1-7 4-1 2 4h6l2 2 2 13 7-1 4-8 1-3h2l-1 7-4 6-5 3-5-2-3-4-1-9h-4l-2 9-6 5-3 1-5 6-7 1-5-4-5 6-5 1-5-3-4-3-2 6-5 4-6-1-3-2-2 4-5 2-4-2v-2h-2l-2 4-5 4h-6l-6-5-6 8-6 1-5-4-2-11h-3l-2 6h-2v-5h-4l-1-4 2-5 4 1 1 4 5-1 3 2 3 13h5l4-5 4-13 3-2 5 1 2 4-1 6-3 3v2h6l4-4 5-13 6-4 7 1-1 3h-7l-3 3v9l4 1 3-3 1-7 3 1 3 6h5l4-9-4-17-1-11-11 3-5-1 2-2 14-3 2-6z" fill="#1B1D5E" />
                            <path transform="translate(1511,139)" d="m0 0 5 1 1 4 19-4h3l-1 3-19 4v20l-1 10 5 5 5-1 3-6 3-8 2-2 3 1-3 4v6l2 3h7l2-4-6-5v-7l1-1h5l3 5 1 5 5-2 2-5-1-3-3-1 1-7 4-1 2 4h6l2 2 2 12 5 1 4-4 3-8h2l-1 7-4 6-5 3-5-2-3-4-1-9h-4l-2 8-4 5-6 1-2 5-5 3-6-1-4-2-4 5-6 1-6-4-1-2-6 9-7 1-4-2-3 4-4 1-6-3-5 6-2 1h-6l-5-3-2-2-4 7-4 2-6-1-3-5-1-9h-5v6h-2v-5l-5-1 1-7 4-1 2 4 7 1 1 1 2 12 1 1h5l4-6 3-11 3-3 6 1 1 1v8l-4 6h7l4-4 4-12 4-4 8-1 2 3-2 1h-6l-3 3-1 6 2 4h5l2-10h2l3 7h5l3-4 1-9-3-11-1-13-12 3h-4v-2l12-3h4l1-6z" fill="#1C1D5F" />
                            <path transform="translate(1320,334)" d="m0 0 4 1 2 4 15-3h7v2l-18 4h-3l1 6v10l-2 14 4 5 4 1 4-4 5-12 4-3v3l-2 3v7l2 2h6l3-3-5-4-2-4 1-5 5-1 3 3 1 7 6-1 2-9h-4l-1-3 2-6 4 1 1 4 6-1 3 5 1 10h6l4-5 3-7h2l-1 6-5 8-3 2-6-1-3-4-2-10h-3l-3 10-5 4-4 1-3 5-4 2-7-1-4-3-2 5-3 2-7-1-6-5-1 5-5 5-7-1v-2l-7 6-6-1-3-3-2 5-4-1 4-5 4-11 4-4 7-1 2 1v3h-7l-3 3-1 2v6l1 2 5-1 3-9 3 3 3 5 4-1 3-4 1-8-4-15v-9l-10 2h-6v-2l13-3h3v-5z" fill="#17195C" />
                            <path transform="translate(1703,334)" d="m0 0 4 2 2 3 15-3h7l-1 2-17 4h-3v23l-1 7 4 5 4 1 4-4 4-11 3-3h2l-2 4v10h8l2-4-5-4-1-7 2-2 5 1 3 5v4l5-2 3-8h-4l-1-5 2-4 4 1 1 4 6-1 2 2 3 13h5l4-6 2-6h3l-3 10-4 5-6 1-5-4-2-11h-5v7l-3 5-7 3-3 5-4 2-7-1-3-3-4 6-2 1h-6l-5-4v-2h-2l-1 5-5 5-7-1-2-1-5 5-6-1-1-3h-2l-2 5-4-1 4-5 4-11 4-4 7-1 2 1v3h-7l-4 4v7l1 2 5-1 3-9 2 1 3 6 3 1 4-4 2-5-2-9-4-19-9 2h-6l1-2 15-4 2-6z" fill="#1D1F60" />
                            <path transform="translate(171,334)" d="m0 0 4 1 3 4 15-3h6v2l-18 4h-3l1 2v20l-1 8 4 5 4 1 3-3 6-14 4-1-2 4-1 7 2 3h7l2-4-5-4-1-2v-6l1-1h5l3 4 1 6 5-2 3-8-5-1 1-7 4-1 2 4 7 1 3 13 1 1h5l4-6 2-6h2l-1 7-4 6-4 3-6-1-3-5-1-10-4 1-2 9-6 5-3 1-5 6-7 1-5-4-6 7h-6l-6-5-6 8-1 1h-6l-4-3-2 4-3 2-5-1-3-2-2 4-4-1 4-6 3-9 5-5 6-1 3 1-1 3h-6l-4 4v8l5 1 2-3 2-7 2 1 2 7 6-1 4-9-4-16-2-11-9 2h-6v-2l16-3 2-7z" fill="#1C1E5F" />
                            <path transform="translate(554,334)" d="m0 0 4 1 3 4 15-3h6v2l-18 4h-3l1 2v19l-1 10 6 5 4-1 4-10 3-6 4-1v2h-2l-1 9 2 3h7l2-4-6-5v-7l1-1h5l4 8v2l5-2 3-8-5-1 1-7 4-1 1 5 6-1 3 3 2 11 5 1 3-3 4-9h2l-1 7-4 6-4 3-6-1-3-4-1-11-4 1-2 9-6 5h-4l-2 5-4 3-7-1-3-3-6 7h-6l-7-5-3 6-3 3h-6l-4-3-2 4-3 2-5-1-3-2-3 4-3-1 4-6 4-11 6-4 6 1v3h-7l-3 3-1 6 2 4 5-1 2-9h2l3 7 4 1 3-3 2-4v-7l-4-18v-5l-10 2h-6v-2l16-3 1-6z" fill="#1D1F60" />
                            <path transform="translate(560,203)" d="m0 0 3 1 2 9 1 1 3-6 2-2h5l3 3 1 3v8l-1 3 5-4 4-10h3l-2 8-4 6-4 3-7 1-6-3 1-3 6 1 2-7-2-5h-4l-3 8v9l4 24v12l-3 5-5 1-3-4-1-3v-22l3-16-1-6-3 5-7 3-3 5-5 2-6-1-4-5v-7l3-5 3-1-1 4-2 6 1 5h8l3-5-4-1-3-4v-5l2-2 5 1 3 6v3l5-2 3-8z" fill="#1B1D5E" />
                            <path transform="translate(177,203)" d="m0 0 3 1 2 9 1 1 3-6 2-2h5l3 3 1 3v8l-1 3 5-4 4-10h3l-2 8-4 6-4 3-7 1-6-3 1-3 6 1 2-4-1-9-5 1-3 8v9l4 24v12l-3 5-4 1-4-4-1-4v-21l3-16-1-6-3 5-7 3-3 5-5 2-6-1-3-3-1-9 3-5 3-1-1 4-2 6 1 5h8l3-5-4-1-3-5 1-5 5-1 4 6v4l5-2 3-7z" fill="#1A1C5E" />
                            <path transform="translate(1901,7)" d="m0 0 2 3 2 9 5-8 4-1 5 5 1 8-2 5 5-3 6-12h1l-1 8-4 6-3 3-3 1h-7l-4-2v-3l6 1 2-2v-11h-5l-4 12 4 24 1 15-2 7-1 1h-6l-3-6-1-14 2-17 2-10v-4h-2l-1 4-3 3-6 1-2 5-2 2-6 1-5-3-2-3v-8l4-5h2l-2 5-1 6 1 3 7 1 3-3-6-7v-6l1-1h5l3 4 1 6 5-2 2-5 1-12z" fill="#1A1C5E" />
                            <path transform="translate(1518,7)" d="m0 0 2 2 2 9 2-3 5-5 4 1 3 3 1 3v7l-2 4 6-4 5-11 2 2-4 10-5 5-3 1h-7l-4-3v-2l6 1 2-2 1-5-2-6-4 1-4 11 5 31v9l-3 7h-6l-3-6v-23l3-16-1-5-5 6-6 1-1 4-3 3-5 1-5-2-3-4v-7l4-6h2v3h-2l-1 8 1 4h7l3-2 1-3-5-2-2-3v-6l1-1h5l3 4 1 6 5-2 2-4 1-13z" fill="#1B1D5E" />
                            <path transform="translate(752,7)" d="m0 0 2 1 3 11 4-8 5-1 4 4 1 2v9l-1 2 4-2 3-4 3-8 2 1-1 6-5 8-5 3h-8l-4-4h4l4-1 1-8-2-4-4 1-3 9 1 11 3 19v14l-3 5h-5l-3-4-1-4v-18l3-18v-6l-4 5-7 3-3 5-7 2-6-3-2-5 1-7 4-4 2 2-3 3v8l2 2h6l3-5-4-2-3-5 1-4 1-1h5l3 5v5l5-2 3-6v-11z" fill="#1A1C5E" />
                            <path transform="translate(943,203)" d="m0 0h2l3 11 5-8h6l3 4 1 8-1 5 5-4 4-10h2l-1 7-5 8-7 3-6-1-3-2v-2h6l2-2v-8l-2-3-4 2-3 10 2 13 2 12v19l-4 4-4-1-3-5-1-7 1-19 3-16v-4h-2l-1 4-5 4h-4l-1 4-3 3-7 1-4-2-2-4v-8l5-5v4l-2 3 1 7 1 1h7l2-4-5-4-1-2v-6l1-1h5l3 4 1 6 5-2 2-5z" fill="#1B1D5E" />
                            <path transform="translate(1135,7)" d="m0 0 2 1 3 11 4-8 5-1 4 4 1 2v9l-1 2 4-2 4-7 2-5 2 1-1 6-5 8-5 3h-8l-4-4 2-1 6 1 1-9-2-4-4 1-3 9v7l4 23v14l-3 5h-5l-3-4-1-4v-18l3-18v-6l-4 5-7 3-3 5-7 2-6-3-2-4 1-8 4-4 1 3-2 2v8l2 2h6l3-5-4-2-3-5 1-5h5l3 3 1 7 5-2 3-6v-11z" fill="#1A1C5E" />
                            <path transform="translate(369,7)" d="m0 0 2 1 2 7v5h2l1-6 4-4 5 1 3 4v10l-1 2 4-2 3-4 3-8h2l-1 7-4 7-6 4h-8l-3-2v-3l5 1 3-3v-7l-2-3h-3l-4 11 1 10 3 17v17l-3 4h-5l-3-5-1-5v-14l4-27h-2l-2 5-5 3h-3l-2 5-6 3-7-2-3-7 2-7 4-3v3l-2 3v6l3 3h7l1-4-6-5v-7l1-1h5l3 5v5l5-2 2-2z" fill="#1B1D5E" />
                            <path transform="translate(1326,203)" d="m0 0h2l2 8v4h2l1-5 3-4 7 1 2 3 1 7-2 6 5-3 5-11h2l-1 7-4 6-5 4-6 1-6-3 1-3 5 1 2-3v-7l-2-3-4 2-3 9 1 10 3 17v17l-2 4-5 1-4-5-1-6v-13l3-19v-8l-5 6-6 1-2 5-5 3-6-1-4-4-1-5 3-7 3-2v3l-2 3v6l2 3h6l3-3-6-6v-7l5-1 3 3 1 7 6-2 2-5z" fill="#1B1D5E" />
                            <path transform="translate(1709,203)" d="m0 0h2l2 8v4h2l1-5 3-4 7 1 2 4v10 2l5-5 4-9h2l-1 7-4 6-5 4-6 1-5-2-1-4 6 1 2-3v-7l-2-3h-4l-3 11 1 10 3 18v16l-2 4-5 1-4-5-1-5v-15l3-18v-8l-5 6-6 1-2 5-5 3-6-1-4-4-1-6 3-6 3-2v3l-2 3v6l2 3h6l3-3-6-6v-7l5-1 4 5v5l6-2 2-5z" fill="#1B1D5E" />
                            <path transform="translate(1182)" d="m0 0h56l-6 7-9 6-6 2-13 1-9-2-9-6-4-6z" fill="#F3F4F6" />
                            <path transform="translate(1565)" d="m0 0h55l-2 4-7 6-8 4-10 2-12-1-10-5-6-7z" fill="#F3F4F6" />
                            <path transform="translate(1948)" d="m0 0h55l-2 4-7 6-8 4-10 2-12-1-9-4-7-8z" fill="#F3F4F6" />
                            <path transform="translate(799)" d="m0 0h56l-6 7-9 6-6 2-12 1-10-2-9-6-4-6z" fill="#F3F4F6" />
                            <path transform="translate(33)" d="m0 0h56l-3 5-8 6-10 4-11 1-10-2-7-4-6-7z" fill="#F3F4F6" />
                            <path transform="translate(416)" d="m0 0h56l-6 7-9 6-6 2-11 1-11-2-9-6z" fill="#F3F4F6" />
                            <path transform="translate(926,174)" d="m0 0 2 1-2 5-8 5-15 4-1 3v9l3 16v9l-3 8-5 5-7 3h-11l-8-4-2-4h3l6 4 9 1 9-3 4-5 1-3v-13l-2-11v-14l1-2h-11l-11-1h-19l-9 4-4 4-1 2v10l3 5 8 2 8-3 5-8 1-3h2l-1 7-5 7-7 3h-8l-6-4-3-4-1-3v-7l4-8 8-6 10-2 39 2 2-5 4-1-3 6 11-3 7-4z" fill="#131559" />
                            <path transform="translate(543,175)" d="m0 0h2l-2 5-5 4-8 3-10 2v15l2 11v13l-4 8-5 4-6 2h-10l-8-4-3-4h3l7 4 8 1 9-3 4-4 2-8-2-16-1-6v-11l1-3h-11l-11-1h-18l-9 3-5 6-1 2v8l3 5 6 3 9-2 5-6 2-6h3l-3 9-4 5-6 3h-8l-6-3-4-6v-12l6-8 9-4 6-1 20 1h19l4-5h2l-3 6 12-3 6-4z" fill="#131559" />
                            <path transform="translate(160,175)" d="m0 0h2l-2 5-7 5-12 3h-4v16l2 11v13l-4 8-5 4-6 2h-10l-8-4-3-4h3l10 5 10-1 6-4 3-5 1-10-3-17v-10l1-4h-11l-11-1h-18l-9 3-5 6-1 2v8l3 5 6 3 9-2 5-6 2-6h3l-3 9-5 6-5 2h-8l-6-3-4-6v-11l4-7 8-5 9-2 20 1h19l4-5h2l-3 6 12-3 6-4z" fill="#131559" />
                            <path transform="translate(1309,174)" d="m0 0 2 2-6 7-10 4-10 1v14l3 17-1 11-4 6-5 4-5 2h-11l-8-4-2-2v-3l4 2 5 3 9 1 8-3 4-4 2-5v-10l-2-12v-16l-21-2h-19l-8 3-5 5-2 5 1 8 5 5 6 1 8-3 4-6 2-5h2l-1 6-4 6-5 4-3 1h-8l-5-3-4-5-1-2v-9l3-6 7-6 12-3 39 2 2-5 3-1-1 4-1 2 13-4 6-4z" fill="#131559" />
                            <path transform="translate(1692,174)" d="m0 0 2 2-6 7-10 4-10 1v14l3 18-1 10-4 6-5 4-5 2h-11l-8-4-2-2v-3l4 2 5 3 9 1 8-3 4-4 2-5v-10l-2-12v-16l-21-2h-19l-10 4-4 5-1 8 3 7 7 3 8-2 5-5 3-7h2l-1 6-4 6-5 4-3 1h-8l-5-3-4-5-1-2v-9l3-6 7-6 12-3 19 1h19l4-5h2l-1 4-1 1 8-1 10-5z" fill="#131559" />
                            <path transform="translate(1401,152)" d="m0 0h11l8 3 5 4 2 5-1 9-4 6-5 4-8 3h-8l-6-4-2-5 1-7 1-2h3l-1 4v7l3 3h11l6-3 3-1 3-6v-9l-4-5-5-2h-15l-11 4-10 9-5 10-1 8 2 9 4 6 6 5 11 3 13-1 10-4 9-7 6-10h2l-1 5-4 6-7 7-12 6-4 1h-16l-9-3-8-7-4-8-1-4v-10l4-11 9-10 14-7z" fill="#131559" />
                            <path transform="translate(1018,152)" d="m0 0h11l8 3 5 4 2 5-1 9-4 6-5 4-8 3h-8l-6-4-2-5 1-7 4-2-1 4v7l3 3h11l6-3 5-5 1-2v-10l-6-5-3-1h-15l-9 3-8 6-6 7-3 7-1 8 2 9 4 6 6 5 11 3h8l11-3 10-6 7-9 2-4h2l-1 5-4 6-7 7-12 6-4 1h-16l-10-4-7-6-4-8-1-4v-10l4-11 9-10 14-7z" fill="#131559" />
                            <path transform="translate(1784,152)" d="m0 0h11l8 3 5 5 2 5-1 8-6 8-7 4-4 1h-8l-5-3-3-5 1-8 1-2 3 1-2 7 1 5 3 1h11l8-5 4-6v-8l-4-5-5-2h-16l-10 4-9 7-5 8-2 7v7l3 10 4 5 10 5 13 1 12-3 8-5 4-2 2-4 5-8h2l-1 5-6 8-8 7-9 4-5 1h-15l-9-3-9-8-4-10v-12l4-10 9-10 8-5z" fill="#131559" />
                            <path transform="translate(635,152)" d="m0 0h12l8 3 5 5 1 3v8l-3 6-8 7-6 2h-8l-6-3-2-3v-9l2-3h2l-1 10 4 4 5 1 10-3 5-4 3-6v-6l-3-5-7-3h-15l-10 4-8 6-6 8-2 6v12l4 9 7 6 11 3h8l12-3 10-7 6-7 2-5h3l-2 6-8 10-10 6-9 3h-15l-9-3-8-6-5-10-1-10 2-9 6-10 8-7 11-5z" fill="#131559" />
                            <path transform="translate(252,152)" d="m0 0h12l8 3 6 7v10l-5 8-8 5-4 1h-8l-5-3-3-4v-7l2-4h2l-1 9 2 4 7 2 10-3 6-5 2-5-1-9-5-4-3-1h-16l-10 4-9 7-6 10-1 4v10l4 10 6 5 7 3 5 1h8l12-3 9-6 7-8 3-5h2l-2 6-7 9-10 7-10 3h-15l-11-4-5-4-4-6-2-6v-14l4-9 6-8 11-7z" fill="#131559" />
                            <path transform="translate(937,334)" d="m0 0 4 1 2 5 16-4h6v2l-18 4h-3l1 4v14l-2 13-4 1-4-16-1-13-10 2h-6v-2l13-3h3l1-6z" fill="#1C1E5F" />
                            <path transform="translate(24,153)" d="m0 0 4 1 1 4 6-1 2 1 3 13 5 1 4-5 3-7h2l-1 6-5 8-6 2-5-3-2-9v-4l-4 1-2 8-4 5-6 1-2 5-5 3-7-1-3-3-2 2 1-10 4-6h3l-3 5v7l2 2h6l3-3-5-5-2-6 2-3 5 1 3 4 1 5 5-1 1-9-3-1v-6z" fill="#242665" />
                            <path transform="translate(63,347)" d="m0 0h8l9 3 5 4 2 5v7l-3 6-8 7-5 2h-10l-5-3-3-6 2-8 3-1-1 4v7l3 3 8 1 10-4 4-5 2-8-3-6-4-3-4-1h-13l-9 3-9 6-6 7-3 7v15h-3l-1-4v-8l4-11 6-8 8-6 10-4z" fill="#131559" />
                            <path transform="translate(1594,347)" d="m0 0h8l9 3 5 4 2 4v8l-4 8-9 6-3 1h-10l-6-4-1-2v-9l2-3h2l-1 10 3 4 8 1 10-4 4-5 2-5-1-7-6-5-3-1h-14l-11 4-9 7-5 7-2 6v14h-3l-1-11 3-10 6-9 11-8 8-3z" fill="#131559" />
                            <path transform="translate(445,347)" d="m0 0h9l9 3 6 7 1 7-3 8-8 7-6 2h-10l-6-5-1-8 2-5 3 1-1 2v9l6 3 9-1 6-4h2l2-4 1-3v-8l-5-5-5-2h-14l-10 4-6 4-8 9-3 10v11h-2l-1-2v-12l4-10 9-10 14-7z" fill="#131559" />
                            <path transform="translate(1977,347)" d="m0 0h8l9 3 5 4 2 4v8l-3 6-5 5-8 4h-10l-5-3-3-7 2-7 3-1-1 4v7l3 3 8 1 10-4 4-5 2-5-1-7-6-5-4-1h-13l-11 4-8 6-6 8-2 6v14h-3l-1-4v-7l3-10 6-9 11-8 8-3z" fill="#131559" />
                            <path transform="translate(286,381)" d="m0 0h17l23 2-1 6h-53l5-5z" fill="#F3F4F6" />
                            <path transform="translate(1051,381)" d="m0 0h18l22 2v5l-1 1h-52l5-5z" fill="#F3F4F6" />
                            <path transform="translate(1817,381)" d="m0 0h17l23 2-1 6h-52l4-5z" fill="#F3F4F6" />
                            <path transform="translate(1434,381)" d="m0 0h17l23 2-1 6h-52l4-5z" fill="#F3F4F6" />
                            <path transform="translate(669,381)" d="m0 0h17l22 2v5l-1 1h-52l5-5z" fill="#F3F4F6" />
                            <path transform="translate(1364,348)" d="m0 0 4 1 1 4 6-1 3 5 1 10h6l4-5 3-7h2l-1 6-5 8-3 2-6-1-3-4-2-10h-3l-3 10-5 4-6 1-6-4-2-4 1-5 5-1 3 3 1 7 6-1 2-9h-4l-1-3z" fill="#282967" />
                            <path transform="translate(1211,347)" d="m0 0h8l10 3 6 7v10l-4 7-5 4-7 3h-10l-5-3-2-4v-7l2-4h2l-1 9 2 4 4 2 9-1 6-3 5-6 1-2v-7l-3-5-7-3h-14l-11 4-9 7-5 8-1 3h-3l2-6 4-6 9-8 11-5z" fill="#131559" />
                            <path transform="translate(982,348)" d="m0 0 4 2v3l6-1 3 3 2 11 5 1 3-3 4-9h2l-1 6-3 6-5 4-6-1-3-4-1-11-4 1-2 8-4 5-6 1-1 3h-2l-2-4-4-4-1-5 2-3 5 1 3 5v4l6-1 3-9-5-1 1-7z" fill="#292B68" />
                            <path transform="translate(2011,183)" d="m0 0h9l28 2v3h-11l-11-1h-18l-8 3-5 4-2 4v8l3 5 6 3 9-2 5-6 2-6h3l-2 8-6 7-5 2h-8l-6-3-4-6v-11l4-7 8-5z" fill="#131559" />
                            <path transform="translate(1882,370)" d="m0 0h3l-2 5-10 6-13 3-2 5h-2l1-6h-11l-12-1h-17l-9 3-4 4h-3l2-4 5-4 6-2 14-1 31 2 3-6h3l-3 6 12-3 6-4z" fill="#131559" />
                            <path transform="translate(1500,370)" d="m0 0h2l-2 5-5 4-13 4-5 1-1 5h-3l1-6h-12l-11-1h-17l-9 3-4 4-3-1 4-5 9-4 14-1 11 1h20l4-5h2l-3 6 12-3 6-4z" fill="#131559" />
                            <path transform="translate(734,370)" d="m0 0h2l-1 4-6 5-13 4h-5l-1 6-3-1 1-5h-12l-10-1h-17l-9 3-5 4-3-1 8-7 5-2 14-1 12 1h19l4-5h2l-2 5 8-1 10-5z" fill="#131559" />
                            <path transform="translate(351,370)" d="m0 0 3 1-6 7-10 4-10 1-1 6h-2v-5l-22-2h-17l-9 3-5 4-3-1 8-7 12-3 19 1h19l4-5h2l-1 4-1 1 9-1 9-5z" fill="#131559" />
                            <path transform="translate(828,347)" d="m0 0h9l9 3 6 7 1 7-3 7-3-1 2-4v-8l-5-5-5-2h-14l-10 4-6 4-8 9-3 9v12h-2l-1-2v-12l4-10 9-10 14-7z" fill="#131559" />
                            <path transform="translate(1108,377)" d="m0 0 4 2-13 4h-5l-1 6-3-1 1-5h-12l-10-1h-18l-10 4-3 3-3-1 8-7 10-3h12l11 1h17l4-1 3 1z" fill="#131559" />
                            <path transform="translate(1856)" d="m0 0h2l4 22v10l-3 7-5 5-7 3h-10l-7-3-4-3 1-3 9 5 7 1 10-3 4-5 1-3v-13l-2-11z" fill="#131559" />
                            <path transform="translate(1473)" d="m0 0h2l4 21v12l-4 8-5 4-6 2h-10l-8-4-3-4h3l7 4 7 1 10-3 4-5 1-2v-15l-2-11z" fill="#131559" />
                            <path transform="translate(1090)" d="m0 0h3l3 19v15l-4 7-5 4-6 2h-10l-8-4-2-2 1-3 8 5 8 1 12-4 3-9v-8l-3-18z" fill="#131559" />
                            <path transform="translate(707)" d="m0 0h3l3 18v16l-3 6-6 5-6 2h-10l-8-4-2-2 1-3 8 5 8 1 9-3 4-4 2-6v-8l-3-18z" fill="#131559" />
                            <path transform="translate(413)" d="m0 0 4 1 5 8 10 5 11 1 12-2 10-6 7-7 3 1-7 8-11 7-8 2h-15l-9-3-9-8z" fill="#131559" />
                            <path transform="translate(325)" d="m0 0h2l4 24-1 11-4 6-5 4-6 2h-9l-7-3-4-3v-3l4 2 5 3 8 1 9-3 4-4 2-5v-10l-2-12z" fill="#131559" />
                            <path transform="translate(1139,34)" d="m0 0 2 4 3 21v7l-3 5-3-1-2-10 1-18z" fill="#F3F4F6" />
                            <path transform="translate(756,34)" d="m0 0 2 4 3 21v7l-1 4-4 1-2-4-1-13 2-18z" fill="#F3F4F6" />
                            <path transform="translate(947,230)" d="m0 0 2 1 3 19v13l-2 3h-3l-2-5v-20z" fill="#F3F4F6" />
                            <path transform="translate(1904,35)" d="m0 0 2 1 3 18v14l-2 3-4-2-1-4v-19z" fill="#F3F4F6" />
                            <path transform="translate(1521,35)" d="m0 0h2l3 18v16l-4 2-3-7v-16z" fill="#F3F4F6" />
                            <path transform="translate(564,230)" d="m0 0h2l3 17v17l-1 2-4-1-2-7v-13z" fill="#F3F4F6" />
                            <path transform="translate(1713,230)" d="m0 0 2 2 3 20v10l-2 4-4-1-1-3v-23z" fill="#F3F4F6" />
                            <path transform="translate(1330,230)" d="m0 0 2 2 3 20v11l-2 3-4-1-1-3v-22z" fill="#F3F4F6" />
                            <path transform="translate(182,230)" d="m0 0h1l3 17v18l-4 1-2-3-1-5v-12l2-15z" fill="#F3F4F6" />
                            <path transform="translate(373,34)" d="m0 0 2 3 3 20v10l-2 4-4-2-1-2v-23z" fill="#F3F4F6" />
                            <path transform="translate(796)" d="m0 0h3l6 9 10 5 11 1 12-2 10-6 7-7 3 1-8 9-8 5-10 3h-15l-9-3-9-8z" fill="#131559" />
                            <path transform="translate(31)" d="m0 0 3 1 4 6 6 5 6 2 12 1 12-3 10-6 5-6h3l-2 4-7 7-12 6-4 1h-16l-10-4-7-6-3-6z" fill="#131559" />
                            <path transform="translate(1945)" d="m0 0h3l4 7 6 5 12 3 12-1 10-4 8-6 3-4h3l-2 4-7 7-12 6-4 1h-16l-10-4-6-5-4-7z" fill="#131559" />
                            <path transform="translate(1562)" d="m0 0h3l4 7 5 4 7 3 12 1 13-3 10-7 4-5h3l-2 4-7 7-12 6-4 1h-16l-10-4-6-5-4-7z" fill="#131559" />
                            <path transform="translate(1179)" d="m0 0h3l6 9 10 5 12 1 11-2 10-6 7-7 3 1-7 8-9 6-10 3h-15l-11-4-7-7z" fill="#131559" />
                            <path transform="translate(1661,372)" d="m0 0 5 1 2 3-1 7-4 6h-9l3-13z" fill="#1E2061" />
                            <path transform="translate(1278,372)" d="m0 0 5 1 2 3-1 7-4 6h-9l3-12z" fill="#1F2061" />
                            <path transform="translate(513,372)" d="m0 0 4 1 2 2v7l-4 6v1h-10l4-14z" fill="#212362" />
                            <path transform="translate(130,372)" d="m0 0 5 1 1 2v7l-4 6v1h-10l5-15z" fill="#1F2161" />
                            <path transform="translate(2044,372)" d="m0 0 4 1v16h-12l5-15z" fill="#2E306C" />
                            <path transform="translate(0,11)" d="m0 0 4 2 2 5-1 8-1 2 5-3 4-9 3-3-1 8-4 6-3 3-8 1z" fill="#131559" />
                            <path transform="translate(914,371)" d="m0 0 1 3v8l1 2 5-1 2-5 4-1 3 5 4-1 2-3h3l-2 5-3 2-7-1v-2l-7 6-5-1-3-2-3 4-4-1 4-4 4-12z" fill="#131559" />
                            <path transform="translate(1800)" d="m0 0h2v12l2 4 3 2h10l6-4 4-9h2l-1 7-4 6-8 4h-8l-6-4-3-4-1-10z" fill="#131559" />
                            <path transform="translate(1417)" d="m0 0h2v12l4 5 7 2 7-2 5-6 2-6h2l-1 7-4 6-7 4h-9l-6-4-3-5-1-8z" fill="#131559" />
                            <path transform="translate(1034)" d="m0 0 3 1-1 3v7l4 6 7 2 7-2 5-5 3-7h2l-1 6-4 6-5 4-3 1h-8l-7-4-3-6v-10z" fill="#131559" />
                            <path transform="translate(651)" d="m0 0 3 1-1 9 3 6 7 3 8-2 3-1 2-4 3-7h2l-1 6-4 6-5 4-3 1h-8l-7-4-3-6v-10z" fill="#131559" />
                            <path transform="translate(268)" d="m0 0 3 1-1 8 3 7 3 2h10l5-3 5-10h2l-1 6-4 6-5 4-3 1h-8l-5-3-4-5-1-2v-9z" fill="#131559" />
                            <path transform="translate(1911,13)" d="m0 0 5 1 1 2v9l-3 3-4-1-2-1-1 3-1-3 4-12z" fill="#F3F4F6" />
                            <path transform="translate(189,208)" d="m0 0 4 1 2 9-3 5-6-1-2 1 1-8 3-6z" fill="#F3F4F6" />
                            <path transform="translate(1146,13)" d="m0 0 4 1 2 4-1 7-3 3-7-1 2-10z" fill="#F3F4F6" />
                            <path transform="translate(763,13)" d="m0 0 4 1 2 4-1 8-5 2-5-1 2-10z" fill="#F3F4F6" />
                            <path transform="translate(572,208)" d="m0 0 4 2 2 7-3 6-6-1-2 1 1-8 3-6z" fill="#F3F4F6" />
                            <path transform="translate(1529,13)" d="m0 0 4 1 2 7-2 5-4 2-5-2 2-9z" fill="#F3F4F6" />
                            <path transform="translate(937,343)" d="m0 0h5l1 14-1 9-2 1-3-11-1-12z" fill="#F3F4F6" />
                            <path transform="translate(8,166)" d="m0 0 2 1 3 5 4 4-4 4h-6l-3-3v-7z" fill="#F3F4F6" />
                            <path transform="translate(1703,343)" d="m0 0h4l1 3v17l-2 4-3-8-1-6v-9z" fill="#F3F4F6" />
                            <path transform="translate(172,343)" d="m0 0h4l1 4v15l-1 5-2-1-3-12v-10z" fill="#F3F4F6" />
                            <path transform="translate(391,166)" d="m0 0 2 1 2 5 5 3-2 4-2 1h-6l-3-3v-7z" fill="#F3F4F6" />
                            <path transform="translate(555,343)" d="m0 0h4l1 5v13l-1 6-2-1-3-12-1-9z" fill="#F3F4F6" />
                            <path transform="translate(1511,148)" d="m0 0h5l1 5v12l-1 6h-2l-3-12-1-10z" fill="#F3F4F6" />
                            <path transform="translate(745,148)" d="m0 0h5l1 2v18l-2 4-3-9-1-6z" fill="#F3F4F6" />
                            <path transform="translate(732,21)" d="m0 0 2 1 3 5 3 2-1 4-2 2h-6l-3-3v-7z" fill="#F3F4F6" />
                            <path transform="translate(1348,361)" d="m0 0 3 4 6 6-4 4h-6l-3-3v-7z" fill="#F3F4F6" />
                            <path transform="translate(1320,343)" d="m0 0 5 1v21l-2 2-4-16v-7z" fill="#F3F4F6" />
                            <path transform="translate(1894,148)" d="m0 0h5l1 14-1 9h-2l-3-11-1-11z" fill="#F3F4F6" />
                            <path transform="translate(1128,148)" d="m0 0h5l1 2v18l-2 3-3-8-1-6z" fill="#F3F4F6" />
                            <path transform="translate(362,148)" d="m0 0h5l1 1v20l-2 2-3-9-1-6z" fill="#F3F4F6" />
                            <path transform="translate(2012,373)" d="m0 0 4 1 1 4h7l2 5v6h-3l-1-8-4 1-1 5h-2v-5h-4l-1-4z" fill="#1D1F60" />
                            <path transform="translate(1629,373)" d="m0 0 4 1 1 4h7l2 3v8h-2l-2-8h-4v6h-3v-5l-4-1v-6z" fill="#1D1F60" />
                            <path transform="translate(1246,373)" d="m0 0 4 1 1 4h7l2 3v8h-2l-1-9-5 1v6h-3v-5l-4-1v-6z" fill="#1D1F60" />
                            <path transform="translate(821,363)" d="m0 0 3 1-2 7 2 5 5 2 9-1 6-4 3-1-1 4-7 4-3 1h-10l-6-5-1-2 1-9z" fill="#131559" />
                            <path transform="translate(481,373)" d="m0 0 4 1 1 3 7 1 2 7v4h-3l-1-8h-5v6h-2v-5l-5-1 1-7z" fill="#1D1F60" />
                            <path transform="translate(98,373)" d="m0 0 4 1 1 3 7 1 2 7v4h-3l-1-8h-5v6h-2v-5l-5-1 1-7z" fill="#1D1F60" />
                            <path transform="translate(2018,233)" d="m0 0 12 6 10-1 5-3h2l1-2-1 5-5 3-4 1h-10l-8-4-3-4z" fill="#131559" />
                            <path transform="translate(891,378)" d="m0 0h3l1 6 3-1 2-5h2l-1 6-3 4v1h-10z" fill="#232564" />
                            <path transform="translate(862,378)" d="m0 0h14l2 10-3 1-1-9-5 1v6h-3l1-5-5-1z" fill="#131559" />
                            <path transform="translate(1641)" d="m0 0h14l-2 4-3 2-6-1z" fill="#555687" />
                            <path transform="translate(1258)" d="m0 0h14l-2 4-3 2-6-1z" fill="#585A89" />
                            <path transform="translate(876)" d="m0 0h14l-4 5-6 1-4-3z" fill="#5C5E8C" />
                            <path transform="translate(2024)" d="m0 0h14l-2 4-4 2-5-1-3-3z" fill="#5B5C8B" />
                            <path transform="translate(493)" d="m0 0h14l-2 4-4 2-5-1-3-3z" fill="#5E608E" />
                            <path transform="translate(110)" d="m0 0h14l-2 4-4 2-5-1-3-3z" fill="#5E608E" />
                            <path transform="translate(513,375)" d="m0 0 4 1-1 7-4 2-1-1v-7z" fill="#F3F4F6" />
                            <path transform="translate(130,375)" d="m0 0 4 1-1 7-4 2-1-1v-7z" fill="#F3F4F6" />
                            <path transform="translate(1469,180)" d="m0 0 5 1-1 7-4 2-1-2v-6z" fill="#F3F4F6" />
                            <path transform="translate(2044,375)" d="m0 0 4 1v6l-3 3h-2l-1-7z" fill="#F3F4F6" />
                            <path transform="translate(1278,375)" d="m0 0 4 1v6l-2 3h-3l-1-7z" fill="#F3F4F6" />
                            <path transform="translate(1852,180)" d="m0 0h4l1 5-3 5-3-1v-8z" fill="#F3F4F6" />
                            <path transform="translate(1087,180)" d="m0 0 4 1-1 7-4 2-1-2v-6z" fill="#F3F4F6" />
                            <path transform="translate(704,180)" d="m0 0 4 1-1 7-4 2-1-2v-6z" fill="#F3F4F6" />
                            <path transform="translate(321,180)" d="m0 0h4l1 4-3 6h-3l-1-6z" fill="#F3F4F6" />
                            <path transform="translate(1661,375)" d="m0 0 4 1v6l-2 3h-3l-1-7z" fill="#F3F4F6" />
                            <path transform="translate(962,360)" d="m0 0 3 1-3 4v8h-5l2-9z" fill="#131559" />
                            <path transform="translate(943,375)" d="m0 0 5 2h8l-2 4h-6l-5-5z" fill="#131559" />
                            <path transform="translate(0,13)" d="m0 0 3 3v9l-3 2z" fill="#F3F4F6" />
                            <path transform="translate(920,367)" d="m0 0 6 1v3h-11l2-3z" fill="#131559" />
                            <path transform="translate(1178,374)" d="m0 0 2 4 1 11-3-1z" fill="#131559" />
                            <path transform="translate(529,384)" d="m0 0 8 4v1h-11z" fill="#F3F4F6" />
                            <path transform="translate(1294,384)" d="m0 0 3 1v2l6 1v1h-11z" fill="#F3F4F6" />
                            <path transform="translate(912,384)" d="m0 0 4 3 4 2h-11z" fill="#F3F4F6" />
                            <path transform="translate(146,384)" d="m0 0 8 4v1h-10z" fill="#F3F4F6" />
                            <path transform="translate(1677,384)" d="m0 0h2l3 3 4 2h-11z" fill="#F3F4F6" />
                        </svg>
                    }
                </div>
                <div className="bg-white mt-[150px] md:mt-[150px] dark:bg-[#212D3D] w-full md:shadow-lg md:rounded-3xl md:max-w-[70%] lg:max-w-[50%] h-full md:border dark:border-[#212D3D] mx-auto relative">


                    <div className="flex -mt-[65px] justify-center">
                        {user && user.image ? (
                            <>
                                <Avatar
                                    size="xl"
                                    rounded
                                    className="border hidden md:block bg-black border-black rounded-full cursor-pointer"
                                    img={user?.image || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                                />
                                <Avatar size='lg' rounded className="border md:hidden rounded-full cursor-pointer" img={user.image} />
                            </>
                        ) : (
                            <Avatar size='xl' rounded className="border rounded-full cursor-pointer" />
                        )}

                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 py-5">
                        <div className='text-center px-5 flex flex-col items-center justify-center border-r py-4'>
                            <h2 className="text-4xl capitalize dark:text-white font-semibold">{user && user.name}</h2>
                            <h4 className='mt-2'>Creator | Sound Effect Buttons</h4>

                        </div>
                        {userRank < 2 ?
                            <div className='flex items-center flex-col px-5 border-l py-4 justify-center text-center'>
                                <h4 className='mt-2'>Boost your visibility and popularity</h4>
                                <h4 className=''>Add your social media links</h4>
                                <div className='flex gap-2 justify-center mt-3'>
                                    <Link href={instagram || '#'} target="_blank">
                                        <svg
                                            className='cursor-pointer'
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="35"
                                            height="35"
                                            viewBox="0 0 1024 1024"
                                        >
                                            <circle cx="512" cy="512" r="512" fill={(userData && userData.instagram) || instagram ? "#e4405f" : "#808080"} />
                                            <path
                                                d="M512 256c-69.5 0-78.2.3-105.5 1.5-27.3 1.3-45.8 5.6-62.1 11.9-16.8 6.5-31.1 15.3-45.4 29.5s-23 28.5-29.5 45.4c-6.3 16.3-10.6 34.9-11.9 62.1-1.3 27.3-1.5 36-1.5 105.5s.3 78.2 1.5 105.5c1.3 27.2 5.6 45.8 11.9 62.1 6.5 16.8 15.3 31.1 29.5 45.4 14.2 14.2 28.5 23 45.4 29.5 16.3 6.3 34.9 10.6 62.1 11.9 27.3 1.3 36 1.5 105.5 1.5s78.2-.3 105.5-1.5c27.2-1.3 45.8-5.6 62.1-11.9 16.8-6.5 31.1-15.3 45.4-29.5 14.2-14.2 23-28.5 29.5-45.4 6.3-16.3 10.6-34.9 11.9-62.1 1.3-27.3 1.5-36 1.5-105.5s-.3-78.2-1.5-105.5c-1.3-27.2-5.6-45.8-11.9-62.1-6.5-16.8-15.3-31.1-29.5-45.4-14.2-14.2-28.5-23-45.4-29.5-16.3-6.3-34.9-10.6-62.1-11.9-27.3-1.2-36-1.5-105.5-1.5zm0 46.1c68.3 0 76.5.3 103.5 1.5 25 1.2 38.5 5.3 47.5 8.9 12 4.6 20.5 10.2 29.5 19.1 8.9 9 14.5 17.5 19.1 29.5 3.5 9 7.7 22.5 8.8 47.5 1.2 27 1.5 35.1 1.5 103.5s-.3 76.5-1.6 103.5c-1.3 25-5.5 38.5-9 47.5-4.8 12-10.2 20.5-19.2 29.5-8.9 8.9-17.6 14.5-29.4 19.1-9 3.5-22.7 7.7-47.7 8.8-27.2 1.2-35.2 1.5-103.7 1.5s-76.5-.3-103.7-1.6c-25-1.3-38.7-5.5-47.7-9-12.1-4.8-20.5-10.2-29.4-19.2-9-8.9-14.7-17.6-19.2-29.4-3.5-9-7.7-22.7-9-47.7-1-26.9-1.3-35.2-1.3-103.3 0-68.2.3-76.5 1.3-103.7 1.3-25 5.4-38.7 9-47.7 4.5-12.2 10.2-20.5 19.2-29.5 8.9-8.9 17.3-14.7 29.4-19.2 9-3.5 22.4-7.7 47.4-9 27.2-1 35.2-1.3 103.7-1.3l1 .7zm0 78.4c-72.6 0-131.5 58.9-131.5 131.5S439.4 643.5 512 643.5 643.5 584.6 643.5 512 584.6 380.5 512 380.5zm0 216.8c-47.1 0-85.3-38.2-85.3-85.3s38.2-85.3 85.3-85.3 85.3 38.2 85.3 85.3-38.2 85.3-85.3 85.3zm167.4-221.9c0 17-13.8 30.7-30.7 30.7-17 0-30.7-13.8-30.7-30.7s13.8-30.7 30.7-30.7c16.9-.1 30.7 13.7 30.7 30.7z"
                                                fill="#fff"
                                            />
                                        </svg>
                                    </Link>
                                    <Link href={discord || '#'} target="_blank">
                                        <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 1024 1024">
                                            <circle cx="512" cy="512" r="512" fill={(userData && userData.discord) || discord ? "#5865f2" : "#808080"} />
                                            <path
                                                d="M689.43 349a422.21 422.21 0 0 0-104.22-32.32 1.58 1.58 0 0 0-1.68.79 294.11 294.11 0 0 0-13 26.66 389.78 389.78 0 0 0-117.05 0 269.75 269.75 0 0 0-13.18-26.66 1.64 1.64 0 0 0-1.68-.79A421 421 0 0 0 334.44 349a1.49 1.49 0 0 0-.69.59c-66.37 99.17-84.55 195.9-75.63 291.41a1.76 1.76 0 0 0 .67 1.2 424.58 424.58 0 0 0 127.85 64.63 1.66 1.66 0 0 0 1.8-.59 303.45 303.45 0 0 0 26.15-42.54 1.62 1.62 0 0 0-.89-2.25 279.6 279.6 0 0 1-39.94-19 1.64 1.64 0 0 1-.16-2.72c2.68-2 5.37-4.1 7.93-6.22a1.58 1.58 0 0 1 1.65-.22c83.79 38.26 174.51 38.26 257.31 0a1.58 1.58 0 0 1 1.68.2c2.56 2.11 5.25 4.23 8 6.24a1.64 1.64 0 0 1-.14 2.72 262.37 262.37 0 0 1-40 19 1.63 1.63 0 0 0-.87 2.28 340.72 340.72 0 0 0 26.13 42.52 1.62 1.62 0 0 0 1.8.61 423.17 423.17 0 0 0 128-64.63 1.64 1.64 0 0 0 .67-1.18c10.68-110.44-17.88-206.38-75.7-291.42a1.3 1.3 0 0 0-.63-.63zM427.09 582.85c-25.23 0-46-23.16-46-51.6s20.38-51.6 46-51.6c25.83 0 46.42 23.36 46 51.6.02 28.44-20.37 51.6-46 51.6zm170.13 0c-25.23 0-46-23.16-46-51.6s20.38-51.6 46-51.6c25.83 0 46.42 23.36 46 51.6.01 28.44-20.17 51.6-46 51.6z"
                                                fill="#fff"
                                            />
                                        </svg>
                                    </Link>
                                    <Link href={youtube || '#'} target="_blank">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 72 72">
                                            <g fill={(userData && userData.youtube) || youtube ? "#FF0000" : "#808080"} fill-rule="evenodd">
                                                <path d="M36,72 L36,72 C55.882251,72 72,55.882251 72,36 L72,36 C72,16.117749 55.882251,-3.65231026e-15 36,0 L36,0 C16.117749,3.65231026e-15 -2.4348735e-15,16.117749 0,36 L0,36 C2.4348735e-15,55.882251 16.117749,72 36,72 Z" fill={(userData && userData.youtube) || youtube ? "#FF0000" : "#808080"} />
                                                <path d="M31.044,42.269916 L31.0425,28.6877416 L44.0115,35.5022437 L31.044,42.269916 Z M59.52,26.3341627 C59.52,26.3341627 59.0505,23.003199 57.612,21.5363665 C55.7865,19.610299 53.7405,19.6012352 52.803,19.4894477 C46.086,19 36.0105,19 36.0105,19 L35.9895,19 C35.9895,19 25.914,19 19.197,19.4894477 C18.258,19.6012352 16.2135,19.610299 14.3865,21.5363665 C12.948,23.003199 12.48,26.3341627 12.48,26.3341627 C12.48,26.3341627 12,30.2467232 12,34.1577731 L12,37.8256098 C12,41.7381703 12.48,45.6492202 12.48,45.6492202 C12.48,45.6492202 12.948,48.9801839 14.3865,50.4470165 C16.2135,52.3730839 18.612,52.3126583 19.68,52.5135736 C23.52,52.8851913 36,53 36,53 C36,53 46.086,52.9848936 52.803,52.4954459 C53.7405,52.3821478 55.7865,52.3730839 57.612,50.4470165 C59.0505,48.9801839 59.52,45.6492202 59.52,45.6492202 C59.52,45.6492202 60,41.7381703 60,37.8256098 L60,34.1577731 C60,30.2467232 59.52,26.3341627 59.52,26.3341627 L59.52,26.3341627 Z" fill="#FFF" />
                                            </g>
                                        </svg>
                                    </Link>
                                    <div onClick={showSocialModal} className='flex cursor-pointer items-center justify-center w-[35px] h-[35px] rounded-full bg-gray-700'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>
                                    </div>
                                </div>
                            </div> :
                            <div className='flex items-center flex-col px-5 border-l py-4 justify-center'>
                                <h4 className=''>Became top 3 Creator with most downloads</h4>
                                <h4 className=''>Get your social media feautred on our website</h4>
                                <Link className='mt-2' href={`/${locale}/leaderboard`}>
                                    <button className="px-5 text-mg py-1.5 rounded-md text-white bg-[#0E7490] items-center flex gap-2 justify-center font-semibold">
                                        Leaderboard
                                    </button>
                                </Link>
                            </div>
                        }
                    </div>
                </div>

                <div className='flex w-full mt-10 px-5'>
                    <div className='px-2 border-b'></div>
                    <div onClick={() => SetFilters('created')} className={filters === 'created' ? 'border px-4 p-2 cursor-pointer rounded-t-sm text-cyan-600 font-semibold border-b-0' : 'border px-4 p-2 cursor-pointer rounded-sm font-semibold dark:text-white border-t-0 border-l-0 border-r-0'}>Created</div>
                    <div onClick={() => SetFilters('favourite')} className={filters === 'favourite' ? 'border px-4 p-2 cursor-pointer rounded-t-sm text-cyan-600 font-semibold  border-b-0' : 'border px-4 p-2 cursor-pointer rounded-sm font-semibold dark:text-white border-t-0 border-l-0 border-r-0'}>Favourites</div>
                    <div className='w-full border-b'></div>
                </div>

                <div className='w-full mt-8'>
                    {(() => {
                        if (filters === 'created') {
                            return <Created uploadCheck={uploadCheck} allSoundsOfUser={allSoundsOfUser} setRefreshKey={setRefreshKey} />
                        } else if (filters === 'favourite') {
                            return <Favourites setRefreshKey={setRefreshKey} favoriteSounds={favouriteList} />
                        }
                    })()}
                </div>

            </main>
            <Botbar locale={locale} />
        </>
    );
};

export default ProfilePage;
