"use client";
import "../../app/i18n";
import { useState, useMemo } from "react";
import Botbar from "@/components/footer/Botbar";
import { useTranslation } from "react-i18next";
import Soundbox from "@/components/Soundbox";
import { useContext } from "react";
import { ThemeContext } from "@/components/context/theme-context";
import { NavbarHead } from "../header/NavbarHead";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCategoryDisplayName } from "../../lib/dataTransformers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Ads from "../adsbygoogle/Ads";
import FixedAds from "../adsbygoogle/FixedAds";
import MobileAd from "../adsbygoogle/MobileAd";
import { useCatalogSounds } from "@/hooks/useCatalogSounds";
import { LoadingInline } from "@/components/loading/Loading";

const Catalog = ({ 
  categoryName, 
  catValue, 
  catUrl, 
  catAlias, 
  title, 
  description, 
  mobileDescription, 
  locale = 'en' 
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleSoundsCount, setVisibleSoundsCount] = useState(40);
  const { theme } = useContext(ThemeContext);
  const [currentlyPlayingSound, setCurrentlyPlayingSound] = useState(null);

  const { t } = useTranslation();

  // Use React Query hook for data fetching
  const {
    data,
    isLoading: loading,
    isFetchingNextPage: loadingMore,
    error: queryError,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useCatalogSounds({
    catValue,
    initialLimit: 40,
    incrementBy: 20,
    enabled: !!catValue,
  });

  // Use the latest page's sounds (since increasing limit returns all items from start)
  const categorySounds = useMemo(() => {
    if (!data?.pages || data.pages.length === 0) return [];
    // Use the latest page since it contains all items up to the current limit
    const latestPage = data.pages[data.pages.length - 1];
    return latestPage?.sounds || [];
  }, [data]);

  // Get total count from the latest page
  const totalCount = useMemo(() => {
    if (!data?.pages || data.pages.length === 0) return 0;
    return data.pages[data.pages.length - 1]?.totalCount || 0;
  }, [data]);

  // Convert query error to string for display
  const error = isError ? (queryError?.message || 'Failed to load sounds. Please check your connection and try again.') : null;

  const displayedSounds = useMemo(
    () =>
      (categorySounds || [])
        .slice(0, visibleSoundsCount), // Limit to the number of visible sounds
    [categorySounds, visibleSoundsCount]
  );

  const handleSearchChange = (e) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/${locale}/search/${searchQuery}`);
    }
  };

  const handlePlaySound = (soundId) => {
    setCurrentlyPlayingSound(soundId);
  };

  async function handleShowMoreSounds() {
    const nextVisibleCount = visibleSoundsCount + 20;
    
    // If we need more data and have a next page, fetch it first
    if (hasNextPage && nextVisibleCount > categorySounds.length) {
      await fetchNextPage();
    }
    
    // Increase visible count
    setVisibleSoundsCount(nextVisibleCount);
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
        <NavbarHead
          active={
            catUrl === "trending"
              ? "trending"
              : catUrl === "categories"
                ? "categories"
                : catUrl
          }
          locale={locale}
        />

        <Breadcrumb
          first={t("home")}
          second={getCategoryDisplayName(catValue)}
          secondLink={catUrl}
          locale={locale}
        />

        {/* Title and Description */}
        <div className="mt-[40px] md:mt-[100px] w-full flex flex-col items-center gap-3 md:gap-6 px-5">
          <h1 className="gradtext font-semibold text-center h-[50px] drop-shadow-lg text-2xl md:text-4xl">
            {t(title)}
          </h1>
          <p className="md:w-2/3 text-center hidden md:block text-[#2A2A2A] dark:text-gray-100">
            {t(description)}
          </p>
          <p className="md:w-2/3 text-center md:hidden text-[#2A2A2A] dark:text-gray-100">
            {t(mobileDescription)}
          </p>
          <div className=" xl:block hidden fixed bottom-0 left-1/2 -translate-x-1/2 z-40 ">
            <FixedAds />
          </div>
          <div className=" lg:hidden block  fixed bottom-0 left-1/2 -translate-x-1/2 z-40  ">
            <MobileAd />
          </div>
          <div className="hidden  xl:block fixed left-0 top-1/2 w-[12%] h-[600px] -translate-y-1/2 z-40 ">
            <Ads adSlot="1651339077" className="w-full h-full" />
          </div>
          <div className="hidden  xl:block fixed right-0 top-1/2 w-[12%] h-[600px] -translate-y-1/2 z-40">
            <Ads adSlot="1651339077" className="w-full h-full" />
          </div>
        </div>

        {/* Filters and Search */}
        <div className="md:px-[5%] mt-[40px] w-full xl:w-[70%] pr-3 bg-white dark:bg-[#212D3D] dark:text-white sticky z-50 top-[56px] py-2 gap-5 flex flex-col-reverse lg:flex-row items-center justify-between">
          <h2 className="text-2xl dark:text-white text-bold">
            {getCategoryDisplayName(catValue)}
          </h2>
          <div>
            <form
              onSubmit={(e) => handleSearchChange(e)}
              className="flex items-center w-full"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  id="simple-search"
                  className="shadow border md:w-[350px] border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:text-white"
                  placeholder={t("search_sound")}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  class="w-4 h-4"
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
                  />
                </svg>
                <span class="sr-only">Search</span>
              </button>
            </form>
          </div>
        </div>

        {/* Sounds */}
        <div className="md:w-[90%] xl:w-[70%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 my-8 gap-5">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-20">
              <LoadingInline size="default" />
            </div>
          ) : error ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4">
                <p className="text-red-600 dark:text-red-400 mb-2">{error}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This might be due to a slow connection or server issues. Please try again in a moment.
                </p>
              </div>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : displayedSounds.length === 0 ? (
            <div className="col-span-full flex justify-center items-center py-20">
              <p className="text-gray-600 dark:text-gray-400">No sounds found in this category.</p>
            </div>
          ) : (
            displayedSounds.map((sound) => (
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
              />
            </div>
          ))
          )}
        </div>

        {/* Show More Button */}
        {!loading && (
          (totalCount > 0 ? visibleSoundsCount < totalCount : categorySounds.length > visibleSoundsCount) ||
          hasNextPage
        ) && (
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
        )}

        {catUrl === "meme-soundboard" && (
          <div className="container mx-auto px-6 py-8">
            <h2 className="text-2xl font-bold drop-shadow-md mb-6 bg-gradient-to-r from-[#F77705] to-[#A00493] inline-block text-transparent bg-clip-text">
              {t("meme_title")}
            </h2>

            <p className=" text-gray-700 dark:text-gray-300 mb-6">
              {t("meme_page_description1")}
            </p>

            <h3 className="text-2xl bg-gradient-to-r from-[#F77705] to-[#A00493] inline-block text-transparent bg-clip-text font-bold drop-shadow-md mb-6">
              {t("meme_page_heading2")}
            </h3>
            <p className=" text-gray-700 dark:text-gray-300 mb-6">
              {t("meme_page_description2")}
            </p>
            <p className=" text-gray-700 dark:text-gray-300 mb-6">
              {t("meme_page_description2.1")}
            </p>
            <h3 className="text-2xl bg-gradient-to-r from-[#F77705] to-[#A00493] inline-block text-transparent bg-clip-text font-bold drop-shadow-md mb-6">
              {t("meme_page_heading3")}
            </h3>
            <p className=" text-gray-700 dark:text-gray-300 mb-6">
              {t("meme_page_description3.1")}{" "}
              <Link
                className="text-blue-500 font-semibold"
                href={"/anime-soundboard"}
              >
                {t("anime_soundboard")}
              </Link>
              ,{" "}
              <Link
                className="text-blue-500 font-semibold"
                href={"/discord-soundboard"}
              >
                {t("discord_soundboard")}
              </Link>
              ,{" "}
              <Link
                className="text-blue-500 font-semibold"
                href={"/funny-sound-effects"}
              >
                {t("funny_sound_effects")}
              </Link>{" "}
              {t("meme_page_description3.2")}{" "}
              <Link className="text-blue-500 font-semibold" href={"/trending"}>
                {t("trending_sounds")}
              </Link>{" "}
              {t("meme_page_description3.3")}
            </p>

            <ul className="space-y-6">
              <li>
                <h4 className="text-xl font-bold text-[#2A2A2A] dark:text-gray-100">
                  {t("meme_page_description4.1")}
                </h4>
                <p className=" text-gray-700 dark:text-gray-300">
                  {t("meme_page_description4.2")}
                </p>
              </li>
              <li>
                <h4 className="text-xl font-bold text-[#2A2A2A] dark:text-gray-100">
                  {t("meme_page_description5.1")}
                </h4>
                <p className=" text-gray-700 dark:text-gray-300">
                  {t("meme_page_description5.2")}
                </p>
              </li>
              <li>
                <h4 className="text-xl font-bold text-[#2A2A2A] dark:text-gray-100">
                  {t("meme_page_description6.1")}
                </h4>
                <p className=" text-gray-700 dark:text-gray-300">
                  {t("meme_page_description6.2")}
                </p>
              </li>
              <li>
                <h4 className="text-xl font-bold text-[#2A2A2A] dark:text-gray-100">
                  {t("meme_page_description7.1")}
                </h4>
                <p className=" text-gray-700 dark:text-gray-300">
                  {t("meme_page_description7.2")}
                </p>
              </li>
              <li>
                <h4 className="text-xl font-bold text-[#2A2A2A] dark:text-gray-100">
                  {t("meme_page_description8.1")}
                </h4>
                <p className=" text-gray-700 dark:text-gray-300">
                  {t("meme_page_description8.2")}
                </p>
              </li>
              <li>
                <h4 className="text-xl font-bold text-[#2A2A2A] dark:text-gray-100">
                  {t("meme_page_description9.1")}
                </h4>
                <p className=" text-gray-700 dark:text-gray-300">
                  {t("meme_page_description9.2")}
                  <Link className="text-blue-500 font-semibold" href={"/"}>
                    SoundEffectButtons{" "}
                  </Link>
                  {t("meme_page_description9.3")}
                </p>
              </li>
              <li>
                <h4 className="text-xl font-bold text-[#2A2A2A] dark:text-gray-100">
                  {t("meme_page_description10.1")}
                </h4>
                <p className=" text-gray-700 dark:text-gray-300">
                  {t("meme_page_description10.2")}{" "}
                  <Link
                    className="text-blue-500 font-semibold"
                    href={"/leaderboard"}
                  >
                    {t("leaderboard")}
                  </Link>{" "}
                  {t("meme_page_description10.3")}
                </p>
              </li>
              <li>
                <p className=" text-gray-700 dark:text-gray-300">
                  {t("meme_page_description11.1")} <b>{t("meme_soundboard")}</b>
                  {t("meme_page_description11.2")}
                </p>
                <li>
                  <Link
                    className="text-blue-500 font-semibold"
                    href={"/youtube-sound-effects"}
                  >
                    {t("youtube_sound_effects")}
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-blue-500 font-semibold"
                    href={"/tiktok-sound-effects"}
                  >
                    {t("tiktok_sound_effects")}
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-blue-500 font-semibold"
                    href={"/horror-sound-effects"}
                  >
                    {t("horror_title")}
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-blue-500 font-semibold"
                    href={"/animal-sound-effects"}
                  >
                    {t("animal_sound_effects")}
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-blue-500 font-semibold"
                    href={"/prank-soundboard"}
                  >
                    {t("prank_soundboard")}
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-blue-500 font-semibold"
                    href={"/human-sound-effects"}
                  >
                    {t("human_sound_effects")}
                  </Link>
                </li>
              </li>
            </ul>
          </div>
        )}

        <Botbar locale={locale} />
      </main>
    </div>
  );
};

export default Catalog;
