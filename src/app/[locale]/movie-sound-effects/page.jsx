import Catalog from '@/components/pages/Catalog'
import Script from 'next/script';

const MovieSoundEffects = () => {

  return (
    <>
      <head>
        <title>Movie Sound Effects: Action & Suspense Audios</title>
        <meta
          name="description"
          content=" Download high-quality movie sound effects, including action, suspense, and ambient sounds. Perfect for films, video projects, and trailers."
        />
        <Script
          id="json-ld-movie-sound-effects"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": "https://www.soundeffectbuttons.com/movie-sound-effects/#webpage",
                  "url": "https://www.soundeffectbuttons.com/movie-sound-effects/",
                  "name": "Movie Sound Effects - SoundEffectButtons",
                  "description":
                    "Explore a collection of iconic movie sound effects, including famous lines, soundtracks, explosions, and more. Perfect for film enthusiasts, creators, and soundboard lovers.",
                  "isPartOf": {
                    "@id": "https://www.soundeffectbuttons.com/#website",
                  },
                  "breadcrumb": {
                    "@id": "https://www.soundeffectbuttons.com/movie-sound-effects/#breadcrumb",
                  },
                  "inLanguage": "en-US",
                },
                {
                  "@type": "CreativeWork",
                  "@id": "https://www.soundeffectbuttons.com/movie-sound-effects/#library",
                  "url": "https://www.soundeffectbuttons.com/movie-sound-effects/",
                  "name": "Movie Sound Effects",
                  "description":
                    "Find a variety of famous movie sound effects, from legendary quotes to epic soundtracks and dramatic explosions. Perfect for creating a cinematic atmosphere.",
                  "keywords":
                    "movie sound effects, movie quotes soundboard, movie soundtracks, film sound effects, explosion sound effects, famous movie sounds, movie soundboard, cinematic sound effects",
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.soundeffectbuttons.com/movie-sound-effects/#breadcrumb",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://www.soundeffectbuttons.com/",
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Movie Sound Effects",
                      "item": "https://www.soundeffectbuttons.com/movie-sound-effects/",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>

      <Catalog 
        catAlias={'Movie Sound Effects'} 
        catUrl={'movie-sound-effects'} 
        catValue={'movie_sound_effects'}
        title={'movie_title'}
        description={"movie_description"}
        mobileDescription={'movie_mobileDescription'}
      />
    </>
  )
}

export default MovieSoundEffects
