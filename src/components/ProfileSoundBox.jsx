import React, { useEffect, useState, useCallback, useRef } from 'react'
import Link from 'next/link';
import CryptoJS from 'crypto-js';
import { deleteSound } from '../database/deleteSound';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";
import whatsapp from '../assets/images/social/whatsapp.png'
import fb from '../assets/images/social/fb.png'
import twitter from '../assets/images/social/twitter.png'
import Image from 'next/image';

const ProfileSoundBox = (props) => {
  const { t } = useTranslation()
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [soundUrl, setSoundUrl] = useState()
  const [shareModal, setShareModal] = useState(false)
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.origin);
    }
  }, []);

  const generatedUrl = `/${props.id}?category=&direct=`;

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(currentUrl + generatedUrl);
    setCopied(true)
  }, [currentUrl, generatedUrl]);

  const loadSound = (encryptedUrl) => {
    const bytes = CryptoJS.AES.decrypt(encryptedUrl, 'myencryptiontext');
    const originalUrl = bytes.toString(CryptoJS.enc.Utf8);
    setSoundUrl(originalUrl)
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      props.handlePlaySound(null);
      setIsPlaying(false);
      setIsLoading(false);
    } else {
      props.handlePlaySound(props.id);
      const audioUrl = soundUrl;
      if (!audioUrl) {
        console.error('No audio URL provided');
        return;
      }

      // Only set src and load when user clicks play button
      if (!audioRef.current.src || audioRef.current.src !== audioUrl) {
        setIsLoading(true);
        audioRef.current.src = audioUrl;
        audioRef.current.load();
      }

      // Function to attempt playing audio
      const attemptPlay = () => {
        if (audioRef.current.readyState >= 2) {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
                setIsLoading(false);
              })
              .catch((error) => {
                console.error('Error playing audio:', error);
                setIsPlaying(false);
                setIsLoading(false);
              });
          }
        } else {
          // Wait for audio to be ready
          const onCanPlay = () => {
            setIsLoading(false);
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  setIsPlaying(true);
                })
                .catch((error) => {
                  console.error('Error playing audio after load:', error);
                  setIsPlaying(false);
                  setIsLoading(false);
                });
            }
            audioRef.current.removeEventListener('canplay', onCanPlay);
            audioRef.current.removeEventListener('canplaythrough', onCanPlay);
          };
          audioRef.current.addEventListener('canplay', onCanPlay);
          audioRef.current.addEventListener('canplaythrough', onCanPlay);
        }
      };

      if (audioRef.current) {
        attemptPlay();
      }
    }
  };

  useEffect(() => {
    loadSound(props.link)
  }, [props.link])

  useEffect(() => {
    if (props.isPlaying) {
      const audioUrl = soundUrl;
      if (audioRef.current && audioUrl) {
        // Only set src and load when playing (lazy load)
        if (!audioRef.current.src || audioRef.current.src !== audioUrl) {
          setIsLoading(true);
          audioRef.current.src = audioUrl;
          audioRef.current.load();
        }

        // Function to attempt playing
        const attemptPlay = () => {
          if (audioRef.current.readyState >= 2) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  setIsPlaying(true);
                  setIsLoading(false);
                })
                .catch((error) => {
                  console.error('Error playing audio in useEffect:', error);
                  setIsPlaying(false);
                  setIsLoading(false);
                });
            }
          } else {
            // Wait for audio to be ready
            const onCanPlay = () => {
              setIsLoading(false);
              const playPromise = audioRef.current.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => setIsPlaying(true))
                  .catch((error) => {
                    console.error('Error playing audio after load in useEffect:', error);
                    setIsPlaying(false);
                    setIsLoading(false);
                  });
              }
              audioRef.current.removeEventListener('canplay', onCanPlay);
              audioRef.current.removeEventListener('canplaythrough', onCanPlay);
            };
            audioRef.current.addEventListener('canplay', onCanPlay);
            audioRef.current.addEventListener('canplaythrough', onCanPlay);
          }
        };

        attemptPlay();
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        setIsLoading(false);
      }
    }
  }, [props.isPlaying, soundUrl]);

  function deleteClicked(id) {
    Swal.fire({
      text: 'Do you want to continue?',
      icon: 'warning',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSound(id).then(() => {
          toast.error('Sound deleted successfully')
          props.handleRefresh()
        })
      }
    })
  };



  return (
    <>
      <div
        key={props.id}
        className="h-[200px] flex flex-col items-center justify-between p-2 mx-auto max-w-[170px] rounded-md"
        style={{ backgroundColor: props.color }}>
        <Link
          href={{
            pathname: `/${props.id}-${props.name.replace(/\s+/g, '-')}`,
          }}>
          <div className="flex flex-col justify-between h-[110px] gap-5">
            <h3 className="text-center w-full mt-1 word-break: break-all; text-sm font-semibold text-[#E7E7EA] ">{props.name}</h3>
            <div className='flex justify-center w-full items-center'>
              {isPlaying ?
                <svg aria-hidden="true" className="w-full audiogram  md:h-[40px]" viewBox="0 0 135 40" fill="" xmlns="http://www.w3.org/2000/svg">
                  <rect className='audio-bar' x="7" y="15.5" width="3" height="9" rx="1.5" fill="#E5E7EB" />
                  <rect className='audio-bar' x="14" y="10" width="3" height="20" rx="1.5" fill="#E5E7EB" />
                  <rect className='audio-bar' x="21" y="6.5" width="3" height="27" rx="1.5" fill="#E5E7EB" />
                  <rect className='audio-bar' x="28" y="3" width="3" height="34" rx="1.5" fill="#E5E7EB" />
                  <rect className='audio-bar' x="35" y="3" width="3" height="34" rx="1.5" fill="#E5E7EB" />
                  <rect className='audio-bar' x="42" y="5.5" width="3" height="29" rx="1.5" fill="#E5E7EB" />
                  <rect className='audio-bar' x="49" y="10" width="3" height="20" rx="1.5" fill="#E5E7EB" />
                  <rect className='audio-bar' x="56" y="13.5" width="3" height="13" rx="1.5" fill="#E5E7EB" />
                  <rect className='audio-bar' x="63" y="16" width="3" height="8" rx="1.5" fill="#E5E7EB" />
                  <rect className='audio-bar' x="70" y="15.5" width="3" height="9" rx="1.5" fill="#E5E7EB" />
                  <rect className='audio-bar' x="77" y="10" width="3" height="20" rx="1.5" fill="#E5E7EB" />
                  <rect className='audio-bar' x="84" y="6.5" width="3" height="27" rx="1.5" fill="#E5E7EB" />
                  <rect className='audio-bar' x="91" y="3" width="3" height="34" rx="1.5" fill="#E5E7EB" />
                  <rect className='audio-bar' x="98" y="3" width="3" height="34" rx="1.5" fill="#E5E7EB" />
                  <rect className='audio-bar' x="105" y="5.5" width="3" height="29" rx="1.5" fill="#E5E7EB" />
                  <rect className='audio-bar' x="112" y="10" width="3" height="20" rx="1.5" fill="#E5E7EB" />
                  <rect className='audio-bar' x="119" y="13.5" width="3" height="13" rx="1.5" fill="#E5E7EB" />
                  <rect className='audio-bar' x="126" y="16.5" width="3" height="8" rx="1.5" fill="#E5E7EB" />
                </svg> :
                <svg aria-hidden="true" className="w-full md:h-[40px] " viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="7" y="15.5" width="3" height="9" rx="1.5" fill="#E5E7EB" />
                  <rect x="14" y="10" width="3" height="20" rx="1.5" fill="#E5E7EB" />
                  <rect x="21" y="6.5" width="3" height="27" rx="1.5" fill="#E5E7EB" />
                  <rect x="28" y="3" width="3" height="34" rx="1.5" fill="#E5E7EB" />
                  <rect x="35" y="3" width="3" height="34" rx="1.5" fill="#E5E7EB" />
                  <rect x="42" y="5.5" width="3" height="29" rx="1.5" fill="#E5E7EB" />
                  <rect x="49" y="10" width="3" height="20" rx="1.5" fill="#E5E7EB" />
                  <rect x="56" y="13.5" width="3" height="13" rx="1.5" fill="#E5E7EB" />
                  <rect x="63" y="16" width="3" height="8" rx="1.5" fill="#E5E7EB" />
                  <rect x="70" y="15.5" width="3" height="9" rx="1.5" fill="#E5E7EB" />
                  <rect x="77" y="10" width="3" height="20" rx="1.5" fill="#E5E7EB" />
                  <rect x="84" y="6.5" width="3" height="27" rx="1.5" fill="#E5E7EB" />
                  <rect x="91" y="3" width="3" height="34" rx="1.5" fill="#E5E7EB" />
                  <rect x="98" y="3" width="3" height="34" rx="1.5" fill="#E5E7EB" />
                  <rect x="105" y="5.5" width="3" height="29" rx="1.5" fill="#E5E7EB" />
                  <rect x="112" y="10" width="3" height="20" rx="1.5" fill="#E5E7EB" />
                  <rect x="119" y="13.5" width="3" height="13" rx="1.5" fill="#E5E7EB" />
                  <rect x="126" y="16.5" width="3" height="8" rx="1.5" fill="#E5E7EB" />
                </svg>}
            </div>
          </div>
        </Link>
        <div className="flex justify-center items-center gap-1">

          <svg className='cursor-pointer' onClick={() => { setShareModal(true), setCopied(false) }} xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="22px" fill="#e8eaed">
            <path d="M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T638-672L356-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-640q17 0 28.5-11.5T760-760q0-17-11.5-28.5T720-800q-17 0-28.5 11.5T680-760q0 17 11.5 28.5T720-720ZM240-440q17 0 28.5-11.5T280-480q0-17-11.5-28.5T240-520q-17 0-28.5 11.5T200-480q0 17 11.5 28.5T240-440Zm480 280q17 0 28.5-11.5T760-200q0-17-11.5-28.5T720-240q-17 0-28.5 11.5T680-200q0 17 11.5 28.5T720-160Zm0-600ZM240-480Zm480 280Z" />
          </svg>

          <audio 
            onEnded={() => {
              setIsPlaying(false);
              setIsLoading(false);
            }} 
            ref={audioRef} 
            preload="none"
            onError={(e) => {
              console.error('Audio load error:', e);
              setIsPlaying(false);
              setIsLoading(false);
            }}
          ></audio>
          {isPlaying ?
            <svg onClick={handlePlayPause} className='w-16 cursor-pointer h-12' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e8eaed"><path d="M564-284v-392h139.5v392H564Zm-307 0v-392h139.5v392H257Z" /></svg>
            :
            <svg onClick={handlePlayPause} className="w-16 cursor-pointer h-12 pl-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e8eaed"><path d="M320-200v-560l440 280-440 280Z" /></svg>
          }
          <svg className='cursor-pointer' onClick={() => deleteClicked(props.id || props.uid)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        </div>
      </div>

      {shareModal &&
        <div class="fixed inset-0 z-[999999] bg-black/25 dark:bg-black/50 ">
          <div class="flex items-center justify-center h-full">
            <div class="relative bg-white w-full sm:w-auto mx-5 dark:bg-darkSurface-200 rounded-xl px-16 py-8 text-black dark:text-white">
              <button
                onClick={() => { setIsBoxVisible(false), setShareModal(false) }}
                class="absolute right-3 top-3 cursor-pointer"
                aria-label="close modal"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L16.9993 16.9993"
                    class="stroke-black  dark:stroke-white"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M1 16.9993L16.9993 1"
                    class="stroke-black  dark:stroke-white"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </button>
              <div class="capitalize font-semibold text-[22px] text-center">
                <div className='w-full items-center flex flex-col gap-5'>
                  <div>
                    <h4 className="text-2xl">{t("shareonsocialmedia")}</h4>
                  </div>
                  <div className='flex relative gap-3'>
                    <Link href={`whatsapp://send?text=${currentUrl + generatedUrl}`}>
                      <Image className='w-8 img h-8' loading="lazy" src={whatsapp} alt="whatsapp" />
                    </Link>
                    <Link target='_blank' href={`https://www.facebook.com/sharer/sharer.php?${currentUrl + generatedUrl}`}>
                      <Image className='w-8 img h-8' loading="lazy" src={fb} alt="facebook" />
                    </Link>
                    <Link target='_blank' href={`http://www.twitter.com/share?url=${currentUrl + generatedUrl}`}>
                      <Image className='w-8 img h-8' loading="lazy" src={twitter} alt="twitter" />
                    </Link>
                    <div>
                      <div onClick={() => setIsBoxVisible(!isBoxVisible)} className='bg-[#607D8B] w-8 cursor-pointer h-8 rounded-full flex items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" /></svg>
                      </div>
                    </div>
                  </div>
                  {isBoxVisible && (

                    <div className=' bg-white flex flex-col items-center max-w-full'>
                      <p className='text-center mb-4 text-sm break-words overflow-wrap'>
                        {currentUrl && currentUrl + generatedUrl}
                      </p>
                      <div
                        className='bg-blue-500 cursor-pointer text-sm w-[130px] text-white px-8 py-2 rounded '
                        onClick={copyToClipboard}
                      >
                        {
                          copied ? 'Copied' : ' Copy URL'
                        }
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      }
    </>
  )
}

export default ProfileSoundBox
