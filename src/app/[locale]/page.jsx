"use client";

import Landing from "@/components/pages/Landing";
import { useGroupedSounds, useJustAddedSounds } from "@/hooks/useGroupedSounds";
import Loading from "@/components/loading/Loading";

export default function Home({ params }) {
  const { locale } = params;

  // Use React Query hooks for data fetching
  const {
    data: groupedSoundsData,
    isLoading: isLoadingGrouped,
    isError: isErrorGrouped,
    error: groupedError,
    refetch: refetchGrouped,
  } = useGroupedSounds({ soundsLimit: 20 });

  const {
    data: justAddedSounds = [],
    isLoading: isLoadingJustAdded,
    isError: isErrorJustAdded,
    error: justAddedError,
    refetch: refetchJustAdded,
  } = useJustAddedSounds({ limit: 40 });

  // Extract data from grouped sounds
  const {
    trendingSounds = [],
    funnySounds = [],
    discordSounds = [],
    freeSounds = [],
    horrorSounds = [],
    animalSounds = [],
    memeSounds = [],
    prankSounds = [],
    youtubeSounds = [],
    royalitySounds = [],
  } = groupedSoundsData || {};

  // Loading state
  const isLoading = isLoadingGrouped || isLoadingJustAdded;

  // Error state
  const isError = isErrorGrouped || isErrorJustAdded;
  const error = groupedError || justAddedError;

  // Error handling with retry option
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-[#212D3D]">
        <div className="text-center p-8 max-w-md">
          <div className="mb-6">
            <svg
              className="mx-auto h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Error Loading Sounds
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            {error?.message || "Please try again later."}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {error?.response?.status
              ? `Status: ${error.response.status}`
              : "Network error or server unavailable"}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                refetchGrouped();
                refetchJustAdded();
              }}
              className="px-6 py-2 bg-[#0E7490] text-white rounded-lg hover:bg-[#1f4b58] transition-colors font-medium"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Landing
      trendingSounds={trendingSounds}
      funnySounds={funnySounds}
      discordSounds={discordSounds}
      freeSounds={freeSounds}
      horrorSounds={horrorSounds}
      animalSounds={animalSounds}
      memeSounds={memeSounds}
      prankSounds={prankSounds}
      youtubeSounds={youtubeSounds}
      royalitySounds={royalitySounds}
      justAddedSounds={justAddedSounds}
      title={"SoundEffectButtons"}
      description={
        "Get the most viral/trending sound effect buttons from the pool of 5000+ sound buttons available in various categories. Wanna appear on our leaderboard? Upload trending sounds to your Soundboard, make it viral, and we will feature you along with your social media handles! So what's the wait for? The competition has already started. Hurry!"
      }
      mobileDescription={
        "Sound Effect Buttons - Play and Download Free Sound Effects Online!"
      }
      locale={locale}
    />
  );
}

