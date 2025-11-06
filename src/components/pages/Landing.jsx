"use client";
import "../../app/i18n";
import logo from "../../assets/images/logo.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState, useCallback, useMemo } from "react";
import Botbar from "@/components/footer/Botbar";
import { useTranslation } from "react-i18next";
import Soundbox from "@/components/Soundbox";
import { useContext } from "react";
import { ThemeContext } from "@/components/context/theme-context";
import Image from "next/image";
import { NavbarHead } from "../header/NavbarHead";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "../loading/Loading";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Ads from "../adsbygoogle/Ads";
import FixedAds from "../adsbygoogle/FixedAds";
import MobileAd from "../adsbygoogle/MobileAd";

const Landing = ({ 
  funnySounds, 
  discordSounds, 
  trendingSounds, 
  freeSounds, 
  horrorSounds, 
  animalSounds, 
  prankSounds, 
  youtubeSounds, 
  royalitySounds, 
  memeSounds, 
  justAddedSounds, 
  title, 
  mobileDescription, 
  locale = 'en' 
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useContext(ThemeContext);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [currentlyPlayingSound, setCurrentlyPlayingSound] = useState(null);
  const [logedIn, setLogedIn] = useState(false);

  const animations = useMemo(() => {
    return ["grow", "shake", "shake-updown", "largegrow"];
  }, []);

  const { t } = useTranslation();

  const getRandomAnimation = useCallback(() => {
    return animations[Math.floor(Math.random() * animations.length)];
  }, [animations]);

  // Use data directly from API without custom sorting
  const funnySoundsUse = funnySounds || [];
  const discordSoundsUse = discordSounds || [];
  const trendingSoundsUse = trendingSounds || [];
  const freeSoundsUse = freeSounds || [];
  const horrorSoundsUse = horrorSounds || [];
  const animalSoundsUse = animalSounds || [];
  const prankSoundsUse = prankSounds || [];
  const youtubeSoundsUse = youtubeSounds || [];
  const royalitySoundsUse = royalitySounds || [];
  const memeSoundsUse = memeSounds || [];

  const handleSearchChange = (e) => {
    e.preventDefault();
    if (searchQuery) {
      const formattedQuery = searchQuery.replace(/\s+/g, "-"); // Replace spaces with dashes
      router.push(`/${locale}/search/${formattedQuery}`);
    }
  };

  const justAddedSoundsUse = useMemo(
    () =>
      (justAddedSounds || [])
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 40),
    [justAddedSounds]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogedIn(true);
      } else {
        setLogedIn(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handlePlaySound = (soundId) => {
    setCurrentlyPlayingSound(soundId);
  };

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: false,
    });
  }, []);

  const handleShake = useCallback(() => {
    setIsDisabled(true);
    const audio = new Audio("/harlem.wav");
    audio.play();

    setTimeout(() => setShouldAnimate(true), 13800);
    setTimeout(() => setShouldAnimate(false), 27000);
    setTimeout(() => setIsDisabled(false), 28000);
  }, []);

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
        <NavbarHead active="home" locale={locale} />

        {/* Backgrounds */}
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="absolute -z-[999] top-[114px] transform -scale-x-100 hidden w-full h-[700px] md:block"
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

        <div className="sticky dark:bg-gray-800 dark:text-white z-50 flex px-5 gap-5 justify-between top-[56px] bg-gray-100 w-full py-2">
          <div className="w-full md:w-min">
            <form
              onSubmit={(e) => handleSearchChange(e)}
              className="flex items-center w-full sm:max-w-sm mx-auto md:mx-0"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  id="simple-search"
                  className="shadow border w-full md:w-[350px] border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:text-white"
                  placeholder={t("search_sound")}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="p-2.5 ms-2 text-sm font-medium shadow text-white bg-[#0E7490] rounded-lg border border-[#0E7490] hover:bg-[#1f4b58] focus:ring-4 focus:outline-none"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    locale={locale}
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </form>
          </div>
          <button
            disabled={isDisabled}
            onClick={handleShake}
            className=" disabled:cursor-not-allowed shadow bg-white dark:bg-[#171F2D] dark:text-white border rounded-md px-3 flex gap-3 items-center justify-center "
          >
            <Image className="img w-6" src={logo} alt="logo" />
            <p className="hidden md:block font-semibold">Bee Shake</p>
          </button>
        </div>

        {/* Title and Description */}
        <div className="mt-[110px] w-full flex flex-col items-center gap-3 md:gap-6 px-5">
          <h1
            className={`${
              shouldAnimate ? "color-changing-text " : "gradtext"
            } font-semibold text-center h-[50px] drop-shadow-lg text-2xl md:text-4xl`}
          >
            {title}
          </h1>
          <p className="md:w-2/3 text-center hidden md:block text-[#2A2A2A] dark:text-gray-100">
            {t("description")}
          </p>
          <p className="md:w-2/3 text-center md:hidden text-[#2A2A2A] dark:text-gray-100">
            {mobileDescription}
          </p>
          <div className="xl:block hidden fixed bottom-0 left-1/2  -translate-x-1/2 z-40     ">
            <FixedAds />
          </div>
          <div className="lg:hidden block  fixed bottom-0 left-1/2  -translate-x-1/2 z-40  ">
            <MobileAd />
          </div>
          <div className=" hidden  xl:block fixed left-0 top-1/2 w-[12%] h-[600px] -translate-y-1/2 z-40  ">
            <Ads adSlot="1651339077" className="w-full h-full" />
          </div>
          <div className="hidden xl:block fixed right-0 top-1/2 w-[12%] h-[600px] -translate-y-1/2 z-40 ">
            <Ads adSlot="1651339077" className="w-full h-full" />
          </div>
        </div>

        {/* Filters and Search */}

        <div className="md:w-[90%] xl:w-[70%] mt-[40px] w-full px-5 gap-5 flex flex-col-reverse lg:flex-row items-center justify-between">
          <h2 className="text-2xl bg-gradient-to-r from-[#F77705] to-[#A00493] inline-block text-transparent bg-clip-text font-bold drop-shadow-md">
            {t("just_added")}
          </h2>
        </div>

        {/* Sounds */}
        {!justAddedSoundsUse || justAddedSoundsUse.length < 1 ? (
          <div className="w-[90%] xl:w-[70%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 my-8 gap-5">
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="md:w-[90%] xl:w-[70%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 my-8 gap-5">
            {justAddedSoundsUse.map((sound) => {
              return (
                <div
                  key={sound.id}
                  className={shouldAnimate ? getRandomAnimation() : ""}
                >
                  <Soundbox
                    id={sound.id}
                    authorId={sound.author}
                    name={sound.name}
                    link={sound.url}
                    tags={sound.tags || []}
                    color={sound.color || '#0E7490'}
                    description={sound.description || ''}
                    favorites={sound.favorites || 0}
                    downloads={sound.downloads || 0}
                    category={"Trending"}
                    categoryUrl={"trending"}
                    isPlaying={currentlyPlayingSound === sound.id}
                    handlePlaySound={handlePlaySound}
                    locale={locale}
                  />
                </div>
              );
            })}
          </div>
        )}

        <div className="w-[70%] mb-16 flex justify-center">
          <Link href={`/${locale}/just-added`}>
            <div className="group inline-flex items-center justify-center p-0.5 text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-[#00549F] via-[#0071FF] to-[#00A4FF]">
              <span className="relative px-5 py-2.5 bg-white dark:text-white hover:text-white dark:bg-[#171F2D] rounded-md group-hover:bg-opacity-0">
                {t("explore_more_just_added_sounds")}
              </span>
            </div>
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="md:w-[90%] xl:w-[70%] mt-[40px] w-full px-5 gap-5 flex flex-col-reverse lg:flex-row items-center justify-between">
          <h2 className="text-2xl bg-gradient-to-r from-[#F77705] to-[#A00493] inline-block text-transparent bg-clip-text font-bold drop-shadow-md">
            {t("trending_sounds")}
          </h2>
        </div>

        {/* Sounds */}
        {!trendingSoundsUse || trendingSoundsUse.length < 1 ? (
          <div className="w-[90%] xl:w-[70%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 my-8 gap-5">
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-28 "></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 full"></div>
                  <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="md:w-[90%] xl:w-[70%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 my-8 gap-5">
            {trendingSoundsUse.map((sound) => {
              return (
                <div
                  key={sound.id}
                  className={shouldAnimate ? getRandomAnimation() : ""}
                >
                  <Soundbox
                    id={sound.id}
                    authorId={sound.author}
                    name={sound.name}
                    link={sound.url}
                    tags={sound.tags || []}
                    color={sound.color || '#0E7490'}
                    description={sound.description || ''}
                    favorites={sound.favorites || 0}
                    downloads={sound.downloads || 0}
                    category={"Trending"}
                    categoryUrl={"trending"}
                    isPlaying={currentlyPlayingSound === sound.id}
                    handlePlaySound={handlePlaySound}
                    locale={locale}
                  />
                </div>
              );
            })}
          </div>
        )}

        <div className="w-[70%] mb-16 flex justify-center">
          <Link href={`/${locale}/trending`}>
            <div className="group inline-flex items-center justify-center p-0.5 text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-[#00549F] via-[#0071FF] to-[#00A4FF]">
              <span className="relative px-5 py-2.5 bg-white dark:text-white hover:text-white dark:bg-[#171F2D] rounded-md group-hover:bg-opacity-0">
                {t("explore_more_trending_sounds")}
              </span>
            </div>
          </Link>
        </div>

        <div className="md:w-[90%] xl:w-[70%] mt-[40px] w-full px-5 gap-5 flex flex-col-reverse lg:flex-row items-center justify-between">
          <h2 className="text-2xl bg-gradient-to-r from-[#F77705] to-[#A00493] inline-block text-transparent bg-clip-text font-bold drop-shadow-md">
            {t("funny_soundboard")}
          </h2>
        </div>
        {!funnySoundsUse || funnySoundsUse.length < 1 ? (
          <Loading />
        ) : (
          <div className="md:w-[90%] xl:w-[70%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 my-8 gap-5">
            {funnySoundsUse.map((sound) => {
              return (
                <div
                  key={sound.id}
                  className={shouldAnimate ? getRandomAnimation() : ""}
                >
                  <Soundbox
                    id={sound.id}
                    name={sound.name}
                    link={sound.url}
                    tags={sound.tags}
                    authorId={sound.author}
                    color={sound.color || '#0E7490'}
                    description={sound.description}
                    favorites={sound.favorites || 0}
                    downloads={sound.downloads || 0}
                    category={" Funny Sound Effects"}
                    categoryUrl={"funny-sound-effects"}
                    isPlaying={currentlyPlayingSound === sound.id}
                    handlePlaySound={handlePlaySound}
                    locale={locale}
                  />
                </div>
              );
            })}
          </div>
        )}
        <div className="w-[70%] mb-16 flex justify-center">
          <Link href={`/${locale}/funny-sound-effects`}>
            <div className="group inline-flex items-center justify-center p-0.5 text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-[#00549F] via-[#0071FF] to-[#00A4FF]">
              <span className="relative px-5 py-2.5 dark:text-white bg-white hover:text-white dark:bg-[#171F2D] rounded-md group-hover:bg-opacity-0">
                {t("explore_more_funny_sounds")}
              </span>
            </div>
          </Link>
        </div>

        <div className="md:w-[90%] xl:w-[70%] mt-[40px] w-full px-5 gap-5 flex flex-col-reverse lg:flex-row items-center justify-between">
          <h2 className="text-2xl bg-gradient-to-r from-[#F77705] to-[#A00493] inline-block text-transparent bg-clip-text font-bold drop-shadow-md">
            {t("discord_soundboard")}
          </h2>
        </div>

        {!discordSoundsUse || discordSoundsUse.length < 1 ? (
          <Loading />
        ) : (
          <div className="md:w-[90%] xl:w-[70%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 my-8 gap-5">
            {discordSoundsUse.map((sound) => {
              return (
                <div
                  key={sound.id}
                  className={shouldAnimate ? getRandomAnimation() : ""}
                >
                  <Soundbox
                    id={sound.id}
                    name={sound.name}
                    link={sound.url}
                    tags={sound.tags}
                    authorId={sound.author}
                    color={sound.color || '#0E7490'}
                    description={sound.description}
                    favorites={sound.favorites || 0}
                    downloads={sound.downloads || 0}
                    category={"Discord Soundboard"}
                    categoryUrl={"discord-soundboard"}
                    isPlaying={currentlyPlayingSound === sound.id}
                    handlePlaySound={handlePlaySound}
                    locale={locale}
                  />
                </div>
              );
            })}
          </div>
        )}
        <div className="w-[70%] mb-16 flex justify-center">
          <Link href={`/${locale}/discord-soundboard`}>
            <div className="group inline-flex items-center justify-center p-0.5 text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-[#00549F] via-[#0071FF] to-[#00A4FF]">
              <span className="relative px-5 py-2.5 dark:text-white bg-white hover:text-white dark:bg-[#171F2D] rounded-md group-hover:bg-opacity-0">
                {t("explore_more_discord_sounds")}
              </span>
            </div>
          </Link>
        </div>

        <div className="md:w-[90%] xl:w-[70%] mt-[40px] w-full px-5 gap-5 flex flex-col-reverse lg:flex-row items-center justify-between">
          <h2 className="text-2xl bg-gradient-to-r from-[#F77705] to-[#A00493] inline-block text-transparent bg-clip-text font-bold drop-shadow-md">
            {t("free_sound_effects")}
          </h2>
        </div>

        {!freeSoundsUse || freeSoundsUse.length < 1 ? (
          <Loading />
        ) : (
          <div className="md:w-[90%] xl:w-[70%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 my-8 gap-5">
            {freeSoundsUse.map((sound) => {
              return (
                <div
                  key={sound.id}
                  className={shouldAnimate ? getRandomAnimation() : ""}
                >
                  <Soundbox
                    id={sound.id}
                    name={sound.name}
                    link={sound.url}
                    tags={sound.tags}
                    authorId={sound.author}
                    color={sound.color || '#0E7490'}
                    description={sound.description}
                    favorites={sound.favorites || 0}
                    downloads={sound.downloads || 0}
                    category={"Free Sound Effects"}
                    categoryUrl={"free-sound-effects"}
                    isPlaying={currentlyPlayingSound === sound.id}
                    handlePlaySound={handlePlaySound}
                    locale={locale}
                  />
                </div>
              );
            })}
          </div>
        )}
        <div className="w-[70%] mb-16 flex justify-center">
          <Link href={`/${locale}/free-sound-effects`}>
            <div className="group inline-flex items-center justify-center p-0.5 text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-[#00549F] via-[#0071FF] to-[#00A4FF]">
              <span className="relative px-5 py-2.5 dark:text-white bg-white hover:text-white dark:bg-[#171F2D] rounded-md group-hover:bg-opacity-0">
                {t("explore_more_free_sounds")}
              </span>
            </div>
          </Link>
        </div>

        <div className="md:w-[90%] xl:w-[70%] mt-[40px] w-full px-5 gap-5 flex flex-col-reverse lg:flex-row items-center justify-between">
          <h2 className="text-2xl bg-gradient-to-r from-[#F77705] to-[#A00493] inline-block text-transparent bg-clip-text font-bold drop-shadow-md">
            {t("horror_sound_effects")}
          </h2>
        </div>

        {!horrorSoundsUse || horrorSoundsUse.length < 1 ? (
          <Loading />
        ) : (
          <div className="md:w-[90%] xl:w-[70%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 my-8 gap-5">
            {horrorSoundsUse.map((sound) => {
              return (
                <div
                  key={sound.id}
                  className={shouldAnimate ? getRandomAnimation() : ""}
                >
                  <Soundbox
                    id={sound.id}
                    name={sound.name}
                    link={sound.url}
                    tags={sound.tags}
                    authorId={sound.author}
                    color={sound.color || '#0E7490'}
                    description={sound.description}
                    favorites={sound.favorites || 0}
                    downloads={sound.downloads || 0}
                    category={"Horror Sound Effects"}
                    categoryUrl={"horror-sound-effects"}
                    isPlaying={currentlyPlayingSound === sound.id}
                    handlePlaySound={handlePlaySound}
                    locale={locale}
                  />
                </div>
              );
            })}
          </div>
        )}
        <div className="w-[70%] mb-16 flex justify-center">
          <Link href={`/${locale}/horror-sound-effects`}>
            <div className="group inline-flex items-center justify-center p-0.5 text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-[#00549F] via-[#0071FF] to-[#00A4FF]">
              <span className="relative px-5 py-2.5 dark:text-white bg-white hover:text-white dark:bg-[#171F2D] rounded-md group-hover:bg-opacity-0">
                {t("explore_more_horror_sounds")}
              </span>
            </div>
          </Link>
        </div>

        <div className="md:w-[70%] mt-[40px] w-full px-5 gap-5 flex flex-col-reverse lg:flex-row items-center justify-between">
          <h2 className="text-2xl bg-gradient-to-r from-[#F77705] to-[#A00493] inline-block text-transparent bg-clip-text font-bold drop-shadow-md">
            {t("animal_sound_effects")}
          </h2>
        </div>

        {!animalSoundsUse || animalSoundsUse.length < 1 ? (
          <Loading />
        ) : (
          <div className="md:w-[90%] xl:w-[70%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 my-8 gap-5">
            {animalSoundsUse.map((sound) => {
              return (
                <div
                  key={sound.id}
                  className={shouldAnimate ? getRandomAnimation() : ""}
                >
                  <Soundbox
                    id={sound.id}
                    name={sound.name}
                    link={sound.url}
                    tags={sound.tags}
                    authorId={sound.author}
                    color={sound.color || '#0E7490'}
                    description={sound.description}
                    favorites={sound.favorites || 0}
                    downloads={sound.downloads || 0}
                    category={"Animal Sound Effects"}
                    categoryUrl={"animal-sound-effects"}
                    isPlaying={currentlyPlayingSound === sound.id}
                    handlePlaySound={handlePlaySound}
                    locale={locale}
                  />
                </div>
              );
            })}
          </div>
        )}
        <div className="w-[70%] mb-16 flex justify-center">
          <Link href={`/${locale}/animal-sound-effects`}>
            <div className="group inline-flex items-center justify-center p-0.5 text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-[#00549F] via-[#0071FF] to-[#00A4FF]">
              <span className="relative px-5 py-2.5 dark:text-white bg-white hover:text-white dark:bg-[#171F2D] rounded-md group-hover:bg-opacity-0">
                {t("explore_more_animal_sounds")}
              </span>
            </div>
          </Link>
        </div>

        <div className="md:w-[90%] xl:w-[70%] mt-[40px] w-full px-5 gap-5 flex flex-col-reverse lg:flex-row items-center justify-between">
          <h2 className="text-2xl bg-gradient-to-r from-[#F77705] to-[#A00493] inline-block text-transparent bg-clip-text font-bold drop-shadow-md">
            {t("meme_soundboard")}
          </h2>
        </div>
        {!memeSoundsUse || memeSoundsUse.length < 1 ? (
          <Loading />
        ) : (
          <div className="md:w-[90%] xl:w-[70%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 my-8 gap-5">
            {memeSoundsUse.map((sound) => {
              return (
                <div
                  key={sound.id}
                  className={shouldAnimate ? getRandomAnimation() : ""}
                >
                  <Soundbox
                    id={sound.id}
                    name={sound.name}
                    link={sound.url}
                    tags={sound.tags}
                    authorId={sound.author}
                    color={sound.color || '#0E7490'}
                    description={sound.description}
                    favorites={sound.favorites || 0}
                    downloads={sound.downloads || 0}
                    category={"Meme Soundboard"}
                    categoryUrl={"meme-soundboard"}
                    isPlaying={currentlyPlayingSound === sound.id}
                    handlePlaySound={handlePlaySound}
                    locale={locale}
                  />
                </div>
              );
            })}
          </div>
        )}
        <div className="w-[70%] mb-16 flex justify-center">
          <Link href={`/${locale}/meme-soundboard`}>
            <div className="group inline-flex items-center justify-center p-0.5 text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-[#00549F] via-[#0071FF] to-[#00A4FF]">
              <span className="relative px-5 py-2.5 dark:text-white bg-white hover:text-white dark:bg-[#171F2D] rounded-md group-hover:bg-opacity-0">
                {t("explore_more_meme_sounds")}
              </span>
            </div>
          </Link>
        </div>

        <div className="md:w-[90%] xl:w-[70%] mt-[40px] w-full px-5 gap-5 flex flex-col-reverse lg:flex-row items-center justify-between">
          <h2 className="text-2xl bg-gradient-to-r from-[#F77705] to-[#A00493] inline-block text-transparent bg-clip-text font-bold drop-shadow-md">
            {t("prank_soundboard")}
          </h2>
        </div>

        {!prankSoundsUse || prankSoundsUse.length < 1 ? (
          <Loading />
        ) : (
          <div className="md:w-[90%] xl:w-[70%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 my-8 gap-5">
            {prankSoundsUse.map((sound) => {
              return (
                <div
                  key={sound.id}
                  className={shouldAnimate ? getRandomAnimation() : ""}
                >
                  <Soundbox
                    id={sound.id}
                    name={sound.name}
                    link={sound.url}
                    tags={sound.tags}
                    authorId={sound.author}
                    color={sound.color || '#0E7490'}
                    description={sound.description}
                    favorites={sound.favorites || 0}
                    downloads={sound.downloads || 0}
                    category={"Prank Soundboard"}
                    categoryUrl={"prank_soundboard"}
                    isPlaying={currentlyPlayingSound === sound.id}
                    handlePlaySound={handlePlaySound}
                    locale={locale}
                  />
                </div>
              );
            })}
          </div>
        )}
        <div className="w-[70%] mb-16 flex justify-center">
          <Link href={`/${locale}/prank-soundboard`}>
            <div className="group inline-flex items-center justify-center p-0.5 text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-[#00549F] via-[#0071FF] to-[#00A4FF]">
              <span className="relative px-5 py-2.5 dark:text-white bg-white hover:text-white dark:bg-[#171F2D] rounded-md group-hover:bg-opacity-0">
                {t("explore_more_prank_sounds")}
              </span>
            </div>
          </Link>
        </div>

        <div className="md:w-[90%] xl:w-[70%] mt-[40px] w-full px-5 gap-5 flex flex-col-reverse lg:flex-row items-center justify-between">
          <h2 className="text-2xl bg-gradient-to-r from-[#F77705] to-[#A00493] inline-block text-transparent bg-clip-text font-bold drop-shadow-md">
            {t("youtube_sound_effects")}
          </h2>
        </div>
        {!youtubeSoundsUse || youtubeSoundsUse.length < 1 ? (
          <Loading />
        ) : (
          <div className="md:w-[90%] xl:w-[70%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 my-8 gap-5">
            {youtubeSoundsUse.map((sound) => {
              return (
                <div
                  key={sound.id}
                  className={shouldAnimate ? getRandomAnimation() : ""}
                >
                  <Soundbox
                    id={sound.id}
                    name={sound.name}
                    link={sound.url}
                    tags={sound.tags}
                    authorId={sound.author}
                    color={sound.color || '#0E7490'}
                    description={sound.description}
                    favorites={sound.favorites || 0}
                    downloads={sound.downloads || 0}
                    category={"Youtube Sound Effects"}
                    categoryUrl={"youtube-sound-effects"}
                    isPlaying={currentlyPlayingSound === sound.id}
                    handlePlaySound={handlePlaySound}
                    locale={locale}
                  />
                </div>
              );
            })}
          </div>
        )}
        <div className="w-[70%] mb-16 flex justify-center">
          <Link href={`/${locale}/youtube-sound-effects`}>
            <div className="group inline-flex items-center justify-center p-0.5 text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-[#00549F] via-[#0071FF] to-[#00A4FF]">
              <span className="relative px-5 py-2.5 dark:text-white bg-white hover:text-white dark:bg-[#171F2D] rounded-md group-hover:bg-opacity-0">
                {t("explore_more_youtube_sounds")}
              </span>
            </div>
          </Link>
        </div>

        <div className="md:w-[90%] xl:w-[70%] mt-[40px] w-full px-5 gap-5 flex flex-col-reverse lg:flex-row items-center justify-between">
          <h2 className="text-2xl bg-gradient-to-r from-[#F77705] to-[#A00493] inline-block text-transparent bg-clip-text font-bold drop-shadow-md">
            {t("royalty_free_music")}
          </h2>
        </div>

        {!royalitySoundsUse || royalitySoundsUse.length < 1 ? (
          <Loading />
        ) : (
          <div className="md:w-[90%] xl:w-[70%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 my-8 gap-5">
            {royalitySoundsUse.map((sound) => {
              return (
                <div
                  key={sound.id}
                  className={shouldAnimate ? getRandomAnimation() : ""}
                >
                  <Soundbox
                    id={sound.id}
                    name={sound.name}
                    link={sound.url}
                    tags={sound.tags}
                    authorId={sound.author}
                    color={sound.color || '#0E7490'}
                    description={sound.description}
                    favorites={sound.favorites || 0}
                    downloads={sound.downloads || 0}
                    category={"Royalty Free Music"}
                    categoryUrl={"royalty-free-music"}
                    isPlaying={currentlyPlayingSound === sound.id}
                    handlePlaySound={handlePlaySound}
                    locale={locale}
                  />
                </div>
              );
            })}
          </div>
        )}
        <div className="w-[70%] mb-16 flex justify-center">
          <Link href={`/${locale}/royalty-free-music`}>
            <div className="group inline-flex items-center justify-center p-0.5 text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-[#00549F] via-[#0071FF] to-[#00A4FF]">
              <span className="relative px-5 py-2.5 dark:text-white bg-white hover:text-white dark:bg-[#171F2D] rounded-md group-hover:bg-opacity-0">
                {t("explore_more_royalty_free_music")}
              </span>
            </div>
          </Link>
        </div>

       

        <Botbar locale={locale} />
      </main>
    </div>
  );
};

export default Landing;
