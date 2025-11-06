"use client"
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { RWebShare } from "react-web-share";
import { getSoundById } from '../../../database/getSounddById';
import { useParams } from 'next/navigation';
import CryptoJS from 'crypto-js';

const Embed = () => {

    const [soundUrl, setSoundUrl] = useState()
    const [soundData, setSoundData] = useState()
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentUrl, setCurrentUrl] = useState()
    const audioRef = useRef(null);
    const params = useParams();
    const [id, ...nameParts] = params.sound.split('-')

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href);
        }
    }, []);

    async function getherSoundData() {
        const soundDataa = await getSoundById(id);
        setSoundData(soundDataa)
    }

    useEffect(() => {
        if (id) {
            getherSoundData()
        }
    }, [id])

    useEffect(() => {
        if (soundData) {
            const bytes = CryptoJS.AES.decrypt(soundData.link, 'myencryptiontext');
            const originalUrl = bytes.toString(CryptoJS.enc.Utf8);
            setSoundUrl(originalUrl)
        }
    }, [soundData])

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause(); // Pause the audio
        } else {
            audioRef.current.play(); // Play the audio
        }
        setIsPlaying(!isPlaying); // Toggle the play state
    };

    return (
        <div>
            <div
                key={id}
                // data-aos="fade-up"
                className="h-[200px] flex flex-col items-center justify-between p-2 mx-auto w-full max-w-[170px] rounded-md"
                style={{ backgroundColor: soundData && soundData.color }}
            >
                <div className="flex flex-col justify-between w-full h-[110px] gap-5">
                    <h3 className="text-center w-full mt-1 break-words text-sm font-semibold text-[#E7E7EA] truncate-ellipsis">
                        {soundData && soundData.name}
                    </h3>
                    <div className="flex justify-center w-full items-center">
                        {isPlaying ?
                            <div className="flex flex-row gap-1 items-center justify-center">
                                <div className="wave rounded-full w-2 h-4 bg-white" style={{ "--i": ".4s" }}></div>
                                <div className="wave rounded-full w-2 h-8 bg-gray-100" style={{ "--i": ".4s" }}></div>
                                <div className="wave rounded-full w-2 h-4 bg-gray-200" style={{ "--i": ".4s" }}></div>
                                <div className="wave rounded-full w-2 h-6 bg-gray-300" style={{ "--i": ".2s" }}></div>
                                <div className="wave rounded-full w-2 h-12 bg-white" style={{ "--i": ".3s" }}></div>
                                <div className="wave rounded-full w-2 h-18 bg-gray-100" style={{ "--i": ".4s" }}></div>
                                <div className="wave rounded-full w-2 h-12 bg-white" style={{ "--i": ".3s" }}></div>
                                <div className="wave rounded-full w-2 h-6 bg-gray-300" style={{ "--i": ".2s" }}></div>
                                <div className="wave rounded-full w-2 h-4 bg-gray-200" style={{ "--i": ".4s" }}></div>
                                <div className="wave rounded-full w-2 h-8 bg-gray-100" style={{ "--i": ".4s" }}></div>
                                <div className="wave rounded-full w-2 h-4 bg-white" style={{ "--i": ".4s" }}></div>
                            </div> :
                            <div className="flex flex-row gap-1 items-center justify-center">
                                <div className=" rounded-full w-2 h-4 bg-white" style={{ "--i": ".4s" }}></div>
                                <div className=" rounded-full w-2 h-8 bg-gray-100" style={{ "--i": ".4s" }}></div>
                                <div className=" rounded-full w-2 h-4 bg-gray-200" style={{ "--i": ".4s" }}></div>
                                <div className=" rounded-full w-2 h-6 bg-gray-300" style={{ "--i": ".2s" }}></div>
                                <div className=" rounded-full w-2 h-12 bg-white" style={{ "--i": ".3s" }}></div>
                                <div className=" rounded-full w-2 h-18 bg-gray-100" style={{ "--i": ".4s" }}></div>
                                <div className=" rounded-full w-2 h-12 bg-white" style={{ "--i": ".3s" }}></div>
                                <div className="rounded-full w-2 h-6 bg-gray-300" style={{ "--i": ".2s" }}></div>
                                <div className=" rounded-full w-2 h-4 bg-gray-200" style={{ "--i": ".4s" }}></div>
                                <div className="rounded-full w-2 h-8 bg-gray-100" style={{ "--i": ".4s" }}></div>
                                <div className=" rounded-full w-2 h-4 bg-white" style={{ "--i": ".4s" }}></div>
                            </div>}
                    </div>
                </div>

                <div className="flex justify-around w-full items-center px-3">
                    <RWebShare
                        data={{
                            text: `Download and Share ${soundData && soundData.name} sound effect button`,
                            title: 'Sound Effect Buttons',
                            url: (currentUrl && currentUrl.replace(/\/embed\/$/, ""))
                        }}
                    >
                        <svg
                            className='cursor-pointer'
                            xmlns="http://www.w3.org/2000/svg"
                            height="19px"
                            viewBox="0 -960 960 960"
                            width="20px"
                            fill="#e8eaed"
                        >
                            <path d="M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T638-672L356-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-640q17 0 28.5-11.5T760-760q0-17-11.5-28.5T720-800q-17 0-28.5 11.5T680-760q0 17 11.5 28.5T720-720ZM240-440q17 0 28.5-11.5T280-480q0-17-11.5-28.5T240-520q-17 0-28.5 11.5T200-480q0 17 11.5 28.5T240-440Zm480 280q17 0 28.5-11.5T760-200q0-17-11.5-28.5T720-240q-17 0-28.5 11.5T680-200q0 17 11.5 28.5T720-160Zm0-600ZM240-480Zm480 280Z" />
                        </svg>
                    </RWebShare>

                    <audio onEnded={() => setIsPlaying(false)} ref={audioRef} src={soundUrl}></audio>
                    {isPlaying ? (
                        <svg
                            onClick={handlePlayPause}
                            className=" cursor-pointer "
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960"
                            fill="#e8eaed"
                            height='32px'
                            width='32px'
                        >
                            <path d="M564-284v-392h139.5v392H564Zm-307 0v-392h139.5v392H257Z" />
                        </svg>
                    ) : (
                        <svg
                            onClick={handlePlayPause}
                            className=" cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#e8eaed"><path d="M320-200v-560l440 280-440 280Z" /></svg>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Embed
