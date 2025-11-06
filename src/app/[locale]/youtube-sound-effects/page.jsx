import Catalog from '@/components/pages/Catalog'
import Script from 'next/script';

const YoutubeSoundEffects = () => {

  return (
    <>
      <head>
        <title>YouTube Sound Effects: Get Most Viral Audio Clips</title>
        <meta
          name="description"
          content="Enhance your YouTube videos with quality sound effects, from funny clips to travel sounds. Ideal for intros, outros, and content creators aiming to go viral."
        />
        <Script
          id="json-ld-youtube-sound-effects"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": "https://www.soundeffectbuttons.com/youtube-sound-effects/#webpage",
                  "url": "https://www.soundeffectbuttons.com/youtube-sound-effects/",
                  "name": "YouTube Sound Effects - SoundEffectButtons",
                  "description":
                    "Browse a variety of popular YouTube sound effects, from viral memes and soundtracks to iconic audio clips used in YouTube videos. Perfect for content creators and video editors.",
                  "isPartOf": {
                    "@id": "https://www.soundeffectbuttons.com/#website",
                  },
                  "breadcrumb": {
                    "@id": "https://www.soundeffectbuttons.com/youtube-sound-effects/#breadcrumb",
                  },
                  "inLanguage": "en-US",
                },
                {
                  "@type": "CreativeWork",
                  "@id": "https://www.soundeffectbuttons.com/youtube-sound-effects/#library",
                  "url": "https://www.soundeffectbuttons.com/youtube-sound-effects/",
                  "name": "YouTube Sound Effects",
                  "description":
                    "Explore the best YouTube sound effects, including viral memes, popular soundtracks, and the most-used audio clips in YouTube videos.",
                  "keywords":
                    "YouTube sound effects, viral YouTube sounds, YouTube meme sounds, YouTube audio clips, YouTube soundtracks, YouTube soundboard, popular YouTube audio, trending YouTube sounds",
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.soundeffectbuttons.com/youtube-sound-effects/#breadcrumb",
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
                      "name": "YouTube Sound Effects",
                      "item":
                        "https://www.soundeffectbuttons.com/youtube-sound-effects/",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>

      <Catalog 
        catAlias={'Youtube Sound Effects'} 
        catUrl={'youtube-sound-effects'} 
        catValue={'youtube_sound_effects'}
        title={'youtube_title'}
        description={"youtube_description"}
        mobileDescription={'youtube_mobileDescription'}
      />
    </>
  )
}

export default YoutubeSoundEffects
