"use client";
import "../../app/i18n";
import { NavbarHead } from "../header/NavbarHead";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import Botbar from "@/components/footer/Botbar";
import { useTranslation } from "react-i18next";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { soundsAPI } from "../../lib/apiServices";
import Soundbox from "@/components/Soundbox";
import { useSearchParams } from "next/navigation";
import { transformSoundsArray } from "../../lib/dataTransformers";
import { RWebShare } from "react-web-share";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FixedAds from "../adsbygoogle/FixedAds";
import Ads from "../adsbygoogle/Ads";
import MobileAd from "../adsbygoogle/MobileAd";
import { LoadingInline } from "@/components/loading/Loading";

export default function Sound({ slug, frameUrl, soundObj, locale = 'en' }) {
  console.log('soundObj', soundObj);
  const { t } = useTranslation();
  const audioRef = useRef(null);
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [theme, setTheme] = useState(false);
  const [soundUrl, setSoundUrl] = useState();
  const [favourited, setFavourited] = useState(false);
  const [visibleSoundsCount, setVisibleSoundsCount] = useState(40);
  const [animate, setAnimate] = useState(false);
  const [similarSounds, setSimilarSounds] = useState();
  const [currentlyPlayingSound, setCurrentlyPlayingSound] = useState(null);
  const [logedIn, setLogedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentLimit, setCurrentLimit] = useState(40);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLoadingSimilarSounds, setIsLoadingSimilarSounds] = useState(!!soundObj);
  const [adding, setAdding] = useState(false);
  const [currentSoundObj, setCurrentSoundObj] = useState(soundObj);
  const [isToggling, setIsToggling] = useState(false); // Track if we're in the middle of a toggle

  const isValidColor = (color) => CSS.supports("color", color);

  // Create displayedSounds like Catalog.jsx
  const displayedSounds = useMemo(
    () =>
      (similarSounds || [])
        .slice(0, visibleSoundsCount), // Limit to the number of visible sounds
    [similarSounds, visibleSoundsCount]
  );

  useEffect(() => {
    if (favourited) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timer);
    }
  }, [favourited]);

  const searchParams = useSearchParams();
  const categoryName = searchParams.get("category");
  const categoryRedirect = searchParams.get("direct");

  const id = slug;

  // Check if user is logged in and initialize favourite status
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setLogedIn(true);
      
      // Get current user ID
      try {
        const loggedInUser = localStorage.getItem('logged_in_user');
        if (loggedInUser) {
          const userData = JSON.parse(loggedInUser);
          const user = userData.user || userData;
          const userId = user.id || user.uid || user._id || null;
          setCurrentUserId(userId);
        }
      } catch (error) {
        console.error('Error getting current user ID:', error);
      }
    } else {
      setLogedIn(false);
      setCurrentUserId(null);
    }
  }, [router]);

  // Initialize favorite status from favBy array (source of truth from API)
  // Only sync from API when not toggling
  useEffect(() => {
    if (isToggling) {
      // Don't sync during toggle - let the toggle function handle state
      return;
    }
    
    if (id && currentSoundObj && currentUserId) {
      const favBy = currentSoundObj.favBy || [];
      const isFavoritedByArray = Array.isArray(favBy) && 
        favBy.some(favId => String(favId) === String(currentUserId));
      
      if (isFavoritedByArray) {
        setFavourited(true);
      } else {
        // Fallback to localStorage check
        try {
          const cachedData = JSON.parse(localStorage.getItem('logged_in_user')) || {};
          const favouriteSounds = cachedData.favourite_sounds || [];
          const isFavorited = favouriteSounds.some(fav => fav.id === id);
          setFavourited(isFavorited);
        } catch (error) {
          setFavourited(false);
        }
      }
    } else if (id && currentUserId) {
      // Fallback to localStorage check if soundObj not available
      try {
        const cachedData = JSON.parse(localStorage.getItem('logged_in_user')) || {};
        const favouriteSounds = cachedData.favourite_sounds || [];
        const isFavorited = favouriteSounds.some(fav => fav.id === id);
        setFavourited(isFavorited);
      } catch (error) {
        setFavourited(false);
      }
    } else {
      setFavourited(false);
    }
  }, [id, currentSoundObj, currentUserId]);


  async function handleShowMoreSounds() {
    try {
      setLoadingMore(true);

      // Check if we've already loaded all available data
      if (totalCount > 0 && similarSounds.length >= totalCount) {
        console.log('All data already loaded, skipping request');
        return;
      }

      // Increase limit by 20 for next request (like Catalog.jsx)
      const newLimit = currentLimit + 20;

      let response;

      if (currentSoundObj && currentSoundObj.categories && currentSoundObj.categories.length > 0) {
        const categoryName = currentSoundObj.categories[0].name;
        response = await soundsAPI.getSoundsByCategory(categoryName, {
          search: "",
          page: 1,
          limit: newLimit
        });
      } else if (currentSoundObj?.name) {
        response = await soundsAPI.getAllSounds({
          search: currentSoundObj.name,
          page: 1,
          limit: newLimit
        });
      }

      const newPage = transformSoundsArray(response.data?.data || response.data || []);

      // If no new data returned, we've reached the end
      if (newPage.length === 0) {
        console.log('No more data available');
        setLoadingMore(false);
        return;
      }

      // Prevent duplicates by filtering out existing IDs
      const existingIds = new Set(similarSounds.map(sound => sound.id));
      const uniqueNewSounds = newPage.filter(sound => !existingIds.has(sound.id));

      console.log('Loading more sounds:', {
        newPageCount: newPage.length,
        uniqueNewSounds: uniqueNewSounds.length,
        currentSimilarSounds: similarSounds.length,
        totalCount: response.data?.total || 0,
        visibleSoundsCount: visibleSoundsCount,
        newLimit: newLimit,
        currentLimit: currentLimit
      });

      setCurrentLimit(newLimit);

      const mergedArray = [...similarSounds, ...uniqueNewSounds];
      setVisibleSoundsCount((prev) => prev + 20);
      setSimilarSounds(mergedArray);

    } catch (err) {
      console.error('Error loading more sounds:', err);
    } finally {
      setLoadingMore(false);
    }
  }

  async function getherSimilarSounds() {
    setIsLoadingSimilarSounds(true);
    if (currentSoundObj && currentSoundObj.categories && currentSoundObj.categories.length > 0) {
      try {
        // Get the first category from the sound object
        const categoryName = currentSoundObj.categories[0].name;
        const response = await soundsAPI.getSoundsByCategory(categoryName, {
          search: "",
          page: 1,
          limit: currentLimit
        });

        // Transform the data using the same pattern as Catalog.jsx
        const sounds = transformSoundsArray(response.data?.data || []);

        // Set total count from API response
        setTotalCount(response.data?.total || 0);

        // Filter out the current sound from similar sounds
        const filteredSounds = sounds.filter(sound => sound.id !== currentSoundObj.id);
        setSimilarSounds(filteredSounds);
      } catch (error) {
        console.error('Error loading similar sounds by category:', error);
        // Fallback to search by name if category fetch fails
        if (currentSoundObj?.name) {
          try {
            const response = await soundsAPI.getAllSounds({
              search: currentSoundObj.name,
              page: 1,
              limit: 40
            });
            const sounds = transformSoundsArray(response.data || []);
            const filteredSounds = sounds.filter(sound => sound.id !== currentSoundObj.id);
            setSimilarSounds(filteredSounds);
          } catch (searchError) {
            console.error('Error loading similar sounds by name:', searchError);
            setSimilarSounds([]);
          }
        } else {
          setSimilarSounds([]);
        }
      } finally {
        setIsLoadingSimilarSounds(false);
      }
    } else if (currentSoundObj?.name) {
      // Fallback to search by name if no categories
      try {
        const response = await soundsAPI.getAllSounds({
          search: currentSoundObj.name,
          page: 1,
          limit: 40
        });
        const sounds = transformSoundsArray(response.data || []);
        const filteredSounds = sounds.filter(sound => sound.id !== currentSoundObj.id);
        setSimilarSounds(filteredSounds);
      } catch (error) {
        console.error('Error loading similar sounds by name:', error);
        setSimilarSounds([]);
      } finally {
        setIsLoadingSimilarSounds(false);
      }
    } else {
      setIsLoadingSimilarSounds(false);
    }
  }

  const handlePlaySound = (soundId) => {
    setCurrentlyPlayingSound(soundId);
  };

  useEffect(() => {
    if (soundObj) {
      setCurrentSoundObj(soundObj);
      getherSimilarSounds();
    } else {
      setIsLoadingSimilarSounds(false);
    }
  }, [soundObj]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsLoading(false);
    } else {
      const audioUrl = currentSoundObj?.url;
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
                console.log('Audio playing successfully');
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
                  console.log('Audio playing successfully after load');
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


  const loadSound = useCallback((url) => {
    if (url) {
      setSoundUrl(url);
    }
  }, []);

  const downloadSound = async () => {
    const audioUrl = currentSoundObj?.url;
    if (!audioUrl) {
      console.error('No audio URL provided for download');
      toast.error('No audio URL available for download');
      return;
    }

    setIsDownloading(true);
    
    try {
      // Try to fetch and download as blob first
      const response = await fetch(audioUrl, {
        method: 'GET',
        headers: {
          'Accept': 'audio/mpeg, audio/*',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      const fileName = currentSoundObj?.name && currentSoundObj.name.includes('.mp3') ? currentSoundObj.name : `${currentSoundObj?.name || 'sound'}.mp3`;
      downloadLink.download = fileName;
      downloadLink.style.display = 'none';
      document.body.appendChild(downloadLink);
      downloadLink.click();

      // Clean up
      setTimeout(() => {
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(blobUrl);
      }, 100);

      // Increment download count
      try {
        await soundsAPI.incrementDownload(id);
      } catch (apiError) {
        console.error('Error incrementing download count:', apiError);
        // Don't fail the download if API call fails
      }

      toast.success('Download started successfully');
    } catch (error) {
      console.error('Error downloading the MP3:', error);
      
      // Fallback: Try direct download link
      try {
        const downloadLink = document.createElement('a');
        downloadLink.href = audioUrl;
        downloadLink.download = currentSoundObj?.name && currentSoundObj.name.includes('.mp3') ? currentSoundObj.name : `${currentSoundObj?.name || 'sound'}.mp3`;
        downloadLink.target = '_blank';
        downloadLink.rel = 'noopener noreferrer';
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();

        setTimeout(() => {
          document.body.removeChild(downloadLink);
        }, 100);

        // Try to increment download count
        try {
          await soundsAPI.incrementDownload(id);
        } catch (apiError) {
          console.error('Error incrementing download count:', apiError);
        }

        toast.info('Opening download link...');
      } catch (fallbackError) {
        console.error('Fallback download also failed:', fallbackError);
        toast.error('Failed to download. Please try again or use the share button.');
      }
    } finally {
      setIsDownloading(false);
    }
  };

  async function toggleFavourite() {
    if (logedIn) {
      setAdding(true);
      setIsToggling(true);
      // Optimistic update - update UI immediately
      const previousFavoritedState = favourited;
      const newFavoritedState = !favourited;
      setFavourited(newFavoritedState);
      
      try {
        const response = await soundsAPI.toggleFavorite(id);

        if (response.status === 201 || response.status === 200) {
          console.log('Toggle favorite response:', response.data);
          
          // Update local state based on API response
          if (response.data) {
            // Check for action field
            if (response.data.action === 'added') {
              setFavourited(true);
            } else if (response.data.action === 'removed') {
              setFavourited(false);
            } else {
              // If no action field, check message or use optimistic update
              const message = response.data.message || '';
              if (message.toLowerCase().includes('added') || message.toLowerCase().includes('add')) {
                setFavourited(true);
              } else if (message.toLowerCase().includes('removed') || message.toLowerCase().includes('remove')) {
                setFavourited(false);
              } else {
                // Keep optimistic update if we can't determine
                setFavourited(newFavoritedState);
              }
            }
          } else {
            // If no data, keep the optimistic update
            setFavourited(newFavoritedState);
          }
          
          // Refresh sound data to get updated favBy array
          try {
            const soundResponse = await soundsAPI.getSoundById(id);
            if (soundResponse.data) {
              setCurrentSoundObj(soundResponse.data);
            }
          } catch (refreshError) {
            console.error('Error refreshing sound data:', refreshError);
          }
          
          toast.success(response.data?.message || 'Favorite updated', {
            position: 'bottom-left',
          });
          
          // Update local storage to reflect the change
          try {
            const cachedData = JSON.parse(localStorage.getItem('logged_in_user')) || {};
            let favouriteSounds = cachedData.favourite_sounds || [];
            
            if (response.data?.action === 'added') {
              // Add to favorites if not already there
              const exists = favouriteSounds.some(fav => fav.id === id);
              if (!exists && currentSoundObj) {
                favouriteSounds.push({
                  id: id,
                  ...currentSoundObj
                });
              }
            } else if (response.data?.action === 'removed') {
              // Remove from favorites
              favouriteSounds = favouriteSounds.filter(fav => fav.id !== id);
            }
            
            cachedData.favourite_sounds = favouriteSounds;
            localStorage.setItem('logged_in_user', JSON.stringify(cachedData));
          } catch (storageError) {
            console.error('Error updating local storage:', storageError);
          }
        } else {
          // Revert optimistic update on failure
          setFavourited(previousFavoritedState);
          toast.error(response?.data?.message || response?.message || 'Failed to update favorites', {
            position: 'bottom-left',
          });
        }
      } catch (error) {
        // Revert optimistic update on error
        setFavourited(previousFavoritedState);
        console.error('Error toggling favorite:', error);
        toast.error('Failed to update favorites', {
          position: 'bottom-left',
        });
      } finally {
        setAdding(false);
        // Keep isToggling true for a bit longer to prevent useEffect from overwriting
        setTimeout(() => {
          setIsToggling(false);
        }, 2000);
      }
    } else {
      router.push(`/${locale}/login`);
    }
  }

  function copyIframe() {
    navigator.clipboard.writeText(`${window.location.href}embed`);
  }

  function copyShareUrl() {
    const shareUrl = currentSoundObj?.url;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Audio URL copied to clipboard!');
  }
console.log('displayedSounds', displayedSounds);
  return (
    <div className={`${theme && "dark"}`}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes smooth-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .smooth-spinner {
          animation: smooth-spin 0.75s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}} />
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
        <NavbarHead theme={theme} setTheme={setTheme} locale={locale} />

        {/* backgrounds */}
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="absolute -z-50 top-[60px] transform -scale-x-100 hidden w-full h-[700px] md:block"
        >
          <defs>
            <linearGradient id="sw-gradient-0" x1="1" x2="0" y1="1" y2="0">
              <stop stop-color="hsl(217, 102%, 99%)" offset="0%"></stop>
              <stop stop-color="hsl(217,88%, 93%)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path
            className="fill-[url(#sw-gradient-0)] dark:fill-[#171F2D]"
            d="M 0.351 264.418 C 0.351 264.418 33.396 268.165 47.112 270.128 C 265.033 301.319 477.487 325.608 614.827 237.124 C 713.575 173.504 692.613 144.116 805.776 87.876 C 942.649 19.853 1317.845 20.149 1440.003 23.965 C 1466.069 24.779 1440.135 24.024 1440.135 24.024 L 1440 0 L 1360 0 C 1280 0 1120 0 960 0 C 800 0 640 0 480 0 C 320 0 160 0 80 0 L 0 0 L 0.351 264.418 Z"
          ></path>
        </svg>

        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="absolute -z-50 bottom-[100px] transform -scale-x-100 hidden rotate-180 w-full h-[700px] md:block"
        >
          <defs>
            <linearGradient id="sw-gradient-0" x1="1" x2="0" y1="1" y2="0">
              <stop stop-color="hsl(217, 102%, 99%)" offset="0%"></stop>
              <stop stop-color="hsl(217,88%, 93%)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path
            className="fill-[url(#sw-gradient-0)] dark:fill-[#171F2D]"
            d="M 0.351 264.418 C 0.351 264.418 33.396 268.165 47.112 270.128 C 265.033 301.319 477.487 325.608 614.827 237.124 C 713.575 173.504 692.613 144.116 805.776 87.876 C 942.649 19.853 1317.845 20.149 1440.003 23.965 C 1466.069 24.779 1440.135 24.024 1440.135 24.024 L 1440 0 L 1360 0 C 1280 0 1120 0 960 0 C 800 0 640 0 480 0 C 320 0 160 0 80 0 L 0 0 L 0.351 264.418 Z"
          ></path>
        </svg>

        <div className="flex flex-col items-center w-full">
            <Breadcrumb
            first={t("home")}
            second={currentSoundObj?.categories?.[0]?.name || categoryName}
            secondLink={categoryRedirect}
            third={currentSoundObj && currentSoundObj.name}
            locale={locale}
          />
          <div className=" md:w-[75%] w-full grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-6 py-18 mt-10 px-5">
            <div className="flex flex-col ">
              <div
                style={{
                  backgroundColor: currentSoundObj?.color && isValidColor(currentSoundObj.color) ? currentSoundObj.color : undefined,
                }}
                data-aos="fade-in"
                className={`pb-4 gap-5 flex flex-col items-center justify-between p-5 mx-auto min-w-[250px] max-w-[350px] rounded-md ${currentSoundObj?.color && isValidColor(currentSoundObj.color) ? `bg-[${currentSoundObj.color}]` : 'bg-[#0E7490]'}`}
              >
                <div className="flex flex-col gap-2">
                  <h1 className="text-center text-2xl text-[#E7E7EA] font-semibold">
                    {currentSoundObj && currentSoundObj.name}
                  </h1>
                  <h6 className="text-center text-sm mb-3 text-[#E7E7EA] font-semibold">
                    {t("downloads")}:{" "}
                    {currentSoundObj && currentSoundObj.downloads}
                  </h6>
                  {isPlaying ? (
                    <div className="flex flex-row gap-1 items-center justify-center">
                      <div
                        className="wave rounded-full w-2 h-4 bg-white"
                        style={{ "--i": ".4s" }}
                      ></div>
                      <div
                        className="wave rounded-full w-2 h-8 bg-gray-100"
                        style={{ "--i": ".4s" }}
                      ></div>
                      <div
                        className="wave rounded-full w-2 h-4 bg-gray-200"
                        style={{ "--i": ".4s" }}
                      ></div>
                      <div
                        className="wave rounded-full w-2 h-6 bg-gray-300"
                        style={{ "--i": ".2s" }}
                      ></div>
                      <div
                        className="wave rounded-full w-2 h-12 bg-white"
                        style={{ "--i": ".3s" }}
                      ></div>
                      <div
                        className="wave rounded-full w-2 h-18 bg-gray-100"
                        style={{ "--i": ".4s" }}
                      ></div>
                      <div
                        className="wave rounded-full w-2 h-12 bg-white"
                        style={{ "--i": ".3s" }}
                      ></div>
                      <div
                        className="wave rounded-full w-2 h-6 bg-gray-300"
                        style={{ "--i": ".2s" }}
                      ></div>
                      <div
                        className="wave rounded-full w-2 h-4 bg-gray-200"
                        style={{ "--i": ".4s" }}
                      ></div>
                      <div
                        className="wave rounded-full w-2 h-8 bg-gray-100"
                        style={{ "--i": ".4s" }}
                      ></div>
                      <div
                        className="wave rounded-full w-2 h-4 bg-white"
                        style={{ "--i": ".4s" }}
                      ></div>
                    </div>
                  ) : (
                    <div className="flex flex-row gap-1 items-center justify-center">
                      <div
                        className=" rounded-full w-2 h-4 bg-white"
                        style={{ "--i": ".4s" }}
                      ></div>
                      <div
                        className=" rounded-full w-2 h-8 bg-gray-100"
                        style={{ "--i": ".4s" }}
                      ></div>
                      <div
                        className=" rounded-full w-2 h-4 bg-gray-200"
                        style={{ "--i": ".4s" }}
                      ></div>
                      <div
                        className=" rounded-full w-2 h-6 bg-gray-300"
                        style={{ "--i": ".2s" }}
                      ></div>
                      <div
                        className=" rounded-full w-2 h-12 bg-white"
                        style={{ "--i": ".3s" }}
                      ></div>
                      <div
                        className=" rounded-full w-2 h-18 bg-gray-100"
                        style={{ "--i": ".4s" }}
                      ></div>
                      <div
                        className=" rounded-full w-2 h-12 bg-white"
                        style={{ "--i": ".3s" }}
                      ></div>
                      <div
                        className="rounded-full w-2 h-6 bg-gray-300"
                        style={{ "--i": ".2s" }}
                      ></div>
                      <div
                        className=" rounded-full w-2 h-4 bg-gray-200"
                        style={{ "--i": ".4s" }}
                      ></div>
                      <div
                        className="rounded-full w-2 h-8 bg-gray-100"
                        style={{ "--i": ".4s" }}
                      ></div>
                      <div
                        className=" rounded-full w-2 h-4 bg-white"
                        style={{ "--i": ".4s" }}
                      ></div>
                    </div>
                  )}
                </div>
                <audio
                  onEnded={() => {
                    setIsPlaying(false);
                    setIsLoading(false);
                  }}
                  ref={audioRef}
                  crossOrigin="anonymous"
                  preload="none"
                  onError={(e) => {
                    console.error('Audio load error:', e);
                    console.error('Failed URL:', currentSoundObj?.url);
                    setIsPlaying(false);
                    setIsLoading(false);
                  }}
                ></audio>
                <button
                  style={{ color: currentSoundObj && currentSoundObj.color }}
                  onClick={handlePlayPause}
                  disabled={isLoading}
                  className="bg-white font-semibold rounded my-2 mt-5 mx-auto max-w-[400px] flex items-center gap-3 w-full justify-center py-2.5 disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="relative" style={{ width: '20px', height: '20px' }}>
                        <div 
                          className="absolute inset-0 rounded-full border-2 border-current border-t-transparent smooth-spinner"
                          style={{
                            willChange: 'transform',
                            color: currentSoundObj && currentSoundObj.color
                          }}
                        ></div>
                      </div>
                      {t("loading") || "Loading..."}
                    </div>
                  ) : isPlaying ? (
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        fill={currentSoundObj && currentSoundObj.color}
                      >
                        <path d="M564-284v-392h139.5v392H564Zm-307 0v-392h139.5v392H257Z" />
                      </svg>
                      {t("pause")}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill={currentSoundObj && currentSoundObj.color}
                        viewBox="0 0 384 512"
                      >
                        <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                      </svg>
                      {t("play")}
                    </div>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-5 mx-auto max-w-[650px]">
                {currentSoundObj && currentSoundObj.tags?.length > 0 &&
                  currentSoundObj.tags?.map((tag, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        if (tag?.name) {
                          const formattedTag = tag.name.replace(/\s+/g, '-');
                          router.push(`/${locale}/search/${formattedTag}`);
                        }
                      }}
                      className="bg-blue-100 rounded-sm text-blue-800 px-2 py-1 cursor-pointer hover:bg-blue-200 transition-colors"
                    >
                      {tag?.name}
                    </div>
                  ))}
              </div>

            </div>
            <div className="z-30 flex flex-col items-center gap-5 justify-center">
              <div className="border-b-2 text-gray-600 dark:text-gray-300 border-gray-300 w-full">
                <span className="font-bold text-gray-700 dark:text-gray-100 py-1">
                  {t("sound_description")}:
                </span>
                &nbsp;&nbsp;{" "}
                {(currentSoundObj && currentSoundObj.description) ||
                  "Download, play and share free " +
                  (currentSoundObj?.name || '') +
                  " sound effect button, viral your soundboard sounds to be featured on world's leaderboard."}
              </div>
             {currentSoundObj?.author?.name && (
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Sound Uploaded by: {' '}
                  {(currentSoundObj?.author?.id || currentSoundObj?.authorId || currentSoundObj?.author) ? (
                    <Link 
                      href={`/${locale}/profile/visit/${currentSoundObj?.author?.id || currentSoundObj?.authorId || currentSoundObj?.author}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline cursor-pointer transition-colors"
                    >
                      {currentSoundObj?.author?.name}
                    </Link>
                  ) : (
                    <span>{currentSoundObj?.author?.name}</span>
                  )}
                </p>
              )}
              <div className="grid w-full gap-5 grid-cols-1 items-center lg:grid-cols-2">
                {favourited ? (
                  <button
                    onClick={() => toggleFavourite()}
                    disabled={adding}
                    className="bg-[#5aa9cd] text-white rounded flex mx-auto max-w-[400px] items-center gap-3 w-full justify-center py-2.5 disabled:opacity-70"
                  >
                    {adding ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid"
                        width="24"
                        height="24"
                        style={{
                          shapeRendering: 'auto',
                          display: 'block',
                          background: 'transparent',
                        }}
                      >
                        <g>
                          <circle
                            strokeDasharray="164.93361431346415 56.97787143782138"
                            r="35"
                            strokeWidth="10"
                            stroke="#fff"
                            fill="none"
                            cy="50"
                            cx="50"
                          >
                            <animateTransform
                              keyTimes="0;1"
                              values="0 50 50;360 50 50"
                              dur="1s"
                              repeatCount="indefinite"
                              type="rotate"
                              attributeName="transform"
                            />
                          </circle>
                        </g>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={animate ? "pop-animation" : ""}
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#E82850"
                      >
                        <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
                      </svg>
                    )}
                    {t("removefromfavourites")}
                  </button>
                ) : (
                  <button
                    onClick={() => toggleFavourite()}
                    disabled={adding}
                    className="bg-[#5aa9cd] text-white rounded flex mx-auto max-w-[400px] items-center gap-3 w-full justify-center py-2.5 disabled:opacity-70"
                  >
                    {adding ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid"
                        width="24"
                        height="24"
                        style={{
                          shapeRendering: 'auto',
                          display: 'block',
                          background: 'transparent',
                        }}
                      >
                        <g>
                          <circle
                            strokeDasharray="164.93361431346415 56.97787143782138"
                            r="35"
                            strokeWidth="10"
                            stroke="#fff"
                            fill="none"
                            cy="50"
                            cx="50"
                          >
                            <animateTransform
                              keyTimes="0;1"
                              values="0 50 50;360 50 50"
                              dur="1s"
                              repeatCount="indefinite"
                              type="rotate"
                              attributeName="transform"
                            />
                          </circle>
                        </g>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e8eaed"
                      >
                        <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
                      </svg>
                    )}
                    {t("addtofavourites")}
                  </button>
                )}
                <button
                  onClick={() => downloadSound()}
                  disabled={isDownloading}
                  className="bg-[#BB2E42] text-white rounded flex mx-auto max-w-[400px] items-center gap-3 w-full justify-center py-2.5 disabled:opacity-70"
                >
                  {isDownloading ? (
                    <>
                      <div className="relative" style={{ width: '24px', height: '24px' }}>
                        <div 
                          className="absolute inset-0 rounded-full border-2 border-white/30 border-t-white smooth-spinner"
                          style={{
                            willChange: 'transform'
                          }}
                        ></div>
                      </div>
                      {t("loading") || "Downloading..."}
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e8eaed"
                      >
                        <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                      </svg>
                      {t("downloadsoundbutton")}
                    </>
                  )}
                </button>
                <RWebShare
                  data={{
                    text: `Download and Share ${currentSoundObj?.name || ''} sound effect button`,
                    title: "Sound Effect Buttons",
                    url: currentSoundObj?.url || '',
                  }}
                >
                  <button className="bg-[#159642c1] text-white rounded flex mx-auto max-w-[400px] items-center gap-3 w-full justify-center py-2.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e8eaed"
                    >
                      <path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z" />
                    </svg>{" "}
                    Share
                  </button>
                </RWebShare>
                <button
                  onClick={copyShareUrl}
                  className="bg-[#6B7280] text-white rounded flex mx-auto max-w-[400px] items-center gap-3 w-full justify-center py-2.5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e8eaed"
                  >
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h200v80H200v560h560v-200h80v200q0 33-23.5 56.5T760-120H200Zm280-160v-80h280v-560H360v-80h360q33 0 56.5 23.5T800-840v560q0 33-23.5 56.5T720-200H480Z" />
                  </svg>
                  Copy Audio URL
                </button>
                <a
                  href={`mailto:richdreamcreators@gmail.com?subject=Sound%20button%20report&body=Sound%20name:%20${currentSoundObj?.name || ''},%0A%0APlease%20describe%20your%20issue%20with%20this%20sound%20button%0A%0AThank%20you!`}
                >
                  <button className="bg-[#d0a91bcb] text-white rounded flex mx-auto max-w-[400px] items-center gap-3 w-full justify-center py-2.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e8eaed"
                    >
                      <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240ZM330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm34-80h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" />
                    </svg>
                    Report
                  </button>
                </a>
              </div>
              <div className="w-full flex justify-center items-center">
                {frameUrl ? (
                  <textarea
                    onClick={copyIframe}
                    defaultValue={`<iframe width="170" height="200" src="https://www.soundeffectbuttons.com/${frameUrl}/embed" frameborder="0" scrolling="no"></iframe>`}
                    style={{ width: "100%", height: "80px" }}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-[75%] w-full px-5 mt-10 gap-5 flex flex-col-reverse lg:flex-row justify-between">
          <div>
            <h4 className="text-2xl dark:text-white font-semibold">
              {t("youmightalsolike")}
            </h4>
          </div>
          <div className="xl:block hidden fixed bottom-0 left-1/2  -translate-x-1/2 z-40 ">
            <FixedAds />
          </div>
          <div className="lg:hidden block  fixed bottom-0 left-1/2  -translate-x-1/2 z-40    ">
            <MobileAd />
          </div>
          <div className=" hidden  xl:block fixed left-0 top-[55%] w-[12%] h-[600px] -translate-y-1/2 z-40   ">
            <Ads adSlot="1651339077" className="w-full h-full" />
          </div>
          <div className="hidden xl:block fixed right-0 top-[55%] w-[12%] h-[600px] -translate-y-1/2 z-40  ">
            <Ads adSlot="1651339077" className="w-full h-full" />
          </div>
        </div>

        <div className="md:w-[90%] xl:w-[70%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 my-8 gap-5">
          {isLoadingSimilarSounds ? (
            <div className="col-span-full flex justify-center items-center py-20">
              <LoadingInline size="default" />
            </div>
          ) : displayedSounds && displayedSounds.length > 0 ? (
            displayedSounds.map((sound) => {
              return (
                <Soundbox
                  key={sound.id}
                  id={sound.id}
                  authorId={sound.author}
                  name={sound.name}
                  url={sound.url}
                  tags={sound.tags}
                  color={sound.color}
                  description={sound.description}
                  favorites={sound.favorites}
                  downloads={sound.downloads}
                  favBy={sound.favBy}
                  category={currentSoundObj?.categories?.[0]?.name || categoryName}
                  categoryUrl={categoryRedirect}
                  isPlaying={currentlyPlayingSound === sound.id}
                  handlePlaySound={handlePlaySound}
                />
              );
            })
          ) : (
            <div className="col-span-full flex justify-center items-center py-20">
              <p className="text-gray-600 dark:text-gray-400">No similar sounds found.</p>
            </div>
          )}
        </div>

        {/* Show More Button */}
        {totalCount > 0 ? visibleSoundsCount < totalCount && (
          <div className="w-full mb-16 flex justify-center">
            <button
              onClick={handleShowMoreSounds}
              disabled={loadingMore}
              className="group inline-flex items-center justify-center p-0.5 text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-[#00549F] via-[#0071FF] to-[#00A4FF] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative px-5 py-2.5 bg-white dark:text-white hover:text-white dark:bg-[#171F2D] rounded-md group-hover:bg-opacity-0">
                {loadingMore ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Loading...
                  </div>
                ) : (
                  t("show_more")
                )}
              </span>
            </button>
          </div>
        ) : null}

        <Botbar locale={locale} />
      </main>
    </div>
  );
}
