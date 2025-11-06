'use client';
import '@/app/i18n';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState, useCallback, useMemo } from 'react';
import Botbar from '@/components/footer/Botbar';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ThemeContext } from '@/components/context/theme-context';
import { NavbarHead } from '@/components/header/NavbarHead';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb';
import { useRouter } from 'next/navigation';

const Search = ({ params }) => {
    const { locale } = params;
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState();
    const { theme } = useContext(ThemeContext);

    const { t } = useTranslation();

    const handleSearchChange = (e) => {
        e.preventDefault()
        if (searchQuery) {
            router.push(`/${locale}/search/${searchQuery}`)
        }
    }

    useEffect(() => {
        AOS.init({
            duration: 600,
            once: false,
        });
    }, []);

    return (
        <>
            <head>
                <title>Search For Your Favourite Soundboard</title>
                <meta
                    name="description"
                    content=" Use our search to instantly access millions of sound effects. Get high-quality audio in seconds for any project type."
                />
            </head>
            <div className={theme}>
                <main className="hidebar w-full dark:bg-[#212D3D] relative flex min-h-screen flex-col items-center">
                    <NavbarHead locale={locale} />

                    {/* Backgrounds */}
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

                    <Breadcrumb first={'Home'} second={'Search'} secondLink={''} locale={locale} />

                    {/* Title and Description */}
                    <div className="mt-[40px] w-full flex flex-col items-center gap-3 md:gap-6 px-5">
                        <h1
                            className='gradtext font-semibold text-center drop-shadow-lg text-2xl md:text-4xl'
                        >
                            Search Sounds
                        </h1>
                        <p className="md:w-2/3 text-center hidden md:block text-[#2A2A2A] dark:text-gray-100">
                            🔍 Search for millions of sound effect buttons here, and we will get back to you with the best and highest quality audio within a fraction of a second.
                        </p>
                        <p className="md:w-2/3 text-center md:hidden text-[#2A2A2A] dark:text-gray-100">
                            🔍 Search for millions of sound effect buttons here
                        </p>
                    </div>

                    {/* Filters and Search */}
                    <div className="md:w-[75%] mt-[40px] w-full px-5 gap-5 flex flex-col-reverse lg:flex-row items-center justify-between">
                        <div>
                            <form onSubmit={(e) => handleSearchChange(e)} className="flex items-center w-full sm:max-w-sm mx-auto md:mx-0">
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        id="simple-search"
                                        className="shadow border md:w-[350px] border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:text-white"
                                        placeholder={t('searchsound')}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                    <span class="sr-only">Search</span>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Sounds */}

                    <div className='flex dark:text-white flex-col py-20 gap-3 w-full items-center justify-center'>
                        <h3 className='text-4xl font-semibold'>Universal Sound Search</h3>
                        <div className='text-center dark:text-gray-400 text-lg'>
                            <p>Search Sound by name from any category.</p>
                        </div>
                    </div>

                    <Botbar locale={locale} />
                </main>
            </div>
        </>
    );
};

export default Search;








