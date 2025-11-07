'use client'
import logo from '../../assets/images/logo.png'
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import { Navbar, MegaMenu } from "flowbite-react";
import Link from "next/link";
import Image from 'next/image';
import { useTranslation } from "react-i18next";

const LoginPage = ({ uploadCheck, locale = 'en' }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)

    const signInWithGoogle = () => {
        try {
            // Get the API base URL from environment or use default
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sound-effect-buttons-7cv7.onrender.com';
            
            // Simply redirect to the API endpoint - backend will handle OAuth and redirect back
            window.location.href = `${apiBaseUrl}/auth/google`;
        } catch (error) {
            console.error('Error signing in with Google:', error);
            alert('Sign-in failed. Please try again.');
        }
    };

    return (
        <>
            <MegaMenu className="w-full fixed dark:bg-gray-900 border-b z-[9999]" fluid>
                <Navbar.Brand
                    className="flex gap-3"
                    as={Link}
                    href={`/${locale}`}
                >
                    <Image className="img w-8" src={logo} alt="logo" />
                    <h2 className="gradtext font-semibold  text-center drop-shadow-lg text-xl md:text-2xl">
                        SoundEffectButtons
                    </h2>
                </Navbar.Brand>
            </MegaMenu>
            <div class="bg-gray-100 dark:bg-[#171F2D] min-h-screen flex items-center justify-center">
                <div className="relative bg-white dark:bg-[#111827] px-5 md:px-10 shadow-lg rounded-lg mt-[80px] md:mt-0 overflow-hidden max-w-lg">
                    <div className="relative space-y-8  p-8">
                        <div
                            className="flex flex-col  items-center gap-3">
                            <Image className="img w-12" src={logo} alt="logo" />
                            <h2 className="gradtext font-semibold text-center drop-shadow-lg text-2xl md:text-3xl">
                                SoundEffectButtons
                            </h2>
                            <p className='text-center'>{t('mobile_description')}</p>
                        </div>
                        {loading ?
                            <div className='w-full flex flex-col items-center pb-[100px]'>
                                <p className='font-semibold pb-[30px]'>Creating/Updating your profile</p>
                                <div class="boxes">
                                    <div class="box">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                    <div class="box">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                    <div class="box">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                    <div class="box">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                            </div> :
                            <div class="space-y-5 ">
                                <button
                                    onClick={signInWithGoogle}
                                    className="flex border cursor-pointer bg-white shadow rounded-md w-full items-center justify-center h-[80px] gap-3 font-semibold"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="28"
                                        height="28"
                                        viewBox="0 0 32 32"
                                        data-name="Layer 1"
                                        id="Layer_1"
                                    >
                                        <path
                                            d="M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16"
                                            fill="#00ac47"
                                        />
                                        <path
                                            d="M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16"
                                            fill="#4285f4"
                                        />
                                        <path
                                            d="M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z"
                                            fill="#ffba00"
                                        />
                                        <polygon
                                            fill="#2ab2db"
                                            points="8.718 13.374 8.718 13.374 8.718 13.374 8.718 13.374"
                                        />
                                        <path
                                            d="M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z"
                                            fill="#ea4435"
                                        />
                                        <polygon
                                            fill="#2ab2db"
                                            points="8.718 18.626 8.718 18.626 8.718 18.626 8.718 18.626"
                                        />
                                        <path
                                            d="M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z"
                                            fill="#4285f4"
                                        />
                                    </svg>
                                    Login with Google
                                </button>
                                {/* <button className="flex border cursor-pointer bg-white shadow rounded-md w-full items-center justify-center h-[45px] gap-3 font-semibold">
                                    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" id="apple"><path d="M30.54 26.24a14 14 0 0 1-1.41 2.52 13.16 13.16 0 0 1-1.8 2.24A3.55 3.55 0 0 1 25 32a5.94 5.94 0 0 1-2.15-.51 6.13 6.13 0 0 0-2.31-.49 6.42 6.42 0 0 0-2.38.51 6.49 6.49 0 0 1-2.05.54A3.35 3.35 0 0 1 13.73 31a14 14 0 0 1-1.89-2.27 15.54 15.54 0 0 1-2-4A14.55 14.55 0 0 1 9 20a8.6 8.6 0 0 1 1.14-4.52A6.6 6.6 0 0 1 12.51 13a6.44 6.44 0 0 1 3.22-.91 7.7 7.7 0 0 1 2.49.58 7.67 7.67 0 0 0 2 .58 12 12 0 0 0 2.19-.68 7.23 7.23 0 0 1 3-.53 6.34 6.34 0 0 1 4.95 2.61 5.48 5.48 0 0 0-2.92 5 5.52 5.52 0 0 0 1.81 4.16A6.18 6.18 0 0 0 31 25c-.15.42-.3.82-.46 1.21ZM25.5 6.4a5.59 5.59 0 0 1-1.43 3.66 4.85 4.85 0 0 1-4 2 3.79 3.79 0 0 1 0-.49 5.7 5.7 0 0 1 1.51-3.69 5.85 5.85 0 0 1 1.85-1.39 5.65 5.65 0 0 1 2.11-.6 4.67 4.67 0 0 1 0 .52Z" /></svg>
                                    Login with Apple
                                </button>
                                <button className="flex border cursor-pointer bg-white shadow rounded-md w-full items-center justify-center h-[45px] gap-3 font-semibold">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="28px" height="28px" clip-rule="evenodd" baseProfile="basic"><path fill="#212121" fill-rule="evenodd" d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28 c2.209,0,4,1.791,4,4v28C42,40.209,40.209,42,38,42z" clip-rule="evenodd" /><path fill="#fff" d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z" /><polygon fill="#fff" points="15.866,34 23.069,25.656 22.127,24.407 13.823,34" /><polygon fill="#fff" points="24.45,21.721 25.355,23.01 33.136,14 31.136,14" /></svg>
                                    Login with X
                                </button> */}
                            </div>
                        }

                        <div className='flex items-center flex-col'>
                            <p className="text-gray-600 dark:text-gray-300">{t('connect_with_us_label')}</p>
                            <div className="flex space-x-4 mt-2">
                                <Link className='cursor-pointer' target='_blank' href={'https://www.instagram.com/soundeffectbuttons/'}>
                                    <div className="w-8 h-8 rounded bg-[#0A75C5] text-white flex items-center justify-center hover:bg-[#0A75C5]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill='white' viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                    </div>
                                </Link>
                                <Link className='cursor-pointer' target='_blank' href={'https://x.com/soundeffectsseb'}>
                                    <div className="w-8 h-8 rounded bg-[#0A75C5] text-white flex items-center justify-center hover:bg-[#0A75C5]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill='white' viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                                    </div>
                                </Link>
                                <Link className='cursor-pointer' target='_blank' href={'https://www.facebook.com/people/Sound-Effect-Buttons/61569888634612/'}>

                                    <div className="w-8 h-8 rounded bg-[#0A75C5] text-white flex items-center justify-center hover:bg-[#0A75C5]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill='white' viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                                    </div>
                                </Link>
                                <Link className='cursor-pointer' target='_blank' href={'https://www.youtube.com/@SoundEffectButtons'}>
                                    <div className="w-8 h-8 rounded bg-[#0A75C5] text-white flex items-center justify-center hover:bg-[#0A75C5]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill='white' viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default LoginPage;
