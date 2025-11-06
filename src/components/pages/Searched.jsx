'use client';
import '../../app/i18n';
import { useEffect, useState } from 'react';
import Botbar from '@/components/footer/Botbar';
import { useTranslation } from 'react-i18next';
import Soundbox from '@/components/Soundbox';
import { useContext } from 'react';
import { ThemeContext } from '@/components/context/theme-context';
import { NavbarHead } from '../header/NavbarHead';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';
import { soundsAPI } from "../../lib/apiServices";
import Loading, { LoadingInline } from '../loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FixedAds from '../adsbygoogle/FixedAds';
import MobileAd from '../adsbygoogle/MobileAd';
import Ads from '../adsbygoogle/Ads';

const Searched = ({ searchText, locale = 'en', catAlias, catUrl }) => {
    const router = useRouter()
    
    // Decode URL-encoded characters and replace dashes with spaces
    const decodedSearchText = decodeURIComponent(searchText || '').replace(/-/g, ' ');
    
    const [searchQuery, setSearchQuery] = useState(decodedSearchText);
    const [visibleSoundsCount, setVisibleSoundsCount] = useState(40);
    const [currentLimit, setCurrentLimit] = useState(40);
    const [totalCount, setTotalCount] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);
    const { theme } = useContext(ThemeContext);
    const [currentlyPlayingSound, setCurrentlyPlayingSound] = useState(null);
    const [logedIn, setLogedIn] = useState(false);
    const [searchedSounds, setSearchedSounds] = useState();

    async function doSearchSounds(searchQuery) {
        try {
            const response = await soundsAPI.getAllSounds({ 
                search: searchQuery, 
                page: 1, 
                limit: 40 
            });
            setSearchedSounds(response.data?.data || response.data || []);
            setTotalCount(response.data?.total || 0);
            setCurrentLimit(40);
            setVisibleSoundsCount(40);
        } catch (error) {
            console.error('Error searching sounds:', error);
            setSearchedSounds([]);
            setTotalCount(0);
        }
    }

    useEffect(() => {
        if (decodedSearchText) {
            const formattedSearchText = decodedSearchText.replace(/-/g, ' '); // Replace dashes with spaces
            doSearchSounds(formattedSearchText);
        }
    }, [decodedSearchText]);

    const { t } = useTranslation();

    const handleSearchChange = (e) => {
        e.preventDefault()
        if (searchQuery) {
            const formattedQuery = searchQuery.replace(/\s+/g, '-'); // Replace spaces with dashes
            router.push(`/${locale}/search/${formattedQuery}`);
        }
    }

    const handlePlaySound = (soundId) => {
        setCurrentlyPlayingSound(soundId);
    };

    async function handleShowMoreSounds() {
        if (decodedSearchText && !loadingMore) {
            setLoadingMore(true);
            try {
                const formattedSearchText = decodedSearchText.replace(/-/g, ' ');
                const newLimit = currentLimit + 20;
                
                const response = await soundsAPI.getAllSounds({ 
                    search: formattedSearchText, 
                    page: 1, 
                    limit: newLimit 
                });
                
                const allSounds = response.data?.data || response.data || [];
                
                // Remove duplicates based on sound ID
                const existingIds = new Set(searchedSounds.map(sound => sound.id));
                const newSounds = allSounds.filter(sound => !existingIds.has(sound.id));
                
                // Merge with existing sounds
                const mergedArray = [...searchedSounds, ...newSounds];
                
                setCurrentLimit(newLimit);
                setVisibleSoundsCount(mergedArray.length);
                setSearchedSounds(mergedArray);
                setTotalCount(response.data?.total || 0);
                
            } catch (error) {
                console.error('Error loading more sounds:', error);
            } finally {
                setLoadingMore(false);
            }
        }
    }

    useEffect(() => {
        // const unsubscribe = onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //         setLogedIn(true)
        //     } else {
        //         setLogedIn(false)
        //     }
        // });
        // return () => unsubscribe();
    }, [router]);

    function handleUpload() {
        if (logedIn) {
            router.push('/profile?upload=true')
        } else {
            router.push('/login')
        }
    }

    return (
        <div className={theme}>
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
            <main className="hidebar w-full dark:bg-[#212D3D] relative flex min-h-screen flex-col items-center">
                <NavbarHead locale={locale} />

                <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                    className="absolute -z-[999] top-[60px] transform -scale-x-100 hidden w-full h-[700px] md:block"
                >
                    <defs>
                        <linearGradient id="sw-gradient-0" x1="1" x2="0" y1="1" y2="0">
                            <stop stopColor="hsl(217, 102%, 99%)" offset="0%"></stop>
                            <stop stopColor="hsl(217,88%, 93%)" offset="100%"></stop>
                        </linearGradient>
                    </defs>
                    <path
                        className="fill-[url(#sw-gradient-0)] dark:fill-[#171F2D]"
                        d="M 0.351 264.418 C 0.351 264.418 33.396 268.165 47.112 270.128 C 265.033 301.319 477.487 325.608 614.827 237.124 C 713.575 173.504 692.613 144.116 805.776 87.876 C 942.649 19.853 1317.845 20.149 1440.003 23.965 C 1466.069 24.779 1440.135 24.024 1440.135 24.024 L 1440 0 L 1360 0 C 1280 0 1120 0 960 0 C 800 0 640 0 480 0 C 320 0 160 0 80 0 L 0 0 L 0.351 264.418 Z"
                    ></path>
                </svg>

                <Breadcrumb first={t("home")} second={t("search")} secondLink={'search'} third={`${t("search_results")} - ${decodedSearchText}`} locale={locale} />

                {/* Title and Description */}
                <div className="mt-[40px] w-full flex flex-col items-center gap-3 md:gap-6 px-5">
                    <h1 className='gradtext font-semibold text-center drop-shadow-lg text-2xl md:text-4xl'>
                        {t("search_results")} - {decodedSearchText}
                    </h1>
                    <p className="md:w-2/3 text-center hidden md:block text-[#2A2A2A] dark:text-gray-100">
                        {t("search_description")} : {decodedSearchText}
                    </p>
                    <p className="md:w-2/3 text-center md:hidden text-[#2A2A2A] dark:text-gray-100">
                        {t("search_description")} : {decodedSearchText}
                    </p>
                </div>

                {/* Filters and Search */}
                <div className=" xl:w-[70%] mt-[40px] w-full px-5 xl:px-0 gap-5 flex flex-col-reverse lg:flex-row items-center justify-between">
                    <div>
                        <form onSubmit={(e) => handleSearchChange(e)} className="flex items-center w-full sm:max-w-sm mx-auto md:mx-0">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    id="simple-search"
                                    className="shadow border md:w-[350px] border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:text-white"
                                    placeholder={t('searchsound')}
                                    value={searchQuery.replace(/-/g, ' ')}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-[#0E7490] rounded-lg border border-[#0E7490] hover:bg-[#1f4b58] focus:ring-4 focus:outline-none">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span class="sr-only">Search</span>
                            </button>
                        </form>
                    </div>
                </div>
                <div className='xl:block hidden fixed bottom-0 left-1/2  -translate-x-1/2 z-40 '>
          <FixedAds/>
          </div>
          <div className='lg:hidden block  fixed bottom-0 left-1/2  -translate-x-1/2 z-40 '>
          <MobileAd/>
          </div>
          <div className=' hidden  xl:block fixed left-0 top-[55%] w-[12%] h-[600px] -translate-y-1/2 z-40  '>
           <Ads adSlot="1651339077" className="w-full h-full"/>
          </div>
          <div className='hidden xl:block fixed right-0 top-[55%] w-[12%] h-[600px] -translate-y-1/2 z-40 '>
          <Ads adSlot="1651339077" className="w-full h-full"/>
          </div>

                {/* Sounds */}
                {!searchedSounds ?
                    <Loading />
                    :
                    !searchedSounds.length > 0 ?
                        <div className='flex  flex-col py-20 gap-3 w-full items-center justify-center'>
                            <h3 className='text-4xl font-semibold'>{t("no_result_found")}</h3>
                            <div className='text-center text-lg'>
                                <p>{t('we_are_sorry')} <i><b>{decodedSearchText}</b></i>.</p>
                                <p>{t('please_try')}</p>
                            </div>
                            <div className='text-center text-lg'>
                                <p><b>{t('or')}</b></p>
                            </div>
                            <div>
                                <button onClick={handleUpload} className="px-2 pr-3 py-2 w-[170px] rounded-md text-white items-center flex gap-2 bg-[#0E7490] justify-center font-semibold">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#e8eaed"><path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" /></svg>
                                    Upload&nbsp;Sound
                                </button>
                            </div>
                        </div>
                        :
                        <div className="w-[90%] xl:w-[70%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 my-8 gap-5">
                            {searchedSounds.map((sound) => (
                                <div key={sound.id}>
                                    <Soundbox
                                        authorId={sound.author}
                                        id={sound.id}
                                        name={sound.name}
                                        url={sound.url}
                                        tags={sound.tags}
                                        color={sound.color}
                                        description={sound.description}
                                        favorites={sound.favorites}
                                        downloads={sound.downloads}
                                        category={catAlias}
                                        categoryUrl={catUrl}
                                        isPlaying={currentlyPlayingSound === sound.id}
                                        handlePlaySound={handlePlaySound}
                                        locale={locale}
                                    />
                                </div>
                            ))
                            }
                        </div>
                }


                {/* Show More Button */}
                {totalCount > 0 && visibleSoundsCount < totalCount ? (
                    <div className="w-full mb-16 flex justify-center">
                        <button
                            onClick={handleShowMoreSounds}
                            disabled={loadingMore}
                            className="group inline-flex items-center justify-center p-0.5 text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-[#00549F] via-[#0071FF] to-[#00A4FF] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="relative px-5 py-2.5 dark:text-white bg-white hover:text-white dark:bg-[#171F2D] rounded-md group-hover:bg-opacity-0">
                                {loadingMore ? (
                                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Loading...
                                  </div>
                                ) : (
                                  'Show more'
                                )}
                            </span>
                        </button>
                    </div>
                ) : null}

                <Botbar locale={locale} />
            </main>
        </div>
    );
};

export default Searched;
