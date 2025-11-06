import Sound from "@/components/pages/SoundPage";
import { soundsAPI } from "@/lib/apiServices";
import { Suspense } from "react";

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Loading sound...</p>
      </div>
    </div>
  );
}

export default async function Page({ params }) {
  const { sound, locale } = params;
  const [id, ...nameParts] = sound.split('-');
  
  try {
    const response = await soundsAPI.getSoundById(id);
    const soundData = response.data;
    
    if (!soundData) {
      throw new Error('Sound data not found');
    }
    
    const canonicalUrl = `https://www.soundeffectbuttons.com/${id}-${encodeURIComponent(soundData.name && soundData.name.replace(/\s+/g, '-'))}`;

    return (
      <>
        <head>
          <title>{`${soundData.name} || Sound Button`}</title>
          <link rel="canonical" href={canonicalUrl} />
          <meta
            name="description"
            content={"Download, play and share free " + soundData.name + " sound effect button, viral your soundboard sounds to be featured on world's leaderboard."}
          />
        </head>
        <Suspense fallback={<LoadingSpinner />}>
          <Sound slug={id} frameUrl={sound} soundObj={soundData} locale={locale} />
        </Suspense>
      </>
    );
  } catch (error) {
    console.error('Error fetching sound:', error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Sound Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300">The requested sound could not be found.</p>
          <p className="text-sm text-gray-500 mt-2">Error: {error.message}</p>
        </div>
      </div>
    );
  }
}
